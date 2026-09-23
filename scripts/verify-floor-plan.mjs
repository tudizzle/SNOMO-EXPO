import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const geometry = JSON.parse(await read("docs/floorplan-2026/booth-geometry.json"));
const source = await read("src/data/vendor-assignments-2026.ts");
const assignments = JSON.parse(source.slice(source.indexOf("= [") + 2).trim().replace(/;$/, ""));
const reference = JSON.parse(await read("docs/floorplan-2026/vendor-assignments.json"));
const image = await readFile(new URL("public/images/floorplan/2026-expo-floor-plan-clean-numbers.png", root));
const fingerprint = "549540080f409f85fce3093481351f8a156a840c4cd139a31fa3d93c0d0645ae";
assert.equal(createHash("sha256").update(image).digest("hex"), fingerprint);
assert.equal(image.readUInt32BE(16), 2048);
assert.equal(image.readUInt32BE(20), 1552);
assert.equal(geometry.imageWidth, 2048);
assert.equal(geometry.imageHeight, 1552);
assert.equal(geometry.booths.length, 77);
assert.equal(assignments.length, 82);
assert.deepEqual(assignments, reference);
assert.deepEqual([...new Set(assignments.map((row) => row.booth))], geometry.booths.map((booth) => booth.number));
assert.ok(assignments.every((row, index) => !index || row.booth >= assignments[index - 1].booth));
assert.deepEqual(geometry.booths.filter((booth) => booth.polygon).map((booth) => booth.number), [324, 329, 330]);
console.log("PASS: unchanged 2048×1552 PNG; 82 sorted assignments; 77 booths; three rotated polygons.");

// Optional production-preview check: node scripts/verify-floor-plan.mjs http://127.0.0.1:3017
if (process.argv[2]) {
  const base = new URL(process.argv[2]);
  const response = await fetch(new URL("/exhibitors", base));
  assert.equal(response.status, 200);
  const html = await response.text();
  const polygons = [...html.matchAll(/<polygon\b[^>]*>/g)].map(([tag]) => {
    const attributes = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
    return attributes;
  });
  assert.equal(polygons.length, 77);
  assert.ok(html.includes('viewBox="0 0 2048 1552"'));
  const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  for (const booth of geometry.booths) {
    const polygon = polygons.find((element) => Number(element["data-booth"]) === booth.number);
    const [left, top, right, bottom] = booth.bounds;
    const points = booth.polygon ?? [[left, top], [right, top], [right, bottom], [left, bottom]];
    assert.equal(polygon?.points, points.map((point) => point.join(",")).join(" "), `Booth ${booth.number} coordinates`);
    assert.equal(polygon.role, "button");
    assert.equal(polygon.tabindex, "0");
    const companies = assignments.filter((row) => row.booth === booth.number).map((row) => row.name);
    assert.equal(polygon["aria-label"], escape(`Booth ${booth.number}: ${companies.join("; ")}`));
  }
  const servedImage = await fetch(new URL("/images/floorplan/2026-expo-floor-plan-clean-numbers.png", base));
  assert.equal(servedImage.status, 200);
  assert.equal(createHash("sha256").update(Buffer.from(await servedImage.arrayBuffer())).digest("hex"), fingerprint);
  console.log("PASS: all 77 rendered hit areas match source geometry exactly; accessible labels match assignments; served PNG unchanged.");
}
