"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import geometry from "../../docs/floorplan-2026/booth-geometry.json";
import { vendorAssignments2026 } from "@/data/vendor-assignments-2026";
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

export function InteractiveFloorPlan({ src }: { src: string }) {
  const [selection, setSelection] = useState<Selection>(null);
  const mapRef = useRef<HTMLDivElement>(null);
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

  return (
    <div
      className={styles.layout}
      onPointerEnter={cancelHide}
      onPointerLeave={(event) => { if (event.pointerType !== "touch") scheduleHide(); }}
    >
      <div className="floorplan-image-frame">
        <div className={styles.map} ref={mapRef}>
          <Image
            src={src}
            alt="2026 Colorado Snomo Expo floorplan showing numbered booths, the seminar room, entrances and venue areas. 2026 Participating Vendors are listed below."
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
                  cancelHide();
                  setSelection((current) => current?.pinned ? current : { number: booth.number, pinned: false });
                }}
                onPointerMove={(event) => {
                  if (event.pointerType === "touch" || !hoverDismissed.current) return;
                  hoverDismissed.current = false;
                  cancelHide();
                  setSelection((current) => current?.pinned ? current : { number: booth.number, pinned: false });
                }}
                onFocus={() => {
                  if (restoringFocus.current) return;
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
        </div>
      </div>
      <aside className={styles.details} aria-label="Selected booth details">
        {activeBooth ? (
          <div
            ref={popupRef}
            id={popupId}
            role="dialog"
            aria-labelledby={`${popupId}-title`}
            className={styles.popup}
            onPointerEnter={cancelHide}
          >
            <div className={styles.popupHeader}>
              <strong id={`${popupId}-title`}>Booth {activeBooth.number}</strong>
              <button ref={closeRef} type="button" className={styles.close} aria-label="Close booth details" onClick={dismiss}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {activeBooth.companies.map((company) => <p key={company}>{company}</p>)}
          </div>
        ) : (
          <p className={styles.hint}>Select a booth to see participating vendors.</p>
        )}
      </aside>
    </div>
  );
}
