<?php

namespace Database\Seeders;

use App\Models\Image as ImageDb;
use App\Models\ImageVariant;
use App\Models\Size;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $images = ImageDb::all();
        $sizes = Size::all();

        foreach ($images as $image) {
            $originalPath = Storage::disk('private')->path($image->original);
            $imageIntervention = Image::make($originalPath);
            $originalWidth = $imageIntervention->width();
            $originalHeight = $imageIntervention->height();
            $creator = $image->creator;
            $userId = $creator->user_id;


            foreach ($sizes as $size) {
                if($size->name === 'ORIGINAL') {
                    $ext = $image->originalExt;
                    $path = $image->original;
                    $size_in_byte = File::size(storage_path("app/private/$path"));
                } else {
                    $ext = 'jpeg';
                    $width = $originalWidth / $size->division_factor;
                    $height = $originalHeight / $size->division_factor;

                    $timestamp = Carbon::now()->timestamp;
                    $imgName = $image->id.'_'.$timestamp.'_'."$size->name.$ext";
                    $location = "/images/$image->id";
                    Storage::disk('private')->makeDirectory($location);
                    $path =  Storage::disk('private')->path($location . '/' . $imgName);

                    $imageIntervention->resize($width, $height);
                    $imageIntervention->encode($ext, 100);
                    $imageIntervention->save($path);

                    $size_in_byte = File::size($path);

                    $path = $location . '/' . $imgName;
                }


                ImageVariant::create([
                    'image_id' => $image->id,
                    'size_id' => $size->id,
                    'extension' => $ext,
                    'size_in_byte' => $size_in_byte,
                    'width' => $width,
                    'height' => $height,
                    'path' => $path,
                ]);
            }
        }
    }
}
