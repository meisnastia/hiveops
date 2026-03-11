#!/usr/bin/env python3
"""Generate LinkedIn banner — HiveOps style: dark + rich honeycomb + honey gold."""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

W, H = 1584, 396
BG = (18, 14, 2)
HONEY = (255, 193, 7)
HONEY_DIM = (184, 134, 11)
WHITE = (255, 248, 225)
MUTED = (200, 185, 170)

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "img")


def hex_points(cx, cy, r):
    return [(cx + r * math.cos(math.radians(60 * i - 30)), cy + r * math.sin(math.radians(60 * i - 30))) for i in range(6)]


def draw_honeycomb_rich(w, h, cell_size=38):
    """Draw a rich honeycomb pattern with varying opacity."""
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    hex_w = cell_size * math.sqrt(3)
    hex_h = cell_size * 2

    row = 0
    y = -cell_size
    while y < h + cell_size:
        x_offset = (hex_w / 2) if row % 2 else 0
        x = -cell_size + x_offset
        col = 0
        while x < w + cell_size:
            # Vary opacity based on position — brighter in center-right
            dist_x = abs(x - w * 0.6) / w
            dist_y = abs(y - h * 0.5) / h
            dist = math.sqrt(dist_x ** 2 + dist_y ** 2)

            # Base alpha + position-based boost
            base_alpha = 22
            boost = max(0, int(30 * (1 - dist * 2.5)))
            alpha = min(55, base_alpha + boost)

            pts = hex_points(x, y, cell_size)
            d.polygon(pts, outline=(255, 193, 7, alpha), width=1)

            # Fill some cells with very faint honey
            if (row + col) % 7 == 0 and dist < 0.4:
                d.polygon(pts, fill=(255, 193, 7, 6))

            x += hex_w
            col += 1
        y += hex_h * 0.75
        row += 1

    return img


def make_banner():
    # Base with subtle gradient
    img = Image.new("RGBA", (W, H), BG + (255,))

    # Radial warm glow in center-right
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx, cy = int(W * 0.55), H // 2
    for r in range(600, 0, -2):
        a = int(18 * (r / 600) ** 0.5)
        gd.ellipse([cx - r * 1.8, cy - r, cx + r * 1.8, cy + r], fill=(255, 193, 7, a))
    img = Image.alpha_composite(img, glow)

    # Rich honeycomb pattern
    honeycomb = draw_honeycomb_rich(W, H, cell_size=36)
    img = Image.alpha_composite(img, honeycomb)

    # Accent decorative hexagons
    deco = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dd = ImageDraw.Draw(deco)

    # Large hex right side
    for r, a, w in [(160, 35, 2), (170, 18, 1), (145, 12, 1)]:
        dd.polygon(hex_points(W - 130, H // 2, r), outline=(255, 193, 7, a), width=w)

    # Medium hexes scattered
    dd.polygon(hex_points(W - 320, 50, 70), outline=(255, 193, 7, 22), width=1)
    dd.polygon(hex_points(W - 380, H - 40, 50), outline=(255, 193, 7, 18), width=1)
    dd.polygon(hex_points(120, H - 60, 55), outline=(255, 193, 7, 14), width=1)
    dd.polygon(hex_points(80, 40, 35), outline=(255, 193, 7, 10), width=1)

    # Filled accent hex
    dd.polygon(hex_points(W - 80, 50, 25), fill=(255, 193, 7, 20), outline=(255, 193, 7, 35), width=1)
    dd.polygon(hex_points(W - 260, H - 20, 20), fill=(255, 193, 7, 15), outline=(255, 193, 7, 25), width=1)

    img = Image.alpha_composite(img, deco)

    draw = ImageDraw.Draw(img)

    # Load fonts
    font_large = font_medium = font_small = font_tag = None
    for fp in ["/System/Library/Fonts/Helvetica.ttc", "/System/Library/Fonts/SFNSDisplay.ttf"]:
        if os.path.exists(fp):
            try:
                font_large = ImageFont.truetype(fp, 72)
                font_medium = ImageFont.truetype(fp, 30)
                font_small = ImageFont.truetype(fp, 22)
                font_tag = ImageFont.truetype(fp, 18)
                break
            except Exception:
                continue

    if not font_large:
        font_large = ImageFont.load_default()
        font_medium = font_small = font_tag = font_large

    # Text position — right of where LinkedIn profile photo sits (~400px from left)
    tx = 480

    # Name — big and bold
    draw.text((tx, 60), "Anastasia", fill=HONEY, font=font_large)
    draw.text((tx + 380, 60), "Hnylytska", fill=WHITE, font=font_large)

    # Title — no "Junior"
    title_y = 150
    draw.text((tx, title_y), "DevOps & Platform Engineer", fill=WHITE, font=font_medium)

    # Accent line
    line_y = title_y + 44
    # Gradient-like line — draw multiple segments
    for i in range(480):
        alpha = max(0, 255 - int(i * 0.5))
        draw.line([(tx + i, line_y), (tx + i + 1, line_y)], fill=(*HONEY_DIM, alpha), width=2)

    # Tech tags with dot separators
    tags_y = line_y + 18
    tags = [
        "GCP", "Terraform", "Kubernetes", "Docker",
        "CI/CD", "Monitoring", "Azure", "IaC"
    ]
    tag_x = tx
    for i, tag in enumerate(tags):
        if i > 0:
            draw.text((tag_x, tags_y), " · ", fill=(*HONEY_DIM, 120), font=font_small)
            tag_x += 28
        draw.text((tag_x, tags_y), tag, fill=MUTED, font=font_small)
        bbox = font_small.getbbox(tag)
        tag_x += bbox[2] - bbox[0]

    # Website + branding
    bot_y = tags_y + 42
    draw.text((tx, bot_y), "smartbee.me", fill=(*HONEY, 200), font=font_tag)

    # "Infrastructure as Instinct" tagline
    draw.text((tx + 160, bot_y + 2), "— Infrastructure as Instinct", fill=(*MUTED, 140), font=font_tag)

    # Save
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, "linkedin-banner.png")
    img.convert("RGB").save(out_path, quality=95)
    print(f"Saved: {out_path} ({os.path.getsize(out_path) // 1024} KB)")


if __name__ == "__main__":
    make_banner()
