"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import geometry from "../../docs/floorplan-2026/booth-geometry.json";
import { vendorAssignments2026 } from "@/data/vendor-assignments-2026";
import vendorLogos from "@/data/vendor-logos-2026.json";
import styles from "./interactive-floor-plan.module.css";

const booths = geometry.booths.map((booth) => {
  const [left, top, right, bottom] = booth.bounds;
  return {
    ...booth,
    // Use the supplied polygon for rotated booths, never their bounding box.
    points: (booth.polygon ?? [[left, top], [right, top], [right, bottom], [left, bottom]])
      .map((point) => point.join(",")).join(" "),
    companies: vendorAssignments2026
      .filter((assignment) => assignment.booth === booth.number)
      .map((assignment) => assignment.name),
  };
});

type Selection = { number: number; pinned: boolean } | null;

const logos: Record<string, { src: string; background: string } | undefined> = vendorLogos;

function PopupCompany({ company }: { company: string }) {
  const logo = logos[company];
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.company}>
      {logo && !failed && (
        <span className={styles.logo} data-background={logo.background}>
          <Image src={logo.src} alt="" width={64} height={40} unoptimized onError={() => setFailed(true)} />
        </span>
      )}
      <p>{company}</p>
    </div>
  );
}

export function InteractiveFloorPlan({ src, fullSize = false }: { src: string; fullSize?: boolean }) {
  const [selection, setSelection] = useState<Selection>(null);
  const [position, setPosition] = useState({ left: 8, top: 8, width: 260, maxHeight: 300, visible: false });
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const repositionRef = useRef<(() => void) | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const boothRefs = useRef(new Map<number, SVGPolygonElement>());
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restoringFocus = useRef(false);
  const hoverDismissed = useRef(false);
  const popupId = useId();
  const activeBooth = booths.find((booth) => booth.number === selection?.number);

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = null;
  }, []);

  const dismiss = useCallback(() => {
    cancelHide();
    // Removing a popup can expose a booth underneath a stationary pointer.
    // Wait for a real pointer movement before revealing another hover popup.
    hoverDismissed.current = true;
    // Return keyboard users to their booth without reopening on focus.
    if (selection && popupRef.current?.contains(document.activeElement)) {
      restoringFocus.current = true;
      boothRefs.current.get(selection.number)?.focus({ preventScroll: true });
      restoringFocus.current = false;
    }
    setSelection(null);
  }, [cancelHide, selection]);

  const scheduleHide = () => {
    cancelHide();
    // Allow a brief pointer departure without flickering the details panel.
    hideTimer.current = setTimeout(() => {
      setSelection((current) => {
        const focus = document.activeElement;
        return current?.pinned || popupRef.current?.contains(focus) ||
          (current && boothRefs.current.get(current.number) === focus) ? current : null;
      });
    }, 300);
  };

  useEffect(() => cancelHide, [cancelHide]);

  useEffect(() => {
    if (!selection) return;
    const outside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (popupRef.current?.contains(target)) return;
      if (mapRef.current?.contains(target) && target.closest("[data-booth]")) return;
      dismiss();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [selection, dismiss]);

  useLayoutEffect(() => {
    if (!selection) return;
    const updatePosition = () => {
      const map = mapRef.current;
      const popup = popupRef.current;
      const booth = boothRefs.current.get(selection.number);
      if (!map || !popup || !booth) return;
      const rect = map.getBoundingClientRect();
      const anchor = booth.getBoundingClientRect();
      const viewport = window.visualViewport;
      const viewportLeft = viewport?.offsetLeft ?? 0;
      const viewportTop = viewport?.offsetTop ?? 0;
      // In the full-size viewer, the map scrolls inside its own frame.
      const frame = fullSize ? frameRef.current?.getBoundingClientRect() : null;
      const viewLeft = Math.max(viewportLeft, frame?.left ?? viewportLeft);
      const viewTop = Math.max(viewportTop, frame?.top ?? viewportTop);
      const viewRight = Math.min(viewportLeft + (viewport?.width ?? innerWidth), frame?.right ?? Infinity);
      const viewBottom = Math.min(viewportTop + (viewport?.height ?? innerHeight), frame?.bottom ?? Infinity);
      const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const left = Math.max(8, viewLeft - rect.left + 8);
      const right = Math.min(rect.width - 8, viewRight - rect.left - 8);
      const top = Math.max(8, Math.max(viewTop, headerBottom) - rect.top + 8);
      const bottom = Math.min(rect.height - 8, viewBottom - rect.top - 8);
      const width = Math.max(0, Math.min(260, right - left));
      const maxHeight = Math.max(0, bottom - top);
      popup.style.width = `${width}px`;
      popup.style.maxHeight = `${maxHeight}px`;
      const height = popup.getBoundingClientRect().height;
      const pointer = pointerRef.current;
      const usePointer = !selection.pinned && pointer &&
        pointer.x >= rect.left && pointer.x <= rect.right &&
        pointer.y >= rect.top && pointer.y <= rect.bottom;
      const x = (usePointer ? pointer.x : (anchor.left + anchor.right) / 2) - rect.left;
      const y = (usePointer ? pointer.y : (anchor.top + anchor.bottom) / 2) - rect.top;
      // Follow at a comfortable diagonal distance, flipping each axis near an
      // edge. On small maps, use the available space without overflowing.
      const offset = (point: number, size: number, min: number, max: number, gap: number) => {
        if (point + gap + size <= max) return Math.max(min, point + gap);
        if (point - gap - size >= min) return Math.min(max - size, point - gap - size);
        return point < (min + max) / 2 ? max - size : min;
      };
      const next = {
        left: offset(x, width, left, right, 80),
        top: offset(y, height, top, bottom, 48),
        width, maxHeight, visible: width > 0 && maxHeight >= 80,
      };
      setPosition((previous) => Object.keys(next).every((key) =>
        previous[key as keyof typeof next] === next[key as keyof typeof next]) ? previous : next);
    };
    repositionRef.current = updatePosition;
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    if (mapRef.current) observer.observe(mapRef.current);
    if (popupRef.current) observer.observe(popupRef.current);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true, capture: true });
    window.visualViewport?.addEventListener("resize", updatePosition);
    window.visualViewport?.addEventListener("scroll", updatePosition);
    return () => {
      repositionRef.current = null;
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      window.visualViewport?.removeEventListener("resize", updatePosition);
      window.visualViewport?.removeEventListener("scroll", updatePosition);
    };
  }, [selection, fullSize]);

  return (
    <div
      className={`floorplan-image-frame${fullSize ? ` ${styles.fullSizeFrame}` : ""}`}
      ref={frameRef}
      onPointerEnter={cancelHide}
      onPointerLeave={(event) => { if (event.pointerType !== "touch") scheduleHide(); }}
    >
        <div
          className={`${styles.map}${fullSize ? ` ${styles.fullSizeMap}` : ""}`}
          ref={mapRef}
          onPointerMove={(event) => {
            if (event.pointerType === "touch" || popupRef.current?.contains(event.target as Node)) return;
            pointerRef.current = { x: event.clientX, y: event.clientY };
            if (!selection?.pinned) repositionRef.current?.();
          }}
        >
          <Image
            src={src}
            alt={`2026 Colorado Snomo Expo floorplan showing numbered booths, the seminar room, entrances and venue areas.${fullSize ? " Use View Participating Vendors for the accessible directory." : " 2026 Participating Vendors are listed below."}`}
            width={2048}
            height={1552}
            unoptimized
            priority
          />
          <svg className={styles.overlay} viewBox="0 0 2048 1552" role="group" aria-label="Interactive booths. Select a booth to view participating vendors.">
            {booths.map((booth) => (
              <polygon
                key={booth.number}
                ref={(element) => {
                  if (element) boothRefs.current.set(booth.number, element);
                  else boothRefs.current.delete(booth.number);
                }}
                points={booth.points}
                data-booth={booth.number}
                data-active={selection?.number === booth.number || undefined}
                className={styles.booth}
                vectorEffect="non-scaling-stroke"
                role="button"
                tabIndex={0}
                aria-label={`Booth ${booth.number}: ${booth.companies.join("; ")}`}
                aria-expanded={selection?.number === booth.number}
                aria-controls={selection?.number === booth.number ? popupId : undefined}
                aria-haspopup="dialog"
                onPointerEnter={(event) => {
                  if (event.pointerType === "touch" || hoverDismissed.current) return;
                  pointerRef.current = { x: event.clientX, y: event.clientY };
                  cancelHide();
                  setSelection((current) => current?.pinned ? current : { number: booth.number, pinned: false });
                }}
                onPointerMove={(event) => {
                  if (event.pointerType === "touch") return;
                  if (!hoverDismissed.current) return;
                  hoverDismissed.current = false;
                  cancelHide();
                  setSelection((current) => current?.pinned ? current : { number: booth.number, pinned: false });
                }}
                onFocus={() => {
                  if (restoringFocus.current) return;
                  pointerRef.current = null;
                  hoverDismissed.current = false;
                  cancelHide();
                  setSelection({ number: booth.number, pinned: false });
                }}
                onBlur={(event) => {
                  if (popupRef.current?.contains(event.relatedTarget)) return;
                  setSelection((current) => current?.pinned ? current : null);
                }}
                onClick={() => { cancelHide(); setSelection({ number: booth.number, pinned: true }); }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    cancelHide();
                    setSelection({ number: booth.number, pinned: true });
                  } else if (event.key === "Tab" && !event.shiftKey && selection?.pinned && selection.number === booth.number) {
                    event.preventDefault();
                    closeRef.current?.focus();
                  }
                }}
              />
            ))}
          </svg>
        {activeBooth && (
          <div
            ref={popupRef}
            id={popupId}
            role="dialog"
            aria-labelledby={`${popupId}-title`}
            className={styles.popup}
            style={{ left: position.left, top: position.top, width: position.width, maxHeight: position.maxHeight, visibility: position.visible ? "visible" : "hidden" }}
            onPointerEnter={cancelHide}
          >
            <div className={styles.popupHeader}>
              <strong id={`${popupId}-title`}>Booth {activeBooth.number}</strong>
              <button ref={closeRef} type="button" className={styles.close} aria-label="Close booth details" onClick={dismiss}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {activeBooth.companies.map((company) => <PopupCompany key={company} company={company} />)}
          </div>
        )}
        </div>
    </div>
  );
}
