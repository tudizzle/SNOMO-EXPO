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

// Optional preview check; pass /exhibitors/map as a third argument for the full-size view.
if (process.argv[2]) {
  const base = new URL(process.argv[2]);
  const path = process.argv[3] ?? "/exhibitors";
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200);
  const html = await response.text();
  const polygons = [...html.matchAll(/<polygon\b[^>]*>/g)].map(([tag]) => {
    const attributes = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
    return attributes;
  });
  const interactive = path === "/exhibitors/map";
  assert.equal(polygons.length, interactive ? 77 : 0);
  assert.equal(html.includes('viewBox="0 0 2048 1552"'), interactive);
  if (!interactive) {
    assert.ok(html.includes('aria-label="Open interactive map in a new tab"'));
    assert.ok(html.includes('href="/exhibitors/map"'));
    assert.ok(html.includes("Open Interactive Map"));
    assert.ok(!html.includes("Open Full-Size Map"));
    assert.ok(!html.includes('data-booth='));
    assert.ok(!html.includes('role="dialog"'));
    assert.equal((html.match(/<th scope="row">/g) ?? []).length, 82);
    assert.ok(html.includes("List Alphabetically"));
    assert.ok(html.includes("List by Booth Number"));
    assert.ok(html.includes('download="2026-colorado-snomo-expo-floorplan.png"'));
    console.log("PASS: static overview has no booth hit areas or popups; interactive-map link, 82 directory rows, sorting controls and download remain.");
  }
  const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  for (const booth of interactive ? geometry.booths : []) {
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
  if (interactive) console.log("PASS: all 77 rendered hit areas match source geometry exactly; accessible labels match assignments.");
  console.log("PASS: served PNG unchanged.");
}
