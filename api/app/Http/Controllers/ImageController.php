<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{


    public function download(Request $request) {

        $user = Auth::user();
        if(!$user) {
            return response()->json(['textMessage' => 'no auth'], 401);
        }


        $full_path = Storage::disk('private')->path('1.png');

        return response()->file(
            $full_path
        );
    }
}
