<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    // Muestra la vista para restablecer la contraseña
    public function create(Request $request): Response
    {
        return Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    // Procesa el formulario de nueva contraseña
    public function store(Request $request): RedirectResponse
    {
        // Valida los campos del formulario
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Intenta actualizar la contraseña del usuario
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user)); // Lanza evento de contraseña restablecida
            }
        );

        // Si tuvo éxito, redirige al login con mensaje
        if ($status == Password::PasswordReset) {
            return to_route('login')->with('status', __($status));
        }

        // Si falló, lanza error de validación
        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }
}
