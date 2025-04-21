<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    // Muestra la vista para solicitar el enlace de recuperación
    public function create(Request $request): Response
    {
        return Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    // Procesa el envío del enlace de recuperación
    public function store(Request $request): RedirectResponse
    {
        // Valida que el email esté presente y bien formado
        $request->validate([
            'email' => 'required|email',
        ]);

        // Intenta enviar el enlace de restablecimiento al correo
        Password::sendResetLink(
            $request->only('email')
        );

        // Redirige con mensaje (aunque el email no exista, por seguridad)
        return back()->with('status', __('Se enviará un enlace de restablecimiento si la cuenta existe.'));
    }
}
