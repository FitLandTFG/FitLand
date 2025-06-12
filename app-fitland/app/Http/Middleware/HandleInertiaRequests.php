<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => Auth::check() ? [
                    'id' => Auth::id(),
                    'nombre_completo' => Auth::user()->nombre_completo,
                    'email' => Auth::user()->email,
                    'avatar' => Auth::user()->imagen,
                    'roles' => Auth::user()->roles,
                    'email_verified_at' => Auth::user()->email_verified_at,
                    'created_at' => Auth::user()->created_at,
                    'updated_at' => Auth::user()->updated_at,
                ] : null,
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'esDiamond' => $request->user()?->suscripcion?->plan_id === 5 || $request->user()?->suscripcion?->plan_id === 6,
        ]);
    }
}
