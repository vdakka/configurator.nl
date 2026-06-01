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

# (slug, source image number from PPTX media folder, optional crop)
# crop: dict with optional 'left_frac' / 'right_frac' to drop a portion of the
# source before extracting the silhouette. Used when the PPTX source contains
# both an icon (which extracts poorly as a featureless blob) and a wordmark —
# we keep just the wordmark side. Fractions are relative to source width.
LOGOS = [
    # Commerce
    ("shopify", 51, None),
    ("commercetools", 61, None),
    ("adobe-commerce", 67, None),
    ("bigcommerce", 64, None),
    ("medusa", 59, None),
    ("shopware", 52, None),
    # Experience
    ("storyblok", 53, None),
    # Strapi gehandeld via simpleicons SVG (zie /public/tech-logos/strapi.svg).
    # Bron-PPTX heeft geen S-cutout, dus we slaan dit script over voor strapi.
    # AEM source = navy circle + "Adobe Experience Manager" wordmark. Circle
    # extraheert als kleurloze blob; we behouden alleen de wordmark rechts.
    ("aem", 45, {"left_frac": 0.45}),
    ("umbraco", 66, None),
    # iPaaS
    ("alumio", 60, None),
    ("xcore", 62, None),
    ("tinxit", 56, None),
    # Search
    ("tweakwise", 44, None),
    ("algolia", 43, None),
    ("meilisearch", 63, None),
    ("voyado", 54, None),
    # PXM
    ("akeneo", 65, None),
    ("katana-pim", 47, None),
    ("bluestone-pim", 68, None),
]

# Slugs die geen PNG genereren (handmatig of via extern beheerde SVG).
SKIP_SLUGS = {"strapi"}


def process(src_path: str, out_path: str, crop=None) -> tuple[int, int]:
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size

    # Optional source-side crop (used to drop e.g. an unrecognisable icon
    # next to a wordmark before silhouetting).
    if crop:
        left = int(w * crop.get("left_frac", 0))
        right = w - int(w * crop.get("right_frac", 0))
        img = img.crop((left, 0, right, h))
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
    rendered = 0
    for entry in LOGOS:
        slug, num, crop = entry
        if slug in SKIP_SLUGS:
            print(f"  SKIP  {slug}: handmatig beheerd (zie /public/tech-logos/{slug}.svg)")
            continue
        src = os.path.join(MEDIA_DIR, f"image{num}.png")
        if not os.path.exists(src):
            print(f"  SKIP  {slug}: image{num}.png ontbreekt")
            continue
        out = os.path.join(OUT_DIR, f"{slug}.png")
        size = process(src, out, crop=crop)
        kb = os.path.getsize(out) // 1024
        total_kb += kb
        rendered += 1
        print(f"  OK    {slug}.png: {size[0]}x{size[1]}, {kb} KB")
    print(f"\nTotal: {total_kb} KB ({rendered} files in {OUT_DIR})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
