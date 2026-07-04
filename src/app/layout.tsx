import type { Metadata } from "next";
import { createPageMetadata, siteUrl } from "@/lib/seo";
import "@/styles/globals.css";
import "@/styles/design-system.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  ...createPageMetadata({
    title: "Colorado Snomo Expo | Your Winter Starts Here",
    description:
      "The Rocky Mountain Region's Premier Winter Powersports Expo returns October 23-24, 2026 at the National Western Complex in Denver.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
