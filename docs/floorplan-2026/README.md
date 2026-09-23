# 2026 Expo floor plan handoff

Final image: `2026-expo-floor-plan-clean-numbers.png` (2048 × 1552 pixels).

This is the finished map with slight peach booth interiors, “SEMINAR ROOM” replacing the original room heading, and clean, centered booth numbers. The original booth layout, dimensions, red-outline positions, walls, and other architectural features were retained. “CAPACITY 125” remains in place.

## Image and alignment requirements

- Use the final PNG as the map. Do not redraw or regenerate its geometry.
- Preserve the complete image and its exact aspect ratio, 2048:1552 (128:97). Displaying it smaller or larger requires uniform proportional scaling; no stretching, cropping, or distortion.
- `booth-geometry.json` contains 77 unique booths: 101–118, 201–228, and 300–330. Coordinates are measured in the original image’s pixels, with the origin at the upper-left, x increasing right, and y increasing down.
- Each `bounds` array is `[x0, y0, x1, y1]` around the existing red outline. Rotated booths 324, 329, and 330 also include their four-corner `polygon` and `center`. Use their polygons for hit areas rather than treating their bounding boxes as booth rectangles.
- These coordinates support alignment and interaction; they are not real-world measurements or a replacement for the source plan. Keep the image as the visual source of truth. Scale and position any interactive overlays with the same transformation as the image.
- For a responsive website, preserve the image’s intrinsic aspect ratio. An overlay using a `0 0 2048 1552` coordinate space must occupy the same displayed image rectangle.

## Vendor assignments

The authoritative assignments are from the updated `2026 Colorado SnoMo Expo Vendor List.xlsx`, supplied September 23, 2026, Sheet1!A1:B80. This workbook supersedes the earlier vendor PDF.

- `vendor-assignments.json` contains 82 company-booth entries covering all 77 map booths, in numeric booth order. Each company-booth pair occupies a separate row; G-Force Powersports appears separately for 116, 117, and 118. Shared booths retain every listed company.
- Column C (booth sizes) is intentionally omitted from all displayed assignment data. The source workbook is not exposed by the public website.
- Confirmed corrections: Logan Coach 311; Transwest Truck Trailer RV 316; Rocky Talkie 315; Tylers Backcountry Awareness 321; Friends of CAIC 323.
- No map booths are missing an assignment, and no source assignments refer to an unknown map booth. No dimensions are inferred from assignment data.

## SNOMO EXPO integration context

Project: `/Users/brandoncox/Documents/SNOMO EXPO/fix-countdown-and-favicon`.

- Map: `public/images/floorplan/2026-expo-floor-plan-clean-numbers.png`.
- Geometry and handoff notes: `docs/floorplan-2026/`.
- Website data: `src/data/vendor-assignments-2026.ts`.
- `src/app/exhibitors/page.tsx` reuses the approved floor-plan draft for the combined **Exhibitors & Floor Plan** page at `/exhibitors`. `/floorplan` permanently redirects to it. The map uses its intrinsic 2048 × 1552 dimensions and proportional responsive display, with full-size viewing and downloading available.
- `src/app/exhibitors/floorplan.module.css` retains the draft's scoped directory styles and uses the existing mobile Exhibitors heading scale to accommodate the longer page title.
- The legacy `placeholderExhibitors` in `src/data/exhibitors.ts` is no longer used by the public directory.
- The sorted workbook, JSON reference, and website data were verified to contain the same 82 rows covering all 77 booths, including shared booths and repeated company names.
- Approved PNG SHA-256: `549540080f409f85fce3093481351f8a156a840c4cd139a31fa3d93c0d0645ae`. The copied asset and the image served by the production preview match this fingerprint.

## Interactive map

`src/components/interactive-floor-plan.tsx` places a transparent SVG overlay directly over the unchanged image. Its `0 0 2048 1552` viewBox scales proportionally with the image. Hit areas use the supplied bounds or, for booths 324, 329, and 330, the supplied polygons. Popup company names come from the same `vendorAssignments2026` array used by the directory.

Hover or keyboard focus reveals a booth. Click, Enter, or Space pins the popup. Another booth switches the selection. Escape, the close control, or an outside click dismisses it. The compact, translucent black popup with a red border follows the pointer with an 80px horizontal and 48px vertical gap, flipping sides near map edges. When neither side has enough space, it uses the available map area without overflowing. Keyboard/touch activation uses the selected booth as its anchor. Pinned details do not follow pointer movement. Position and size stay within the visible map area on small screens; the map's size never changes when details open. The last hovered booth remains visible while the pointer crosses the map or moves into the popup. Touch activation uses click without requiring hover; normal scrolling and browser zoom are not disabled.

Run `node scripts/verify-floor-plan.mjs` to verify the approved map fingerprint, dimensions, assignment coverage, ordering, and rotated polygon records. With a running preview, pass its origin to additionally check every rendered hit area's exact coordinates and accessible name, plus the served map fingerprint:

```sh
node scripts/verify-floor-plan.mjs http://127.0.0.1:3017
```

Browser checks cover all 77 popup assignments, alignment at 1440/1024/768/390/320px, narrow and rotated hit areas, popup visibility at 320px, keyboard operation, pointer transitions, and dismissal. Physical touch gestures still need an on-device review; mobile-width click activation and unrestricted scrolling/zoom were checked in the desktop browser.

## Source

Prepared in the Codex floor-plan editing task continuing “Edit Booth Floor Plan.” Original referenced ChatGPT conversation: `6ab35f5d-c844-83e8-9502-714cf9afc20b` (`chatgpt-conversation://6ab35f5d-c844-83e8-9502-714cf9afc20b`).

Source workspace: `/Users/brandoncox/Documents/Codex/2026-09-22/referenced-chatgpt-conversation-this-is-an`.
