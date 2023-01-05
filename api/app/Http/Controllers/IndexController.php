<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function getLevels() {
        $levels = [1, 2, 3];
        return response()->json($levels);
    }
}
