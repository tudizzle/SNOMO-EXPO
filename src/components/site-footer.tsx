import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  rel?: string;
  target?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Plan",
    links: [
      { label: "Exhibitors & Floor Plan", href: "/exhibitors" },
      { label: "Schedule", href: "/schedule" },
      { label: "Swap Meet", href: "/swap-meet" },
    ],
  },
  {
    title: "Exhibit",
    links: [
      { label: "Sponsor the Expo", href: "/sponsor" },
      { label: "Vendor Registration Center", href: "/vendors" },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61563698281162",
        rel: "noopener noreferrer",
        target: "_blank",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/tudizzlefilmz/",
        rel: "noopener noreferrer",
        target: "_blank",
      },
      { label: "Contact", href: "mailto:tudizzle@gmail.com" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Colorado Snomo Expo footer">
      <div className="site-footer-brand">
        <Image
          alt="Colorado Snomo Expo"
          className="site-footer-logo"
          height={532}
          src="/images/logos/colorado-snomo-expo-primary.png"
          width={1301}
        />
        <p>Your Winter Starts Here.</p>
      </div>

      <div className="site-footer-columns">
        {footerColumns.map((column) => (
          <nav className="site-footer-column" key={column.title} aria-label={column.title}>
            <h2>{column.title}</h2>
            {column.links.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                rel={link.rel}
                target={link.target}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      <div className="site-footer-bottom">
        <p>© 2026 Colorado Snomo Expo</p>
        <p>Built with pride for the Rocky Mountain snowmobile community.</p>
        <span>Version 2026</span>
      </div>
    </footer>
  );
}
