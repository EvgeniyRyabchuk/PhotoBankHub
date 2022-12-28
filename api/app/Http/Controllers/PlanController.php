<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class PlanController extends Controller
{

    public function __construct()
    {
//        $this->authorizeResource(Plan::class, 'plan');
    }

    public function index(Request $request) {
//        dd(123);
//        $user = Auth::guard('api')->user();
//        $plan = Plan::find(1);

//        $this->authorize('view', [$plan]);
//        dd($exist);
//        if (!Gate::forUser($user)->allows('user_select', $plan)) {
//            abort(403);
//        }

        // если может хоть что-то из этого
//        if (Gate::forUser($user)->any(['user_select', 'user_create'])) {
//            // The user can update or delete the post...
//            dd('can any');
//        }

        // если не может ничего из этого
//        if (Gate::forUser($user)->none(['user_select', 'user_create'])) {
//            // The user can't update or delete the post...
//            dd('can none');
//        }

        // with policy

//        if ($request->user()->cannot('update', $post)) {
//            abort(403);
//        }

        $plans = Plan::with('licenses', 'planFeatures')->get();
        return response()->json($plans);
    }


    public function show() {

    }

    public function update() {

    }

    public function delete() {

    }

}
