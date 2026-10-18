"""Apply the approved map treatment without redrawing or resizing the source.

Requires Pillow, NumPy, and Arial Bold (or pass --font with an equivalent font).
The source, audited label windows, and geometry live in docs/floorplan-2026.
"""

import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs/floorplan-2026"
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--font", default="/System/Library/Fonts/Supplemental/Arial Bold.ttf")
args = parser.parse_args()
spec = json.loads((DOCS / "map-edit-spec.json").read_text())
geometry = json.loads((DOCS / "booth-geometry.json").read_text())
source_path = DOCS / spec["sourceFile"]
assert hashlib.sha256(source_path.read_bytes()).hexdigest() == spec["sourceSha256"]
source = np.array(Image.open(source_path).convert("RGB"))
height, width = source.shape[:2]
assert (width, height) == (geometry["imageWidth"], geometry["imageHeight"])
rgb = source.astype(np.int16)
red = (rgb[:, :, 0] > 180) & (rgb[:, :, 0] > rgb[:, :, 1] + 35) & (rgb[:, :, 0] > rgb[:, :, 2] + 35)

# Find enclosed backgrounds from the supplied red boundaries. Closing is used
# only for segmentation; the source outlines themselves are never redrawn.
barrier = Image.fromarray((red * 255).astype("uint8")).filter(ImageFilter.MaxFilter(5))
ImageDraw.floodfill(barrier, (0, 0), 127)
inside = np.array(barrier) == 0
interior = np.array(Image.fromarray((inside * 255).astype("uint8")).filter(ImageFilter.MaxFilter(5))) > 0
white = (rgb.min(axis=2) >= 248) & (rgb.max(axis=2) - rgb.min(axis=2) <= 5)
tint_mask = interior & white
out = source.copy()
peach = (255, 240, 229)
out[tint_mask] = peach

def window_mask(box):
    mask = np.zeros((height, width), dtype=bool)
    x0, y0, x1, y1 = box
    mask[y0:y1, x0:x1] = True
    return mask

# Audited windows replace only old numerals, preserving the original footprint
# of red dividers underneath overprinted text.
old_mask = np.zeros((height, width), dtype=bool)
for box in spec["oldLabelBoxes"].values():
    old_mask |= window_mask(box)
protected_wall = window_mask(spec["protectedWall"])
old_mask &= ~protected_wall
colored_red = (rgb[:, :, 0] > rgb[:, :, 1] + 8) & (rgb[:, :, 0] > rgb[:, :, 2] + 8)
clear = old_mask & ~colored_red
out[clear] = (255, 255, 255)
out[clear & interior] = peach
# As in the previous cleanup, lift black ink from existing red-colored pixels.
# This changes their color only: no boundary pixels or line segments are added.
red_overprint = old_mask & colored_red & (rgb[:, :, 0] < 245)
for channel in range(3):
    restored = np.rint(rgb[:, :, channel][red_overprint] * 255.0 /
                        np.maximum(1, rgb[:, :, 0][red_overprint]))
    out[:, :, channel][red_overprint] = np.clip(restored, 0, 255).astype(np.uint8)

heading_mask = window_mask(spec["roomHeadingPatch"])
out[heading_mask] = (255, 255, 255)
result = Image.fromarray(out)
heading = spec["roomHeadingPatch"]
scale = 4
patch = Image.new("RGB", ((heading[2] - heading[0]) * scale, (heading[3] - heading[1]) * scale), "white")
draw = ImageDraw.Draw(patch)
font = ImageFont.truetype(args.font, 34 * scale)
draw.text((patch.width / 2, patch.height / 2), spec["roomHeading"], font=font, anchor="mm", fill=(20, 20, 20))
result.paste(patch.resize((patch.width // scale, patch.height // scale), Image.Resampling.LANCZOS), heading[:2])
out = np.array(result)

new_mask = np.zeros((height, width), dtype=bool)
label_records = []
for booth in geometry["booths"]:
    x0, y0, x1, y1 = booth["bounds"]
    polygon = booth.get("polygon", [[x0, y0], [x1, y0], [x1, y1], [x0, y1]])
    center = np.mean(polygon, axis=0)
    size = spec["fontSizes"][0 if x1 - x0 < 98 else 1]
    glyph = Image.new("L", (140 * scale, 80 * scale), 0)
    draw = ImageDraw.Draw(glyph)
    draw.text((4 * scale, 4 * scale), str(booth["number"]),
              font=ImageFont.truetype(args.font, size * scale), fill=255)
    glyph = glyph.crop(glyph.getbbox())
    gw, gh = round(glyph.width / scale), round(glyph.height / scale)
    glyph = glyph.resize((gw, gh), Image.Resampling.LANCZOS)
    gx, gy = round(center[0] - gw / 2), round(center[1] - gh / 2)
    alpha = np.array(glyph, dtype=np.float64) / 255
    footprint = alpha > 0
    shape = Image.new("L", (width, height), 0)
    ImageDraw.Draw(shape).polygon([tuple(p) for p in polygon], fill=255)
    safe = np.array(shape.filter(ImageFilter.MinFilter(9))) > 0
    assert np.all(safe[gy:gy + gh, gx:gx + gw][footprint]), f"Label outside booth {booth['number']}"
    assert np.all(interior[gy:gy + gh, gx:gx + gw][footprint]), f"Unfilled booth {booth['number']}"
    patch_pixels = out[gy:gy + gh, gx:gx + gw].astype(np.float64)
    patch_pixels = np.rint(patch_pixels * (1 - alpha[:, :, None]) + 30 * alpha[:, :, None])
    out[gy:gy + gh, gx:gx + gw] = patch_pixels.astype(np.uint8)
    new_mask[gy:gy + gh, gx:gx + gw] |= footprint
    label_records.append({"number": booth["number"], "box": [gx, gy, gx + gw, gy + gh]})

allowed = tint_mask | old_mask | new_mask | heading_mask
changed = np.any(out != source, axis=2)
assert not np.any(changed & ~allowed), "Pixels outside the authorized edit areas changed"
assert not np.any(changed & red & ~old_mask), "Original red outlines changed outside label windows"
assert np.all(out[:, :, 0][colored_red] > out[:, :, 1][colored_red]), "Red boundary pixels lost"
assert np.all(out[:, :, 0][colored_red] > out[:, :, 2][colored_red]), "Red boundary pixels lost"
assert not np.any(changed & protected_wall), "Protected wall changed"
assert len(label_records) == 78
output = ROOT / "public/images/floorplan" / geometry["imageFilename"]
Image.fromarray(out).save(output, optimize=True)
report = {
    "sourceSha256": spec["sourceSha256"],
    "outputSha256": hashlib.sha256(output.read_bytes()).hexdigest(),
    "canvas": [width, height], "boothCount": len(label_records),
    "tintedPixels": int(tint_mask.sum()), "changedRedOutlinePixelsOutsideLabelWindows": 0,
    "cleanedRedPixelsUnderOldLabels": int(red_overprint.sum()),
    "changedPixelsOutsideAllowedAreas": 0, "allLabelsInsideBooths": True,
    "roomHeading": spec["roomHeading"], "labels": label_records,
}
(DOCS / "map-edit-verification.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({k: v for k, v in report.items() if k != "labels"}, indent=2))
print(output)
