<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

//use Image;


class ImageController extends Controller
{

    public static function InsertWaterMark($privateSrcImgPath, $waterMarkPath) : string {
        $full_image_path = Storage::disk('private')->path($privateSrcImgPath);
        $waterMarkPath = Storage::disk('public')->path($waterMarkPath);

        $timestamp = Carbon::now()->timestamp;
        $distPath = Storage::disk('private')->path('temp'. "/newImageWIthWatermark_$timestamp.png") ;

        $image = Image::make($full_image_path);
        /* insert watermark at bottom-left corner with 5px offset */

        $width = $image->width();
        $height = $image->height();
        $shift = 100;

        for ($y = 0; $y < $height; $y = $y + 500) {
            for ($x = 0; $x < $width; $x = $x + 500) {
                $image->insert($waterMarkPath, 'top-left', $x + $shift, $y);
            }
            $shift = $shift * -1;
        }

        $image->save($distPath);

        return $image->basePath();
    }

    public function download(Request $request) {

        $user = Auth::user();
        if(!$user) {
            return response()->json(['textMessage' => 'no auth'], 401);
        }

        $imageWithWaterMarkPath =
            $this->InsertWaterMark('1.png', 'static/wm_small.png');

        return response()->download(
            $imageWithWaterMarkPath
        )->deleteFileAfterSend();
    }
}
