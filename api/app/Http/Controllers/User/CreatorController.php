<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Creator;
use App\Models\Download;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CreatorController extends Controller
{
    public function getCreators(Request $request) {
        $search = $request->input('search');
        $query = Creator::with('user')
            ->withCount(['subscribes', 'images'])
            ->withCount(['totalDownloads', 'totalLikes', 'totalViews']);

        if($search && $search !== '') {
            $query->join('users', 'creators.user_id', 'users.id');
            $query->where('users.full_name', 'LIKE', "%$search%");
        }

         $creators = $query->paginate(20);
        return response()->json($creators);
    }

    public function showCreator(Request $request, $creatorId) {
        $creator = Creator::with('user.role')
            ->withCount(['subscribes', 'images'])
            ->withCount(['totalDownloads', 'totalLikes', 'totalViews'])
            ->findOrFail($creatorId);

        $collections = $creator->collections->map(function ($item) {
           $item->images = $item->images->take(1);
           return $item;
        });
//        $images = Image::where('creator_id', $creator->id)
//            ->paginate(15);

        return response()->json(compact('creator', 'collections'));
    }

    public function getCollections(Request $request) {
        $creator = Auth::user()->creator;
        $collections = Collection::where('creator_id', $creator->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($collections);
    }
}
