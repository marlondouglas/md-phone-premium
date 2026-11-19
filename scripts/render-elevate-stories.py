#!/usr/bin/env python3
"""MD PHONE studio stories: original, silent product-focused editorial clips.

Uses photographs present in our own catalog manifest, never copies Apple launch films.
Product silhouettes and product colors are preserved, with no synthetic 360-degree rotation.
"""
import json,math,subprocess
from pathlib import Path
from PIL import Image,ImageDraw,ImageFilter
import imageio_ffmpeg

ROOT=Path("_site")
manifest_file=ROOT/"md-photo-manifest.js"
raw=manifest_file.read_text()
if not raw.startswith("window.MD_PHOTOS = "):
    raise SystemExit("Missing photo manifest")
manifest=json.loads(raw[len("window.MD_PHOTOS = "):].strip().rstrip(";"))
ROOT_ASSETS=ROOT/"assets"
ROOT_ASSETS.mkdir(parents=True,exist_ok=True)
W,H,FPS,SECONDS=720,840,12,7
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
stories=[
  {"key":"iphone-18-pro-max","name":"iphone-18","base":(5,25,17),"glow":(50,132,92),"alt":(209,255,220)},
  {"key":"iphone-17-pro-max","name":"iphone-17","base":(6,28,24),"glow":(35,107,104),"alt":(207,255,250)},
  {"key":"media::airpods-pro-3","name":"airpods-pro","base":(230,239,228),"glow":(157,204,170),"alt":(30,66,49)}
]
def get_photo(key):
    value=manifest.get(key)
    if not value:return None
    file=ROOT/value
    if not file.is_file():return None
    try:
        with Image.open(file) as im:
            img=im.convert("RGBA")
        if img.width<190 or img.height<190:return None
        if img.getchannel("A").getextrema()[0]<220:
            bbox=img.getchannel("A").point(lambda x:255 if x>18 else 0).getbbox()
            if bbox:img=img.crop(bbox)
        return img
    except Exception as err:
        print("Story photo invalid",key,str(err)[:100]);return None

def background(config):
    base=Image.new("RGB",(W,H),config["base"])
    layer=Image.new("RGBA",(W,H),(0,0,0,0))
    draw=ImageDraw.Draw(layer,"RGBA")
    for circle in range(8):
        pad=circle*35
        draw.ellipse((92-pad,80-pad,650+pad,730+pad),fill=(*config["glow"],max(0,48-circle*5)))
    layer=layer.filter(ImageFilter.GaussianBlur(65))
    return Image.alpha_composite(base.convert("RGBA"),layer)

def frame_of(base,photo,step):
    im=base.copy()
    if photo:
        ease=(1-math.cos(math.pi*step))/2
        scale=.90+.075*ease
        maxw,maxh=(630,710) if photo.width/photo.height<1.1 else (680,660)
        factor=min(maxw/photo.width,maxh/photo.height)*scale
        ww=max(1,round(photo.width*factor))
        hh=max(1,round(photo.height*factor))
        product=photo.resize((ww,hh),Image.Resampling.LANCZOS)
        dx=(W-ww)//2+round(9*math.sin(math.pi*step))
        dy=(H-hh)//2-round(12*ease)
        im.alpha_composite(product,(dx,dy))
    return im.convert("RGB")

made={}
for config in stories:
    photo=get_photo(config["key"])
    if photo is None:
        print("Original story postponed, photo missing:",config["key"])
        made[config["name"]]=False
        continue
    out=ROOT_ASSETS/("md-story-"+config["name"]+".mp4")
    base=background(config)
    ffmpeg_args=[ffmpeg,"-y","-loglevel","error","-f","rawvideo","-vcodec","rawvideo","-s",f"{W}x{H}","-pix_fmt","rgb24","-r",str(FPS),"-i","-","-an","-c:v","libx264","-pix_fmt","yuv420p","-crf","24","-preset","veryfast","-movflags","+faststart",str(out)]
    proc=subprocess.Popen(ffmpeg_args,stdin=subprocess.PIPE,stderr=subprocess.PIPE)
    try:
        for frame in range(FPS*SECONDS):
            phase=frame/(FPS*SECONDS-1)
            proc.stdin.write(frame_of(base,photo,phase).tobytes())
    except BrokenPipeError:
        pass
    proc.stdin.close()
    errors=proc.stderr.read().decode(errors="replace")
    code=proc.wait()
    if code or not out.is_file() or out.stat().st_size<10000:
        raise RuntimeError(f"Story failed {config['name']}: {errors[:800]}")
    cover=ROOT_ASSETS/("md-story-"+config["name"]+"-poster.jpg")
    frame_of(base,photo,0.25).save(cover,quality=86,optimize=True)
    made[config["name"]]=True
    print("MD story generated:",config["name"],out.stat().st_size,"bytes")
(ROOT/"md-stories-manifest.js").write_text("window.MD_STORIES = "+json.dumps(made,separators=(',',':'))+";\n")
print("MD PHONE studio story report:",made)
