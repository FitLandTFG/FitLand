<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    // Envía un nuevo correo de verificación
    public function store(Request $request): RedirectResponse
    {
        // Si el correo ya está verificado, redirige al dashboard
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('inicio', absolute: false));
        }

        // Envía el enlace de verificación
        $request->user()->sendEmailVerificationNotification();

        // Vuelve atrás con un mensaje de estado
        return back()->with('status', 'verification-link-sent');
    }
}
