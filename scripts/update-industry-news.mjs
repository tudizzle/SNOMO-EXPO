import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const sourcePath = path.join(repoRoot, "src/data/industry-news.sources.json");
const candidatePath = path.join(repoRoot, "src/data/industry-news.candidates.json");

function denverWeekStamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

const config = JSON.parse(await readFile(sourcePath, "utf8"));
const enabledSources = config.sources.filter((source) => source.enabled);

const candidates = {
  generatedAt: new Date().toISOString(),
  timezone: "America/Denver",
  weekOf: denverWeekStamp(),
  status: "editorial-review-required",
  rankingCriteria: [
    "industry impact",
    "snowmobile relevance",
    "source authority",
    "recency",
    "originality",
    "market reach",
    "safety or regulatory importance",
  ],
  sourcesChecked: enabledSources.map((source) => ({
    id: source.id,
    name: source.name,
    url: source.url,
    authority: source.authority,
  })),
  candidates: [],
  notes: [
    "This script prepares an auditable Monday candidate file without publishing unverified stories.",
    "Editors should add verified stories to src/data/industry-news.json only after reviewing direct source links.",
    "A failed run never overwrites the last valid published roundup.",
  ],
};

await writeFile(candidatePath, `${JSON.stringify(candidates, null, 2)}\n`);

console.log(
  `Prepared ${candidatePath} for ${enabledSources.length} configured source(s). Editorial publication still requires verified story entries.`,
);
