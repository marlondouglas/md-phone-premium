#!/usr/bin/env python3
"""Render an original silent MD PHONE editorial video from actual catalog imagery.
No fake 3D rotations; no YouTube, music, stock footage or reused launch trailers.
"""
from pathlib import Path
import json, math, subprocess, io
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

ROOT=Path("_site")
manifest_path=ROOT/"md-photo-manifest.js"
out=ROOT/"assets"/"md-elevate-film.mp4"
out.parent.mkdir(parents=True,exist_ok=True)
src=manifest_path.read_text()
manifest=json.loads(src[len("window.MD_PHOTOS = "):].strip().rstrip(";"))
model_ids=["iphone-17-pro-max","iphone-14-pro-max","iphone-13-pro"]
names=[
    ("iPhone 17","Pro Max.","Escolha com presença."),
    ("iPhone 14","Pro Max.","O detalhe faz diferença."),
    ("iPhone 13","Pro.","Clássico. Extraordinário."),
]
W,H,FPS,DURATION=960,540,15,10
def font(size,bold=False):
    candidates=[
      "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
      "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
      "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    ]
    for f in candidates:
        if Path(f).exists():return ImageFont.truetype(f,size)
    return ImageFont.load_default()

def load_image(key):
    path=ROOT/manifest.get(key,"")
    if not path.is_file():return None
    with Image.open(path) as file:
        image=file.convert("RGBA")
    # White-backed images are displayed only if their outside background can be removed.
    if image.getchannel("A").getextrema()[0]>225:
        rgba=image.load();w,h=image.size
        from PIL import ImageDraw
        # Limit background removal to near-white pixels, preserve soft shadows.
        mask=Image.new("L",(w,h),0)
        mask_px=mask.load()
        for y in range(h):
            for x in range(w):
                r,g,b,a=rgba[x,y]
                if min(r,g,b)>=244 and max(r,g,b)-min(r,g,b)<13:
                    mask_px[x,y]=0
                elif min(r,g,b)>=219 and max(r,g,b)-min(r,g,b)<20:
                    mask_px[x,y]=int(255*(244-min(r,g,b))/25)
                else:mask_px[x,y]=255
        image.putalpha(mask)
    bbox=image.getchannel("A").getbbox()
    if not bbox:return None
    image=image.crop(bbox)
    if image.width<130 or image.height<130:return None
    return image

pictures=[load_image(key) for key in model_ids]
valid=sum(x is not None for x in pictures)
print("MD PHONE film: real product photos available:",valid)
def base():
    im=Image.new("RGB",(W,H))
    pix=im.load()
    for y in range(H):
        for x in range(W):
            rx=x/W;ry=y/H
            halo=max(0,1-math.sqrt(((rx-.78)/.7)**2+((ry-.47)/.9)**2))
            pix[x,y]=(int(5+17*halo),int(24+51*halo),int(14+30*halo))
    d=ImageDraw.Draw(im,"RGBA")
    for r in range(0,5):
        d.ellipse((520-r*60,-105-r*36,1110+r*45,560+r*45),outline=(122,215,148,max(10,42-r*7)),width=2)
    d.line((58,468,911,468),fill=(118,233,148,57),width=1)
    return im.convert("RGBA")
BG=base()
B=font(61,True);SUB=font(27,False);OVER=font(17,True);SM=font(13)
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
cmd=[ffmpeg,"-y","-loglevel","error","-f","rawvideo","-vcodec","rawvideo","-s",str(W)+"x"+str(H),"-pix_fmt","rgb24","-r",str(FPS),"-i","-","-an","-c:v","libx264","-pix_fmt","yuv420p","-preset","veryfast","-crf","23","-movflags","+faststart",str(out)]
process=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=subprocess.PIPE)
poster=False
for frame in range(FPS*DURATION):
    t=frame/FPS
    current=min(2,int(t/3.34))
    local=t-current*3.34
    opacity=min(1,local/.55,max(0,(3.34-local)/.46))
    canvas=BG.copy()
    d=ImageDraw.Draw(canvas,"RGBA")
    d.text((59,65),"MD PHONE  /  STUDIO FILM",font=OVER,fill=(148,252,178,255))
    first,second,tagline=names[current]
    d.text((54,177),first,font=B,fill=(247,255,249,int(255*opacity)))
    d.text((54,258),second,font=B,fill=(92,245,144,int(255*opacity)))
    d.text((59,371),tagline,font=SUB,fill=(190,222,198,int(255*opacity)))
    d.text((60,492),"14 MODELOS  ·  UMA SELEÇÃO MD PHONE",font=SM,fill=(183,230,196,230))
    photo=pictures[current]
    if photo:
        maxw,maxh=510,475
        sc=min(maxw/photo.width,maxh/photo.height)
        nw,nh=max(1,round(photo.width*sc)),max(1,round(photo.height*sc))
        fg=photo.resize((nw,nh),Image.Resampling.LANCZOS)
        mask=fg.getchannel("A").point(lambda a:round(a*opacity))
        fg.putalpha(mask)
        dx=552+int(11*math.sin((local/3.34)*math.pi))
        dy=(H-nh)//2+int(8*math.sin(local*0.8))
        canvas.alpha_composite(fg,(dx,dy))
    else:
        d=ImageDraw.Draw(canvas,"RGBA")
        d.rounded_rectangle((590,75,832,430),radius=42,fill=(21,58,39,200),outline=(117,196,140,150),width=4)
        d.rounded_rectangle((610,94,814,407),radius=30,fill=(5,29,17,220))
        d.text((624,245),"MD PHONE",font=OVER,fill=(108,248,146,240))
    if not poster:
        canvas.convert("RGB").save(ROOT/"assets"/"md-elevate-film-poster.jpg",quality=90)
        poster=True
    process.stdin.write(canvas.convert("RGB").tobytes())
process.stdin.close()
errors=process.stderr.read().decode(errors="replace")
code=process.wait()
if code!=0 or not out.is_file() or out.stat().st_size<10000:
    raise SystemExit("Film render failed: "+errors[:1500])
print("MD PHONE film generated:",out.stat().st_size,"bytes, 960x540,",DURATION,"seconds; product photos used:",valid)
