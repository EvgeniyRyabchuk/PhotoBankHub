
#!/bin/bash

## copy files in png as source format 

pwd 

cd C:\Users\jekar\Desktop\Projects\PhotoBankHub\docs\Магистерская\Дослідження\library

# cp image.png image_avif_0.png
# cp image.png image_jxl_0.png
cp IMG_20210912_131119.jpg ./frames/image_webp_0.png
# cp image.png image_jpeg_0.png

## generate 1000 times 

for f in $(seq 1 10)
do

## AVIF 
# ./libwebp/bin/avifenc -c aom -y 420 --min 0 --max 63 -s 5 -j 4 -a end-usage=q -a tune=ssim -a cq-level=$((f % 2 ? 11 : 10)) image_avif_$((f-1)).png image_avif_$f.avif
# ./avifdec image_avif_$f.avif image_avif_$f.png
## JPEG XL 
# ../tools/cjxl image_jxl_$((f-1)).png image_jxl_$f.jxl -q $((f % 2 ? 88 : 90))
# ../tools/djxl image_jxl_$f.jxl image_jxl_$f.png
## JPEG 
# convert image_jpeg_$((f-1)).png -quality $((f % 2 ? 83 : 85 )) image_jpeg_$f.jpg
# convert image_jpeg_$f.jpg image_jpeg_$f.png 
## WebP 
cwebp ./frames/image_webp_$((f-1)).png -q $((f % 2 ? 89 : 92)) -m 6 -o ./frames/image_webp_$f.webp
dwebp ./frames/image_webp_$f.webp -o ./frames/image_webp_$f.png 

## create one frame for video 

# convert -crop 480x880+0+0 -gravity center image_jpeg_$f.png a.png
magick convert -crop 480x880+0+0 -gravity center "C:\Users\jekar\Desktop\Projects\PhotoBankHub\docs\Магистерская\Дослідження\library\frames\image_webp_$f.png" b.png
# convert -crop 480x880+0+0 -gravity center image_jxl_$f.png c.png
# convert -crop 480x880+0+0 -gravity center image_avif_$f.png d.png
read my_var
# convert -size 480x100 -gravity center label:"JPEG\n$(stat -c "%s" image_jpeg_$f.jpg) bytes" aa.png
convert -size 480x100 -gravity center label:"WebP\n$(stat -c "%s" image_webp_$f.webp) bytes" ab.png
# convert -size 480x100 -gravity center label:"JXL\n$(stat -c "%s" image_jxl_$f.jxl) bytes" ac.png
# convert -size 480x100 -gravity center label:"AVIF\n$(stat -c "%s" image_avif_$f.avif) bytes" ad.png

convert -size 1920x100 -gravity center label:"$f generations" caption.png
convert +append a.png b.png c.png d.png e.png
convert +append aa.png ab.png ac.png ad.png ae.png
convert -append ae.png caption.png caption.png
convert -append e.png caption.png frame-$f.png



done




ffmpeg -i frame-%d.png -pix_fmt yuv420p -crf 2 GL.mp4


