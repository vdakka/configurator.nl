"""
Convert select PSD renders from the HH brand assets folder to web-ready PNGs.

Run once after assets land. Output goes to public/shapes/ and is committed
to the repo (these are static assets, not build output).

Usage:
    python3 scripts/build-shapes.py
"""
import os
import subprocess
import sys
import tempfile

try:
    from PIL import Image
except ImportError:
    print("Pillow is required: python3 -m pip install --user Pillow", file=sys.stderr)
    sys.exit(1)

BRAND_DIR = "/Users/gerke/Desktop/3d Happy huisstijl/3D Shapes CMYK 300DPI"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "shapes")
OUT_DIR = os.path.abspath(OUT_DIR)
MAX_WIDTH = 800  # target max width for the optimized PNG

# (output filename, source psd path)
SHAPES = [
    ("sphere-yellow-0.png", "Sphere/Yellow_Gloss/Sphere_Yellow_Gloss_0.psd"),
    ("sphere-yellow-2.png", "Sphere/Yellow_Gloss/Sphere_Yellow_Gloss_2.psd"),
    ("sphere-yellow-4.png", "Sphere/Yellow_Gloss/Sphere_Yellow_Gloss_4.psd"),
    ("sphere-blue-0.png", "Sphere/Dark_Blue_Gloss/Sphere_Dark_Blue_Gloss_0.psd"),
    ("sphere-blue-2.png", "Sphere/Dark_Blue_Gloss/Sphere_Dark_Blue_Gloss_2.psd"),
    ("tube-blue-0.png", "Small Tube/Dark_Blue_Gloss/Small Tube_Dark_Blue_Gloss_0.psd"),
    ("tube-blue-2.png", "Small Tube/Dark_Blue_Gloss/Small Tube_Dark_Blue_Gloss_2.psd"),
    ("cube-yellow-0.png", "Big Cube/Yellow_Gloss/Big Cube_Yellow_Gloss_0.psd"),
    ("bigtube-yellow-0.png", "Big Tube/Yellow_Gloss/Big Tube_Yellow_Gloss_0.psd"),
    ("bigtube-yellow-2.png", "Big Tube/Yellow_Gloss/Big Tube_Yellow_Gloss_2.psd"),
    ("bigtube-blue-0.png", "Big Tube/Dark_Blue_Gloss/Big Tube_Dark_Blue_Gloss_0.psd"),
    ("smallcube-yellow-0.png", "Small Cube/Yellow_Gloss/Small Cube_Yellow_Gloss_0.psd"),
    ("smallcube-yellow-2.png", "Small Cube/Yellow_Gloss/Small Cube_Yellow_Gloss_2.psd"),
    ("smallcube-blue-0.png", "Small Cube/Dark_Blue_Gloss/Small Cube_Dark_Blue_Gloss_0.psd"),
]


def psd_to_png(psd_path: str, tmp_png: str) -> None:
    """Use macOS sips to render the PSD to a PNG with alpha."""
    subprocess.run(
        ["sips", "-s", "format", "png", psd_path, "--out", tmp_png],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def trim_and_resize(png_path: str, out_path: str, max_width: int) -> tuple[int, int]:
    """Trim transparent borders, resize to max_width, save optimized PNG."""
    img = Image.open(png_path).convert("RGBA")
    # Trim transparent padding using alpha bbox
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    # Resize if wider than target
    w, h = img.size
    if w > max_width:
        new_h = int(h * (max_width / w))
        img = img.resize((max_width, new_h), Image.LANCZOS)

    # Save with PNG optimization
    img.save(out_path, "PNG", optimize=True)
    return img.size


def main() -> int:
    os.makedirs(OUT_DIR, exist_ok=True)
    total_kb = 0
    with tempfile.TemporaryDirectory() as tmp:
        for out_name, rel_src in SHAPES:
            src = os.path.join(BRAND_DIR, rel_src)
            if not os.path.exists(src):
                print(f"  SKIP  {out_name}: source not found at {src}", file=sys.stderr)
                continue
            tmp_png = os.path.join(tmp, out_name)
            psd_to_png(src, tmp_png)
            out = os.path.join(OUT_DIR, out_name)
            size = trim_and_resize(tmp_png, out, MAX_WIDTH)
            kb = os.path.getsize(out) // 1024
            total_kb += kb
            print(f"  OK    {out_name}: {size[0]}x{size[1]}, {kb} KB")
    print(f"\nTotal output: {total_kb} KB ({len(SHAPES)} files in {OUT_DIR})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
