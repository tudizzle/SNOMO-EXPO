import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
