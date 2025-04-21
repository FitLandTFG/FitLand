<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    // Marca el email del usuario como verificado si aún no lo está
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        // Si ya está verificado, redirige al dashboard
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }

        // Verifica el email y lanza el evento
        if ($request->user()->markEmailAsVerified()) {
            $user = $request->user();
            event(new Verified($user));
        }

        // Redirige al dashboard indicando que fue verificado
        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }
}
