import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const newsPath = path.join(repoRoot, "src/data/industry-news.json");
const categorySet = new Set([
  "Product",
  "Manufacturer",
  "Dealer",
  "Safety",
  "Access",
  "Racing",
  "Technology",
  "Business",
]);

function isIsoDate(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateStory(story, roundup, storyIndex) {
  const prefix = `${roundup.id || "roundup"} story ${storyIndex + 1}`;

  assert(typeof story.id === "string" && story.id.length > 0, `${prefix}: missing id`);
  assert(typeof story.slug === "string" && story.slug.length > 0, `${prefix}: missing slug`);
  assert(Number.isInteger(story.rank), `${prefix}: rank must be an integer`);
  assert(story.rank >= 1 && story.rank <= 5, `${prefix}: featured rank must be 1-5`);
  assert(typeof story.headline === "string" && story.headline.length > 0, `${prefix}: missing headline`);
  assert(categorySet.has(story.category), `${prefix}: unsupported category`);
  assert(typeof story.sourceName === "string" && story.sourceName.length > 0, `${prefix}: missing sourceName`);
  assert(
    typeof story.sourceUrl === "string" && story.sourceUrl.startsWith("https://"),
    `${prefix}: sourceUrl must be a direct https URL`,
  );
  assert(isIsoDate(story.publishedAt), `${prefix}: publishedAt must be ISO parseable`);
  assert(story.roundupDate === roundup.weekOf, `${prefix}: roundupDate must match roundup weekOf`);
  assert(
    typeof story.synopsis === "string" &&
      story.synopsis.split(/\s+/).filter(Boolean).length >= 20,
    `${prefix}: synopsis is too short for publication`,
  );
  assert(
    typeof story.thumbnailVariant === "string" && story.thumbnailVariant.length > 0,
    `${prefix}: missing thumbnailVariant`,
  );
  assert(
    typeof story.thumbnailAlt === "string" && story.thumbnailAlt.length > 0,
    `${prefix}: missing thumbnailAlt`,
  );
}

function validateRoundup(roundup, index) {
  assert(typeof roundup.id === "string" && roundup.id.length > 0, `roundup ${index + 1}: missing id`);
  assert(typeof roundup.slug === "string" && roundup.slug.length > 0, `${roundup.id}: missing slug`);
  assert(isIsoDate(roundup.weekOf), `${roundup.id}: weekOf must be ISO parseable`);
  assert(isIsoDate(roundup.updatedAt), `${roundup.id}: updatedAt must be ISO parseable`);
  assert(Array.isArray(roundup.stories), `${roundup.id}: stories must be an array`);

  const featuredStories = roundup.stories.filter((story) => story.featured);
  const seenStoryIds = new Set();
  const seenStorySlugs = new Set();
  const seenRanks = new Set();
  const seenThumbnails = new Set();

  featuredStories.forEach((story, storyIndex) => {
    validateStory(story, roundup, storyIndex);

    assert(!seenStoryIds.has(story.id), `${roundup.id}: duplicate story id ${story.id}`);
    assert(!seenStorySlugs.has(story.slug), `${roundup.id}: duplicate story slug ${story.slug}`);
    assert(!seenRanks.has(story.rank), `${roundup.id}: duplicate featured rank ${story.rank}`);
    assert(
      !seenThumbnails.has(story.thumbnailVariant),
      `${roundup.id}: duplicate featured thumbnail ${story.thumbnailVariant}`,
    );

    seenStoryIds.add(story.id);
    seenStorySlugs.add(story.slug);
    seenRanks.add(story.rank);
    seenThumbnails.add(story.thumbnailVariant);
  });
}

const file = JSON.parse(await readFile(newsPath, "utf8"));

assert(file.timezone === "America/Denver", "industry news timezone must be America/Denver");
assert(Array.isArray(file.roundups), "roundups must be an array");

const seenRoundups = new Set();
file.roundups.forEach((roundup, index) => {
  assert(!seenRoundups.has(roundup.weekOf), `duplicate roundup week ${roundup.weekOf}`);
  seenRoundups.add(roundup.weekOf);
  validateRoundup(roundup, index);
});

if (file.latestRoundupDate !== null) {
  assert(
    seenRoundups.has(file.latestRoundupDate),
    "latestRoundupDate must match an archived roundup weekOf",
  );
}

console.log(`Industry news validation passed for ${file.roundups.length} roundup(s).`);
