<?php

namespace App\Providers;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        Gate::define('plan_select', function (User $user) {
            return in_array($user->role->name, ['client', 'creator', 'admin']);
        });

        Gate::define('plan_create', function (User $user) {
            return in_array($user->role->name, ['client', 'creator', 'admin']);
        });

        Gate::define('plan_update', function (User $user) {
            return in_array($user->role->name, ['client', 'creator', 'admin']);
        });

        Gate::define('plan_delete', function (User $user) {
            return in_array($user->role->name, ['client', 'creator', 'admin']);
        });

    }
}
