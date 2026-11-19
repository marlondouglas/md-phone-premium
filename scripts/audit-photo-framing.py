#!/usr/bin/env python3
"""MD PHONE visual photo audit: measure visible handset, not container size.
Creates a contact sheet for manual review and JSON occupancy report.
"""
from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import json
root=Path("_site")
shots=Path("qa-snapshots")
shots.mkdir(parents=True,exist_ok=True)
prefix="window.MD_PHOTOS = "
manifest=json.loads((root/"md-photo-manifest.js").read_text().removeprefix(prefix).strip().rstrip(";"))
text=(Path("md-universe-data.js").read_text())
catalog=json.loads(text.split("window.MD_UNIVERSE = ",1)[1].strip().rstrip(";"))
phones=[p for p in catalog["products"] if p.get("category")=="iphone"]
CELL_W,CELL_H=340,420
sheet=Image.new("RGB",(CELL_W*4,CELL_H*4),(238,243,238))
d=ImageDraw.Draw(sheet)
try:font=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",18)
except OSError:font=ImageFont.load_default()
report={}
for i,p in enumerate(phones):
    key=p["id"];path=manifest.get(key)
    cell=Image.new("RGBA",(CELL_W,CELL_H),(248,250,248,255))
    entry={"name":p["name"],"source":path,"loaded":bool(path)}
    if path and (root/path).is_file():
      with Image.open(root/path) as original:
        im=ImageOps.exif_transpose(original).convert("RGBA")
      pixels=im.load()
      w,h=im.size
      alpha=im.getchannel("A")
      has_clear_alpha=alpha.getextrema()[0]<180
      if has_clear_alpha:
        bbox=alpha.point(lambda x:255 if x>=28 else 0).getbbox()
      else:
        edge=[pixels[x,y] for x,y in [(1,1),(w-2,1),(1,h-2),(w-2,h-2)]]
        ref=tuple(sorted(px[channel] for px in edge)[2] for channel in range(3))
        sample=im.convert("RGB")
        from PIL import ImageChops
        flat=Image.new("RGB",(w,h),ref)
        delta=ImageChops.difference(sample,flat).convert("L")
        bbox=delta.point(lambda x:255 if x>=38 else 0).getbbox()
      if bbox:
        bw,bh=bbox[2]-bbox[0],bbox[3]-bbox[1]
        entry["visual_width_ratio"]=round(bw/w,3)
        entry["visual_height_ratio"]=round(bh/h,3)
        entry["visible_area_ratio"]=round((bw/w)*(bh/h),3)
        entry["photo_dimensions"]=[w,h]
        entry["background_removed"]=has_clear_alpha
        crop=im.crop(bbox)
        output=ImageOps.contain(crop,(320,334),method=Image.Resampling.LANCZOS)
        cell.alpha_composite(output,((CELL_W-output.width)//2,10+(334-output.height)//2))
      else:
        entry["error"]="no recognizable subject"
    else:
      entry["error"]="local asset unavailable"
    report[key]=entry
    d1=ImageDraw.Draw(cell)
    d1.rectangle((0,352,CELL_W,CELL_H),fill=(239,244,237,255))
    d1.text((16,363),p["name"],font=font,fill=(10,50,29,255))
    d1.text((16,392),"FOTO OK" if entry.get("loaded") else "IMAGEM INDISPONIVEL",font=font,fill=(43,116,75,255))
    sheet.paste(cell.convert("RGB"),((i%4)*CELL_W,(i//4)*CELL_H))
sheet.save(shots/"elevate-product-contact-sheet.jpg",quality=86,optimize=True)
(shots/"elevate-photo-quality.json").write_text(json.dumps(report,ensure_ascii=False,indent=2))
for key in ["iphone-14-pro","iphone-15-pro","iphone-17-pro-max","iphone-18-pro-max"]:
    print("MD PHOTO FRAMING",key,report.get(key))
small=[(key,v.get("visual_height_ratio")) for key,v in report.items() if v.get("visual_height_ratio",1)<.56]
print("MD PHONE framing audit: small product photos:",small)
