#!/usr/bin/env python3
"""MD PHONE: recorte técnico de fundos claros em fotografias reais.
Preserva o produto e suas cores; não gera nem modifica a geometria do aparelho.
Só processa as fotos da linha iPhone depois do download para o próprio site.
"""
from __future__ import annotations
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

root = Path("_site")
manifest_file = root / "md-photo-manifest.js"
if not manifest_file.exists():
    raise SystemExit("Photo manifest not found")
prefix = "window.MD_PHOTOS = "
source = manifest_file.read_text()
if not source.startswith(prefix):
    raise SystemExit("Invalid photo manifest")
manifest = json.loads(source[len(prefix):].rstrip(";\r\n"))
stats = {"cleaned": 0, "skipped": 0, "failed": 0, "examples": {}}

def light_neutral(pixel):
    r,g,b,a = pixel
    return a > 245 and min(r,g,b) >= 195 and max(r,g,b)-min(r,g,b) <= 29

def transform(file_path):
    with Image.open(file_path) as original:
        image = ImageOps.exif_transpose(original).convert("RGBA")
    w,h = image.size
    if w < 160 or h < 160:
        return None
    alpha_before = image.getchannel("A")
    transparent = alpha_before.getextrema()[0] < 230
    if not transparent:
        points = [(1,1),(w-2,1),(1,h-2),(w-2,h-2),(w//2,1),(w//2,h-2),(1,h//2),(w-2,h//2)]
        qualified = [xy for xy in points if light_neutral(image.getpixel(xy))]
        if len(qualified) < 5:
            return None
        # Remove only the bright backdrop connected to the OUTER edge.
        # An enclosed pale iPhone back or white details cannot be reached.
        for point in qualified:
            if light_neutral(image.getpixel(point)):
                ImageDraw.floodfill(image, point, (255,255,255,0), thresh=17)
    bbox = image.getchannel("A").point(lambda x: 255 if x > 28 else 0).getbbox()
    if not bbox:
        return None
    bw,bh=bbox[2]-bbox[0],bbox[3]-bbox[1]
    # Do not crop unrelated large image backgrounds or tiny/invalid results.
    if bw < w*.075 or bh < h*.075:
        return None
    reduction=(bw/w)*(bh/h)
    if not transparent and reduction > .88:
        return None
    pad_x=max(8,round(bw*.035))
    pad_y=max(8,round(bh*.035))
    crop=image.crop((max(0,bbox[0]-pad_x),max(0,bbox[1]-pad_y),
                    min(w,bbox[2]+pad_x),min(h,bbox[3]+pad_y)))
    dest=file_path.with_name(file_path.stem+"-studio.png")
    crop.save(dest,"PNG",optimize=True)
    return dest

for key,path in list(manifest.items()):
    # Hero imagery for other categories remains unchanged.
    if not key.startswith("iphone-"):
        continue
    candidate = root / path
    if not candidate.is_file():
        stats["failed"] += 1
        continue
    try:
        result = transform(candidate)
        if result:
            manifest[key] = result.relative_to(root).as_posix()
            stats["cleaned"] += 1
            if key in {"iphone-14-pro","iphone-15-pro","iphone-17-pro-max","iphone-18-pro-max"}:
                from PIL import Image
                with Image.open(candidate) as before, Image.open(result) as after:
                    stats["examples"][key] = {"before":[before.width,before.height],"after":[after.width,after.height]}
        else:
            stats["skipped"] += 1
    except Exception as e:
        print(f"Photo cleanup skipped {key}: {type(e).__name__} {e}")
        stats["failed"] += 1

manifest_file.write_text(prefix + json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+";\n")
print("MD PHONE photos cleaned:",stats)

(root/'md-photo-audit.json').write_text(json.dumps(stats,ensure_ascii=False,indent=2))
