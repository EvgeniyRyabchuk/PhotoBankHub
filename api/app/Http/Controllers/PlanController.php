<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index(Request $request) {
        $plans = Plan::with('licenses', 'planFeatures')->get();
        return response()->json($plans);
    }


}
