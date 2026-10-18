# 2026 Expo floor plan handoff

## October 18 revision

The user supplied a revised drawing, originally named `2025 expo final floorplan.jpg`, for the **2026** event. Its unchanged source is preserved as `2026-floor-plan-source-october-18.jpg`. The filename's year does not change the event year.

- SledLab is added in booth **327**, with the supplied SledLab logo.
- TruckBoss moves from 327 to **328**.
- Octane Addictions moves from 328 to the new booth **331**.
- **329** moves above 328, to the right of 322/323; Feral SnowCat Society remains assigned to it.
- **331** is the angled booth below the left FREESTYLE SHOW label. Its outline differs from the previous 329 outline; it has its own measured polygon.
- Booth 330 and all other assignments remain in place, including every company sharing a booth.

## Map and alignment

The website's finished map is `public/images/floorplan/2026-expo-floor-plan-clean-numbers.png`, now **2679 × 2031 pixels**, matching the revised source's native dimensions. The prior 2048 × 1552 coordinate system is superseded. Preserve the complete image and its exact aspect ratio when scaling it; no cropping or stretching.

`booth-geometry.json` records **78** booths: 101–118, 201–228, and 300–331. Coordinates use the new source's pixels, with the origin at the upper-left. Bounds are `[x0, y0, x1, y1]`; rotated booths **324, 330, and 331** have four-corner polygons. Booth 329 is now rectangular. These are alignment coordinates, not real-world dimensions. The supplied drawing remains the visual source of truth.

The rendering treatment matches the prior approved map: pale peach `#FFF0E5` interiors, centered dark Arial Bold numbers, and **SEMINAR ROOM** replacing **BAR & GRILL**. **CAPACITY 125**, architecture, arrows, and original red outlines are retained.

`map-edit-spec.json` contains the audited original-number windows and heading replacement area. `scripts/prepare-floor-plan.py` applies the treatment without resizing or redrawing the source. Like the previous cleanup, it lifts black overprinted numeral ink from existing red pixels without adding boundary pixels or redrawing lines. It asserts that red outlines outside the old label windows and all pixels outside the allowed edit areas remain unchanged, and that every new label stays within its booth. `map-edit-verification.json` records source/output SHA-256 fingerprints, dimensions, and the 78 final label footprints.

Rebuild the image with Python, Pillow, NumPy, and Arial Bold installed:

```sh
python3 scripts/prepare-floor-plan.py
```

An alternative font path can be supplied with `--font`; review any font change visually before replacing the finished asset.

## Vendor data

`src/data/vendor-assignments-2026.ts`, `vendor-assignments.json`, and `2026-vendor-assignments-sorted.xlsx` contain the same **83** company-booth entries covering all 78 booths. G-Force Powersports has separate entries for 116, 117, and 118; shared booths retain every company. Both alphabetical and booth-number directory views use this common data, as do interactive-map popups.

The September 23 vendor workbook remains the baseline, with the user's October 18 assignments above superseding the affected rows. Booth sizes are intentionally omitted. Logo provenance and hashes are recorded in `vendor-logo-sources.md`; the SledLab PNG is the unchanged user-supplied file.

## Website behavior

`/exhibitors` shows a proportionally scaled static overview, with no booth hit areas or popups, plus both vendor sorting options. **Open Interactive Map** opens `/exhibitors/map` in a new tab. Both map views and both download links use the same revised PNG.

The interactive map starts fitted to the available screen and supports pinch zoom, drag-to-pan, trackpad zoom, +/− buttons, and **Fit map**. A transparent SVG overlay uses the image's 2679 × 2031 coordinate space. The image, aspect ratio, hit areas, and zoom dimensions must agree.

Hover or keyboard focus reveals booth details. Click, Enter, or Space pins them. Escape, the close control, or an outside click dismisses them. Popups remain readable at all zoom levels and are positioned within the visible frame. Starting a map gesture dismisses the popup and suppresses accidental booth activation after dragging. Keyboard access and the accessible vendor directory remain available.

## Verification

```sh
node scripts/verify-floor-plan.mjs
node scripts/verify-floor-plan-zoom.mjs
node scripts/verify-vendor-logos.mjs
# With a running production preview:
node scripts/verify-floor-plan.mjs http://127.0.0.1:3100
node scripts/verify-floor-plan.mjs http://127.0.0.1:3100 /exhibitors/map
node scripts/verify-vendor-logos.mjs http://127.0.0.1:3100
```

The map checks cover the image fingerprint, dimensions, 83 assignments, 78 hit areas, updated booth positions, accessible names, directory controls, and served PNG. The zoom suite covers fit sizing, source-relative zoom, touch/trackpad/Safari gesture paths, pan transitions, resize preservation, and popup/control isolation. Physical-phone multi-touch testing is separate from browser viewport and automated gesture checks.

The previous editing workflow is documented in the original floor-plan task workspace: `/Users/brandoncox/Documents/Codex/2026-09-22/referenced-chatgpt-conversation-this-is-an`. Its label-cleanup windows and styling were adapted to the revised source.
