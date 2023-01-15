<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Creator;
use App\Models\Download;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class CreatorController extends Controller
{
    public function getCreators(Request $request) {
        $creators = Creator::with('user')
            ->paginate(20);
        return response()->json($creators);
    }

    public function showCreator(Request $request, $creatorId) {
        //TODO: count of downloads and views

        //TODO: downloads increment fix

        $creator = Creator::with('user',
            'images.imageVariants')
            ->withCount(['subscribes', 'images'])
            ->withCount(['totalDownloads', 'totalLikes', 'totalViews'])


//            ->join('images', 'creators.id', 'images.creator_id')
//            ->join('downloads', 'images.id', 'downloads.image_id')
//            ->join('views', 'images.id', 'views.image_id')
//            ->withCount( 'images', function ($q) {
////                $q->join('downloads', 'images.id', 'downloads.image_id');
////                $q->withCount('downloads');
//            })
            ->findOrFail($creatorId);

//        $counter = Image::where('creator_id', $creator->id)
//            ->withCount('downloads')
//            ->withCount('views')
//            ->withSum('downloads')
//            ->withSum('views')
//        ;

        $counter = [];

        return response()->json(compact('creator', 'counter'));
    }

    public function getCollections(Request $request) {
        $creator = Auth::user()->creator;
        $collections = Collection::where('creator_id', $creator->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($collections);
    }
}
