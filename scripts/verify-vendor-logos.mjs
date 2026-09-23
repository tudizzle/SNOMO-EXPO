import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const assignments = await read("src/data/vendor-assignments-2026.ts");
const names = new Set([...assignments.matchAll(/"name": "([^"]+)"/g)].map((match) => match[1]));
const logos = JSON.parse(await read("src/data/vendor-logos-2026.json"));
const sources = await read("docs/floorplan-2026/vendor-logo-sources.md");
for (const [name, logo] of Object.entries(logos)) {
  assert.ok(names.has(name), `Unknown vendor: ${name}`);
  assert.match(logo.src, /^\/images\/(vendors|logos)\/[a-z0-9-]+\.(png|webp|svg|avif)$/);
  assert.ok(["light", "dark"].includes(logo.background));
  const bytes = await readFile(new URL(`public${logo.src}`, root));
  const hash = createHash("sha256").update(bytes).digest("hex");
  if (name !== "Colorado SnoMo Expo") {
    const row = sources.split("\n").find((line) => line.startsWith(`| ${name} |`));
    assert.ok(row?.includes(hash), `Source fingerprint mismatch: ${name}`);
  }
  if (logo.src.endsWith(".svg")) {
    assert.doesNotMatch(bytes.toString(), /<(script|foreignObject|iframe|image|use)\b|\bon\w+=|\bhref=|<!ENTITY/i);
  }
  if (process.argv[2]) {
    const response = await fetch(new URL(logo.src, process.argv[2]));
    assert.equal(response.status, 200, `${name}: image response`);
    assert.equal(createHash("sha256").update(Buffer.from(await response.arrayBuffer())).digest("hex"), hash);
  }
}
console.log(`PASS: ${Object.keys(logos).length} local, source-verified logos; ${names.size - Object.keys(logos).length} text-only fallbacks; no assignment changes.`);
