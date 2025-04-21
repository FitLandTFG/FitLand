<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmablePasswordController extends Controller
{
    // Muestra la vista para confirmar la contraseña
    public function show(): Response
    {
        return Inertia::render('auth/confirm-password');
    }

    // Verifica que la contraseña ingresada sea correcta
    public function store(Request $request): RedirectResponse
    {
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        // Guarda en la sesión el momento de la confirmación
        $request->session()->put('auth.password_confirmed_at', time());

        // Redirige al dashboard o a la ruta previa
        return redirect()->intended(route('dashboard', absolute: false));
    }
}
