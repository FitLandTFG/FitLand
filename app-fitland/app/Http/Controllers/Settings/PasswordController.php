<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    // Muestra la vista de configuración de contraseña
    public function edit(): Response
    {
        return Inertia::render('settings/password');
    }

    // Actualiza la contraseña del usuario
    public function update(Request $request): RedirectResponse
    {
        // Valida que la contraseña actual sea correcta y que la nueva esté confirmada
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        // Actualiza la contraseña del usuario en la base de datos
        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        // Vuelve a la misma página
        return back();
    }
}
