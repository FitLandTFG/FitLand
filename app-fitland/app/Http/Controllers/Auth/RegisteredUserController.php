<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nombre_completo' => 'required|string|max:50',
            'documentacion' => 'required|string|min:9|max:9',
            'domicilio' => 'required|string|max:150',
            'email' => 'required|string|email|max:100|unique:usuarios',
            'password' => 'required|string|confirmed|min:8',
        ]);

        $usuario = Usuario::create([
            'nombre_completo' => $request->nombre_completo,
            'documentacion' => $request->documentacion,
            'domicilio' => $request->domicilio,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'imagen' => '/images/defaults/avatar.jpg',
            'roles' => 'user',
        ]);

        event(new Registered($usuario));

        Auth::login($usuario);

        return to_route('dashboard');
    }
}
