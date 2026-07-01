"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigationItems = [
  { href: "/exhibitors", label: "Exhibitors" },
  { href: "/schedule", label: "Schedule" },
  { href: "/floorplan", label: "Floorplan" },
  { href: "/swap-meet", label: "Swap Meet" },
  { href: "/plan-your-visit", label: "Plan Your Visit" },
  { href: "/sponsor", label: "Sponsor" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${
        isMenuOpen ? "site-header-open" : ""
      }`}
    >
      <Link
        className="site-brand"
        href="/"
        aria-label="Colorado Snomo Expo home"
        onClick={() => setIsMenuOpen(false)}
      >
        <Image
          className="site-brand-logo"
          src="/images/logos/colorado-snomo-expo-primary.png"
          alt="Colorado Snomo Expo"
          width={122}
          height={50}
          priority
        />
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="site-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        className="site-navigation"
        id="site-navigation"
        aria-label="Primary navigation"
      >
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="site-header-actions">
        <Link
          className="vendor-link"
          href="/vendors"
          onClick={() => setIsMenuOpen(false)}
        >
          Become a Vendor
        </Link>
      </div>
    </header>
  );
}
