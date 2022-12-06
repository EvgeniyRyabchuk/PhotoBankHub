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

        $image->insert($waterMarkPath, 'bottom-left', 5, 5);
        $image->insert($waterMarkPath, 'bottom-left', 500, 5);
        $image->insert($waterMarkPath, 'bottom-left', 1000, 5);
        $image->insert($waterMarkPath, 'bottom-left', 2000, 5);

        $image->insert($waterMarkPath, 'top-left', 5, 300);
        $image->insert($waterMarkPath, 'top-left', 500, 300);
        $image->insert($waterMarkPath, 'top-left', 1000, 300);
        $image->insert($waterMarkPath, 'top-left', 2000, 300);

        $image->save($distPath);

        return $image->basePath();
    }

    public function download(Request $request) {

        $user = Auth::user();
        if(!$user) {
            return response()->json(['textMessage' => 'no auth'], 401);
        }

        $imageWithWaterMarkPath =
            $this->InsertWaterMark('1.png', 'static/watermark_item.png');

        return response()->download(
            $imageWithWaterMarkPath
        )->deleteFileAfterSend();
    }
}
