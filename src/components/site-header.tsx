"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigationItems = [
  { href: "/exhibitors", label: "Exhibitors" },
  { href: "/schedule", label: "Schedule" },
  { href: "/floorplan", label: "Floorplan" },
  { href: "/swap-meet", label: "Swap Meet" },
  { href: "/sponsor", label: "Sponsors" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const navMeasureRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const updateNavigationMode = () => {
      const header = headerRef.current;
      const brand = brandRef.current;
      const navMeasure = navMeasureRef.current;
      const actions = actionsRef.current;

      if (!header || !brand || !navMeasure || !actions) {
        return;
      }

      const headerStyles = window.getComputedStyle(header);
      const inlinePadding =
        parseFloat(headerStyles.paddingLeft) + parseFloat(headerStyles.paddingRight);
      const viewportWidth = header.clientWidth;
      const desktopColumnGap =
        viewportWidth <= 1440
          ? Math.min(Math.max(viewportWidth * 0.016, 14), 28)
          : Math.min(Math.max(viewportWidth * 0.02, 16), 34);
      const usableWidth = header.clientWidth - inlinePadding;
      const desktopWidth =
        brand.offsetWidth +
        navMeasure.scrollWidth +
        actions.offsetWidth +
        desktopColumnGap * 2;

      const shouldUseCompactNavigation = desktopWidth > usableWidth;

      setIsCompact(shouldUseCompactNavigation);

      if (!shouldUseCompactNavigation) {
        setIsMenuOpen(false);
      }
    };

    updateNavigationMode();

    const resizeObserver = new ResizeObserver(updateNavigationMode);

    [headerRef.current, brandRef.current, navMeasureRef.current, actionsRef.current].forEach(
      (element) => {
        if (element) {
          resizeObserver.observe(element);
        }
      },
    );

    window.addEventListener("resize", updateNavigationMode);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateNavigationMode);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${
        isMenuOpen ? "site-header-open" : ""
      } ${isCompact ? "site-header-compact" : ""}`}
    >
      <div className="site-navigation-measure" ref={navMeasureRef} aria-hidden="true">
        {navigationItems.map((item) => (
          <span key={item.href}>{item.label}</span>
        ))}
      </div>

      <Link
        ref={brandRef}
        className="site-brand"
        href="/"
        aria-label="Colorado Snomo Expo home"
        onClick={() => setIsMenuOpen(false)}
      >
        <Image
          className="site-brand-logo"
          src="/images/logos/colorado-snomo-expo-primary.png"
          alt="Colorado Snomo Expo"
          width={171}
          height={70}
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

      <div className="site-header-actions" ref={actionsRef}>
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
