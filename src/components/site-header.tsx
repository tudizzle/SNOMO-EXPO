"use client";

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
        <svg
          className="site-brand-mark"
          viewBox="0 0 48 32"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M3 28L16.5 7.5L26 20L32 12L45 28H3Z" />
          <path d="M16.5 7.5L21 17L26 20" />
        </svg>
        <span>Colorado Snomo Expo</span>
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
