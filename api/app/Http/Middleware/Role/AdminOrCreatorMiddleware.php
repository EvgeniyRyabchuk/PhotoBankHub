<?php

namespace App\Http\Middleware\Role;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminOrCreatorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $roleAdmin = Role::where('name', 'admin')->first();
        $roleCreator = Role::where('name', 'creator')->first();

        if(!$user) {
           if($user->role_id !== $roleAdmin->id &&
               $user->role_id !== $roleCreator->id)
            abort(401);
        }
        return $next($request);
    }
}
