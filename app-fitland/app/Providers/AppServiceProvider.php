<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('auth', function () {
            $user = auth()->user();

            if (!$user) return null;

            return [
                'user' => [
                    ...$user->toArray(),
                    'avatar' => $user->imagen
                        ? asset('storage/' . $user->imagen)
                        : asset('images/defaults/avatar.jpg'),
                ],
            ];
        });
    }
}
