"""
Convert HH accelerator-stack partner logos from the PPTX export to
monochrome Happy Blue silhouettes for the homepage tech-stack section.

Source: PPTX with white-on-transparent (or dark-on-transparent) partner logos.
Pipeline: alpha-mask → fill #070733 → trim → resize to uniform height.

Drop the source PPTX media folder at /tmp/pptx-extract/ppt/media/ first.

Run:
    python3 scripts/build-tech-logos.py
"""
import os
import sys

try:
    from PIL import Image
except ImportError:
    print("Pillow vereist: python3 -m pip install --user Pillow", file=sys.stderr)
    sys.exit(1)

MEDIA_DIR = "/tmp/pptx-extract/ppt/media"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "tech-logos")
OUT_DIR = os.path.abspath(OUT_DIR)
BRAND_RGB = (0x07, 0x07, 0x33)
TARGET_H = 192  # source height for retina; tile renders at h-14 (56px)

# (slug, source image number from PPTX media folder)
LOGOS = [
    # Commerce
    ("shopify", 51),
    ("commercetools", 61),
    ("adobe-commerce", 67),
    ("bigcommerce", 64),
    ("medusa", 59),
    ("shopware", 52),
    # Experience
    ("storyblok", 53),
    ("strapi", 70),
    ("aem", 45),
    ("umbraco", 66),
    # iPaaS
    ("alumio", 60),
    ("xcore", 62),
    ("tinxit", 56),
    # Search
    ("tweakwise", 44),
    ("algolia", 43),
    ("meilisearch", 63),
    ("voyado", 54),
    # PXM
    ("akeneo", 65),
    ("katana-pim", 47),
    ("bluestone-pim", 68),
]


def process(src_path: str, out_path: str) -> tuple[int, int]:
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    new = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    spx = img.load()
    npx = new.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = spx[x, y]
            # Use alpha as silhouette; original color (dark or white) discarded.
            if a > 16:
                npx[x, y] = (*BRAND_RGB, a)
    bbox = new.getbbox()
    if bbox:
        new = new.crop(bbox)
    # Scale to target height
    nw, nh = new.size
    if nh > TARGET_H:
        ratio = TARGET_H / nh
        new = new.resize((max(1, int(nw * ratio)), TARGET_H), Image.LANCZOS)
    new.save(out_path, "PNG", optimize=True)
    return new.size


def main() -> int:
    if not os.path.isdir(MEDIA_DIR):
        print(f"ERROR: source dir niet gevonden: {MEDIA_DIR}", file=sys.stderr)
        print("Extract de PPTX eerst:", file=sys.stderr)
        print("  unzip -o '~/Downloads/Kopie van TOBROCO-GIANT - Happy Horizon ...pptx' -d /tmp/pptx-extract", file=sys.stderr)
        return 1
    os.makedirs(OUT_DIR, exist_ok=True)
    total_kb = 0
    for slug, num in LOGOS:
        src = os.path.join(MEDIA_DIR, f"image{num}.png")
        if not os.path.exists(src):
            print(f"  SKIP  {slug}: image{num}.png ontbreekt")
            continue
        out = os.path.join(OUT_DIR, f"{slug}.png")
        size = process(src, out)
        kb = os.path.getsize(out) // 1024
        total_kb += kb
        print(f"  OK    {slug}.png: {size[0]}x{size[1]}, {kb} KB")
    print(f"\nTotal: {total_kb} KB ({len(LOGOS)} files in {OUT_DIR})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
