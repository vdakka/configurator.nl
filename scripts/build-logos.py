"""
Convert customer brand logos to monochrome Happy Blue silhouettes.

Input:  /Users/gerke/Downloads/Logos/{various}.{svg,png,webp}
Output: /public/logos/{slug}.{svg,png} — monochrome #070733 with transparent bg

For SVGs:  parse XML, replace fill attributes with #070733
For raster (PNG/WebP):
  - If image has alpha → use alpha as silhouette mask
  - Otherwise assume white background and threshold against it
  - Render the silhouette filled with #070733 onto a transparent canvas
  - Auto-trim to bounding box
"""
import os
import re
import sys
from xml.etree import ElementTree as ET

try:
    from PIL import Image
except ImportError:
    print("Pillow vereist: python3 -m pip install --user Pillow", file=sys.stderr)
    sys.exit(1)

SRC_DIR = "/Users/gerke/Downloads/Logos"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "logos")
OUT_DIR = os.path.abspath(OUT_DIR)

BRAND_COLOR = "#070733"
BRAND_RGB = (0x07, 0x07, 0x33)

# (output filename, source filename, optional chroma-key colors)
# chroma_keys: list of (R, G, B, tolerance) — pixels matching are made transparent
# BEFORE the main conversion. Useful for logos where part of the design is a
# filled background that masks the recognisable foreground (e.g. Trendhopper's
# yellow circle hiding the "th" lettering).
LOGOS = [
    {"out": "gamma.svg", "src": "GAMMA_Logo.svg"},
    {"out": "fetim.svg", "src": "fetim.svg"},
    {"out": "karwei.png", "src": "Karwei_logo_(2017).png"},
    {"out": "praxis.png", "src": "Praxis_logo_2018.svg.png"},
    {"out": "leen-bakker.png", "src": "png-clipart-leen-bakker-logo-leen-bakker-logo-icons-logos-emojis-shop-logos.png"},
    {"out": "skantrae.png", "src": "skantrae-rgb.png"},
    {"out": "solarnrg.png", "src": "solarnrg.png"},
    {
        "out": "trendhopper.png",
        "src": "trendhopper.png",
        # Drop the yellow circle so the grey ring + "th" + wordmark all read.
        "chroma_keys": [(255, 215, 0, 80)],
    },
    {"out": "van-raam.png", "src": "van raam.webp"},
    {"out": "vogels.png", "src": "vogels-logo-vector.png"},
]


def process_svg(src: str, out: str) -> None:
    """Set every fill in the SVG to the brand color, leaving 'none' alone.

    If the SVG has a 'background path' (the logo was originally white-on-color),
    drop it: caller should pass `drop_first_path=True` for those logos.
    """
    with open(src, "r", encoding="utf-8") as f:
        content = f.read()

    # GAMMA-style logos have a first <path> covering the whole viewBox as the
    # background. We detect that pattern (path d starting with M0... h<width>)
    # and drop just that one path before recoloring.
    # Match: <path d="M{x},{y}h{w}v{h}..." fill="..." />
    bg_pattern = re.compile(
        r'<path[^>]*\sd="M\s*[\d.\-,]+\s*h[\d.\-,]+\s*v[\d.\-,]+[^"]*"[^>]*fill="[^"]+"[^/]*/>',
    )
    match = bg_pattern.search(content)
    if match:
        # Only drop if it's clearly a rectangle path (M,h,v sequence)
        content = content[: match.start()] + content[match.end():]

    # Replace fill="..." (any color including hex/named) with brand color.
    # Leave 'none' fills alone so cut-outs stay intact.
    def replace_fill(match: re.Match) -> str:
        value = match.group(1)
        if value.lower() in ("none", "transparent"):
            return match.group(0)
        return f'fill="{BRAND_COLOR}"'

    content = re.sub(r'fill="([^"]+)"', replace_fill, content)

    def replace_style_fill(match: re.Match) -> str:
        value = match.group(1).strip()
        if value.lower() in ("none", "transparent"):
            return match.group(0)
        return f"fill:{BRAND_COLOR}"

    content = re.sub(r'fill:\s*([^;"\s]+)', replace_style_fill, content)

    with open(out, "w", encoding="utf-8") as f:
        f.write(content)


def process_raster(src: str, out: str, chroma_keys=None) -> None:
    """Make a monochrome silhouette of the logo on a transparent canvas.

    Detects light-on-dark vs dark-on-light source and inverts the silhouette
    mask accordingly so the logo content always becomes the brand color.

    `chroma_keys` is an optional list of (R, G, B, tolerance) tuples; any pixel
    within tolerance of one of those colors gets made transparent BEFORE the
    monochrome conversion. Used to drop solid colored backgrounds inside a
    logo (e.g. Trendhopper's yellow circle masking the "th" lettering).
    """
    img = Image.open(src).convert("RGBA")
    w, h = img.size

    px_load = img.load()

    # Apply per-logo chroma-keys first.
    if chroma_keys:
        for y in range(h):
            for x in range(w):
                r, g, b, a = px_load[x, y]
                for key_r, key_g, key_b, tol in chroma_keys:
                    if abs(r - key_r) <= tol and abs(g - key_g) <= tol and abs(b - key_b) <= tol:
                        px_load[x, y] = (255, 255, 255, 0)
                        break

    # If the corners are pure-ish white & opaque, the source uses a white
    # background instead of transparency. Chroma-key that to alpha.
    corner = img.getpixel((0, 0))
    if corner[3] > 200 and min(corner[:3]) > 240:
        for y in range(h):
            for x in range(w):
                r, g, b, a = px_load[x, y]
                if min(r, g, b) > 240:
                    px_load[x, y] = (255, 255, 255, 0)

    px = img.load()

    # Now detect alpha-bg (should be True for both natively-transparent and
    # the white-chroma-keyed cases).
    has_alpha_bg = any(
        px[x, y][3] < 128 for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))
    )

    # Sample brightness of opaque pixels to characterise the logo.
    opaque_brightness = []
    sample_step = max(1, min(w, h) // 64)
    for y in range(0, h, sample_step):
        for x in range(0, w, sample_step):
            r, g, b, a = px[x, y]
            if a > 128:
                opaque_brightness.append((r + g + b) / 3)
    if opaque_brightness:
        avg_brightness = sum(opaque_brightness) / len(opaque_brightness)
        bright_count = sum(1 for b in opaque_brightness if b > 200)
        total = len(opaque_brightness)
        # "Has cutouts" = the opaque area contains a meaningful proportion of
        # very light pixels (text-style cut-outs inside a colored shape).
        # This catches Karwei (black bg + white text) AND Leen Bakker (pink bg
        # + white text). 5–95% range ensures we don't trigger for plain
        # wordmark-only logos that are mostly dark.
        bright_ratio = bright_count / total
        has_cutouts = 0.05 < bright_ratio < 0.95
    else:
        avg_brightness = 255
        has_cutouts = False
    is_dark_logo = avg_brightness < 128


    # Build mask: brand-color pixel where logo content is.
    # Three cases:
    #   A) has_alpha_bg + dark logo (light text on dark shape, e.g. Karwei):
    #      use BRIGHTNESS as silhouette (light pixels = logo)
    #   B) has_alpha_bg + light/neutral logo: use ALPHA as silhouette
    #   C) no alpha + dark logo on light bg: invert brightness (dark = logo)
    #   D) no alpha + light logo on dark bg: brightness directly (light = logo)
    new_img = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    new_px = new_img.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            brightness = (r + g + b) / 3
            if has_alpha_bg and has_cutouts:
                # A: shape-with-cutouts (Karwei, Leen Bakker). Keep the outer
                # alpha as silhouette but "punch out" bright interior pixels so
                # text inside reads as transparent against the brand-color shape.
                if a > 32:
                    if brightness > 200:
                        # cutout: transparent
                        pass
                    else:
                        new_px[x, y] = (*BRAND_RGB, a)
            elif has_alpha_bg:
                # B: typical transparent logo. Alpha alone.
                if a > 32:
                    new_px[x, y] = (*BRAND_RGB, a)
            elif is_dark_logo:
                # D: light logo content on dark bg, no transparency
                if brightness > 80:
                    alpha = max(0, min(255, int(brightness)))
                    new_px[x, y] = (*BRAND_RGB, alpha)
            else:
                # C: dark logo on light bg (most downloads)
                if brightness < 235:
                    alpha = max(0, min(255, int(255 - brightness)))
                    new_px[x, y] = (*BRAND_RGB, alpha)

    bbox = new_img.getbbox()
    if bbox:
        new_img = new_img.crop(bbox)

    target_h = 192
    if new_img.size[1] > target_h:
        ratio = target_h / new_img.size[1]
        new_w = int(new_img.size[0] * ratio)
        new_img = new_img.resize((new_w, target_h), Image.LANCZOS)

    new_img.save(out, "PNG", optimize=True)


def main() -> int:
    os.makedirs(OUT_DIR, exist_ok=True)
    total_kb = 0
    for cfg in LOGOS:
        out_name = cfg["out"]
        src_name = cfg["src"]
        chroma_keys = cfg.get("chroma_keys")
        src = os.path.join(SRC_DIR, src_name)
        if not os.path.exists(src):
            print(f"  SKIP  {out_name}: source not found at {src}", file=sys.stderr)
            continue
        out = os.path.join(OUT_DIR, out_name)
        if out_name.endswith(".svg"):
            process_svg(src, out)
        else:
            process_raster(src, out, chroma_keys=chroma_keys)
        kb = os.path.getsize(out) // 1024
        total_kb += kb
        print(f"  OK    {out_name}: {kb} KB")
    print(f"\nTotal: {total_kb} KB ({len(LOGOS)} files in {OUT_DIR})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
