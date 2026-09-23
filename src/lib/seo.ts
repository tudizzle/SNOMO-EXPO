import type { Metadata } from "next";

export const siteUrl = new URL("https://coloradosnomoexpo.com");

export const publicPagePaths = [
  "/",
  "/exhibitors",
  "/schedule",
  "/swap-meet",
  "/sponsor",
  "/sponsor-inquiry",
  "/plan-your-visit",
  "/vendors",
] as const;

type PageMetadata = {
  title: string;
  description: string;
  path: (typeof publicPagePaths)[number];
};

const siteName = "Colorado Snomo Expo";
const defaultImage = {
  url: "/images/hero/colorado-snomo-hero.jpg",
  width: 2600,
  height: 1353,
  alt: "Snowmobiler carving through deep powder in a snowy Colorado forest",
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      type: "website",
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage.url],
    },
  };
}
