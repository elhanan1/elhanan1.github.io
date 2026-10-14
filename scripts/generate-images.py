#!/usr/bin/env python3
"""
Generate the two image sizes used by the portfolio from your original
photos.

Drop your original images into assets/originals/ (any name, e.g.
lamp.jpg, lamp-2.jpg, lamp-3.jpg for gallery variants) and run:

    python3 scripts/generate-images.py

For each originals/<name>.<ext> it creates:
  - assets/img/<name>-medium.webp   ~600px wide, used in galleries and
                                     the home-page hover preview
  - assets/img/<name>-full.jpg      ~1600px wide, used on the project page

Requires Pillow:  pip3 install Pillow
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow is required. Install it with:\n  pip3 install Pillow")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "assets" / "originals"
OUT_DIR = ROOT / "assets" / "img"

MEDIUM_WIDTH = 600
FULL_WIDTH = 1600
MEDIUM_QUALITY = 78
FULL_QUALITY = 85

VALID_EXT = {".jpg", ".jpeg", ".png", ".webp"}


def resize_to_width(img, width):
    if img.width <= width:
        return img.copy()
    ratio = width / img.width
    height = max(1, round(img.height * ratio))
    return img.resize((width, height), Image.LANCZOS)


def load_source(path):
    """Open an image, keeping its alpha channel if it has one.

    A cut-out PNG carries its own transparency, and the pixels underneath
    it are usually black. Flattening it onto a colour here would bake a
    backdrop into the file that can only suit one of the site's two
    themes, so keep the alpha and let the page put a surface behind it.
    """
    img = Image.open(path)
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        return img.convert("RGBA")
    return img.convert("RGB")


def process_one(path):
    name = path.stem
    img = load_source(path)
    transparent = img.mode == "RGBA"

    medium = resize_to_width(img, MEDIUM_WIDTH)
    medium_path = OUT_DIR / f"{name}-medium.webp"
    medium.save(medium_path, "WEBP", quality=MEDIUM_QUALITY)

    full = resize_to_width(img, FULL_WIDTH)
    if transparent:
        # JPEG has no alpha channel, so a cut-out keeps its WebP form.
        full_path = OUT_DIR / f"{name}-full.webp"
        full.save(full_path, "WEBP", quality=FULL_QUALITY)
    else:
        full_path = OUT_DIR / f"{name}-full.jpg"
        full.save(full_path, "JPEG", quality=FULL_QUALITY)

    print(f"{name}:")
    print(f"  medium -> {medium_path.relative_to(ROOT)}  ({medium.width}x{medium.height})")
    print(f"  full   -> {full_path.relative_to(ROOT)}  ({full.width}x{full.height})")


def main():
    if not SRC_DIR.exists():
        print(f"No originals folder found at {SRC_DIR}")
        sys.exit(1)

    sources = sorted(p for p in SRC_DIR.iterdir() if p.suffix.lower() in VALID_EXT)
    if not sources:
        print(f"No images found in {SRC_DIR}. Drop your photos there and re-run.")
        sys.exit(0)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for path in sources:
        process_one(path)

    print(f"\nPoint each work's images.medium / images.full (and gallery items) "
          f"at the generated files in data/works.js.")


if __name__ == "__main__":
    main()
