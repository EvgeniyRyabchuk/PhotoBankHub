<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class CreatorController extends Controller
{
    public function getCollections(Request $request) {
        $creator = Auth::user()->creator;
        $collections = Collection::where('creator_id', $creator->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($collections);
    }
}
