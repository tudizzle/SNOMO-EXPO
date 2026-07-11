import newsData from "@/data/industry-news.json";

export const industryNewsCategories = [
  "Product",
  "Manufacturer",
  "Dealer",
  "Safety",
  "Access",
  "Racing",
  "Technology",
  "Business",
] as const;

export type IndustryNewsCategory = (typeof industryNewsCategories)[number];

export type IndustryNewsStory = {
  id: string;
  slug: string;
  rank: number;
  headline: string;
  category: IndustryNewsCategory;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  roundupDate: string;
  synopsis: string;
  thumbnailVariant: string;
  thumbnailAlt: string;
  featured: boolean;
};

export type IndustryNewsRoundup = {
  id: string;
  slug: string;
  weekOf: string;
  updatedAt: string;
  stories: IndustryNewsStory[];
};

type IndustryNewsFile = {
  timezone: string;
  latestRoundupDate: string | null;
  roundups: IndustryNewsRoundup[];
};

const rawNewsData = newsData as IndustryNewsFile;

function isIsoDate(value: string) {
  return !Number.isNaN(Date.parse(value));
}

function isValidCategory(category: string): category is IndustryNewsCategory {
  return industryNewsCategories.includes(category as IndustryNewsCategory);
}

function isValidStory(story: IndustryNewsStory, roundupDate: string) {
  return Boolean(
    story.id &&
      story.slug &&
      story.headline &&
      story.sourceName &&
      story.sourceUrl.startsWith("https://") &&
      story.synopsis &&
      story.thumbnailAlt &&
      story.roundupDate === roundupDate &&
      isValidCategory(story.category) &&
      Number.isInteger(story.rank) &&
      story.rank >= 1 &&
      story.rank <= 5 &&
      isIsoDate(story.publishedAt),
  );
}

function validateRoundup(roundup: IndustryNewsRoundup) {
  if (
    !roundup.id ||
    !roundup.slug ||
    !isIsoDate(roundup.weekOf) ||
    !isIsoDate(roundup.updatedAt)
  ) {
    return null;
  }

  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenRanks = new Set<number>();
  const seenThumbnails = new Set<string>();
  const stories = roundup.stories.filter((story) => {
    if (!isValidStory(story, roundup.weekOf)) {
      return false;
    }

    if (
      seenIds.has(story.id) ||
      seenSlugs.has(story.slug) ||
      seenRanks.has(story.rank) ||
      seenThumbnails.has(story.thumbnailVariant)
    ) {
      return false;
    }

    seenIds.add(story.id);
    seenSlugs.add(story.slug);
    seenRanks.add(story.rank);
    seenThumbnails.add(story.thumbnailVariant);
    return true;
  });

  return {
    ...roundup,
    stories: stories.sort((a, b) => a.rank - b.rank),
  };
}

export const industryNewsTimezone = rawNewsData.timezone || "America/Denver";

export const industryNewsRoundups = rawNewsData.roundups
  .map(validateRoundup)
  .filter((roundup): roundup is IndustryNewsRoundup => Boolean(roundup))
  .sort((a, b) => Date.parse(b.weekOf) - Date.parse(a.weekOf));

export const latestIndustryNewsRoundup =
  industryNewsRoundups.find((roundup) => roundup.weekOf === rawNewsData.latestRoundupDate) ??
  industryNewsRoundups[0] ??
  null;

export function formatIndustryNewsDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: industryNewsTimezone,
  }).format(new Date(date));
}
