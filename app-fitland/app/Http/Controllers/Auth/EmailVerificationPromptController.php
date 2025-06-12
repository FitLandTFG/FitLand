<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    public function __invoke(Request $request): Response|RedirectResponse
    {
        // Si el usuario ya verificó su correo, lo redirige al dashboard
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('inicio', absolute: false));
        }

        // Si aún no se ha enviado en esta sesión, lo enviamos
        if (! $request->session()->has('verification_sent')) {
            $request->user()->sendEmailVerificationNotification();
            $request->session()->put('verification_sent', true);
        }

        // Muestra la página de verificación con mensaje
        return Inertia::render('auth/verify-email', [
            'status' => 'verification-link-sent',
        ]);
    }
}
