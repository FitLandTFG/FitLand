<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    // Muestra la vista de inicio de sesión
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    // Procesa el login del usuario
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate(); // Valida y autentica
        $request->session()->regenerate(); // Regenera la sesión
        return redirect()->intended(route('dashboard', absolute: false));
    }

    // Cierra sesión del usuario
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout(); // Cierra sesión
        $request->session()->invalidate(); // Elimina datos de sesión
        $request->session()->regenerateToken(); // Nuevo token CSRF
        return redirect('/');
    }
}
