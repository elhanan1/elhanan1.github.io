#!/usr/bin/env python3
"""
Generate the three LQIP image tiers used by the portfolio from your
original photos.

Drop your original images into assets/originals/ (any name, e.g.
lamp.jpg, lamp-2.jpg, lamp-3.jpg for gallery variants) and run:

    python3 scripts/generate-images.py

For each originals/<name>.<ext> it creates:
  - assets/img/<name>-medium.webp   ~600px wide, used for the glass-lens
                                     reveal on the home page and in galleries
  - assets/img/<name>-full.jpg      ~1600px wide, used on the project page
  - a tiny (~20px) base64 data URI, written to assets/img/tiny-lqip.json
    and printed to the console so you can paste it into data/works.js

Pass --update-data to also auto-patch the "tiny:" fields in
data/works.js for any id whose name matches a generated file.

Requires Pillow:  pip3 install Pillow
"""
import json
import re
import sys
from base64 import b64encode
from io import BytesIO
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow is required. Install it with:\n  pip3 install Pillow")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "assets" / "originals"
OUT_DIR = ROOT / "assets" / "img"
DATA_FILE = ROOT / "data" / "works.js"
LQIP_JSON = OUT_DIR / "tiny-lqip.json"

MEDIUM_WIDTH = 600
FULL_WIDTH = 1600
TINY_WIDTH = 20
MEDIUM_QUALITY = 78
FULL_QUALITY = 85
TINY_QUALITY = 40

VALID_EXT = {".jpg", ".jpeg", ".png", ".webp"}


def resize_to_width(img, width):
    if img.width <= width:
        return img.copy()
    ratio = width / img.width
    height = max(1, round(img.height * ratio))
    return img.resize((width, height), Image.LANCZOS)


def make_tiny_data_uri(img):
    tiny = resize_to_width(img, TINY_WIDTH).convert("RGB")
    buf = BytesIO()
    tiny.save(buf, format="JPEG", quality=TINY_QUALITY)
    b64 = b64encode(buf.getvalue()).decode("ascii")
    size_kb = len(buf.getvalue()) / 1024
    return f"data:image/jpeg;base64,{b64}", size_kb


def process_one(path):
    name = path.stem
    img = Image.open(path).convert("RGB")

    medium = resize_to_width(img, MEDIUM_WIDTH)
    medium_path = OUT_DIR / f"{name}-medium.webp"
    medium.save(medium_path, "WEBP", quality=MEDIUM_QUALITY)

    full = resize_to_width(img, FULL_WIDTH)
    full_path = OUT_DIR / f"{name}-full.jpg"
    full.save(full_path, "JPEG", quality=FULL_QUALITY)

    tiny_uri, tiny_kb = make_tiny_data_uri(img)

    print(f"{name}:")
    print(f"  medium -> {medium_path.relative_to(ROOT)}  ({medium.width}x{medium.height})")
    print(f"  full   -> {full_path.relative_to(ROOT)}  ({full.width}x{full.height})")
    print(f"  tiny   -> {tiny_kb:.2f} KB data URI")
    return name, tiny_uri


def update_works_data(tiny_map):
    if not DATA_FILE.exists():
        print(f"\nSkipping --update-data: {DATA_FILE} not found.")
        return
    text = DATA_FILE.read_text()
    updated = []
    for name, uri in tiny_map.items():
        # Only match base names (skip gallery variants like name-2, name-3)
        if re.search(r"-\d+$", name):
            continue
        pattern = re.compile(
            r'(id:\s*"' + re.escape(name) + r'"[\s\S]*?tiny:\s*)"[^"]*"'
        )
        new_text, count = pattern.subn(lambda m: m.group(1) + f'"{uri}"', text, count=1)
        if count:
            text = new_text
            updated.append(name)
    if updated:
        DATA_FILE.write_text(text)
        print(f"\nUpdated tiny: fields in data/works.js for: {', '.join(updated)}")
    else:
        print("\nNo matching id blocks found in data/works.js to update.")


def main():
    update_data = "--update-data" in sys.argv

    if not SRC_DIR.exists():
        print(f"No originals folder found at {SRC_DIR}")
        sys.exit(1)

    sources = sorted(p for p in SRC_DIR.iterdir() if p.suffix.lower() in VALID_EXT)
    if not sources:
        print(f"No images found in {SRC_DIR}. Drop your photos there and re-run.")
        sys.exit(0)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    tiny_map = {}
    for path in sources:
        name, uri = process_one(path)
        tiny_map[name] = uri

    LQIP_JSON.write_text(json.dumps(tiny_map, indent=2))
    print(f"\nWrote tiny LQIP map -> {LQIP_JSON.relative_to(ROOT)}")

    if update_data:
        update_works_data(tiny_map)
    else:
        print("\nTip: run with --update-data to auto-fill the tiny: fields in data/works.js")


if __name__ == "__main__":
    main()
