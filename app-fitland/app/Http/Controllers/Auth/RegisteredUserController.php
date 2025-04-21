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
    // Muestra la página de registro
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    // Procesa el formulario de registro
    public function store(Request $request): RedirectResponse
    {
        // Validación de los datos del formulario
        $request->validate([
            'nombre_completo' => ['required', 'string', 'max:50', 'regex:/^[\pL\s\-]+$/u'],
            'documentacion' => ['required', 'string', 'regex:/^(\d{8}[A-Z]|[XYZ]\d{7}[A-Z])$/', 'max:9', 'min:9', 'unique:usuarios'],
            'domicilio' => 'required|string|max:150',
            'email' => 'required|string|email|max:100|unique:usuarios',
            'password' => 'required|string|confirmed|min:8',
        ], [
            'nombre_completo.required' => 'El nombre completo es obligatorio.',
            'nombre_completo.regex' => 'El nombre completo solo puede contener letras y espacios.',
            'documentacion.required' => 'La documentación es obligatoria.',
            'documentacion.unique' => 'Esta documentación ya está registrada.',
            'documentacion.min' => 'La documentación debe tener 9 caracteres.',
            'documentacion.max' => 'La documentación debe tener exactamente 9 caracteres.',
            'documentacion.regex' => 'La documentación debe ser un DNI o NIE válido, y la letra debe estar en mayúscula.',
            'domicilio.required' => 'El domicilio es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo electrónico no es válido.',
            'email.unique' => 'Este correo ya está registrado.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
        ]);

        // Crear el nuevo usuario en la base de datos
        $usuario = Usuario::create([
            'nombre_completo' => $request->nombre_completo,
            'documentacion' => $request->documentacion,
            'domicilio' => $request->domicilio,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'imagen' => '/images/defaults/avatar.jpg',
            'roles' => 'user',
        ]);

        // Lanzar el evento de usuario registrado (esto envía el correo de verificación)
        event(new Registered($usuario));


        // Loguear al usuario automáticamente
        Auth::login($usuario);


        // Redirigir a la pantalla que le pide al usuario verificar su correo
        return redirect()->route('verification.notice');
    }
}
