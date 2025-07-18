<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'nombre_completo' => $user->nombre_completo,
                'email' => $user->email,
                'password' => $user->password,
                'documentacion' => $user->documentacion,
                'domicilio' => $user->domicilio,
                'imagen' => $user->imagen_url,
                'roles' => $user->roles,
                'email_verified_at' => $user->email_verified_at,
            ];
        });

        $usuarios = Usuario::orderBy('id', 'desc')->get();

        return Inertia::render('admin/usuarios/index', [
            'usuarios' => $usuarios
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/usuarios/crear');
    }

    public function guardar(Request $request)
    {
    $request->validate(
        [
            'nombre_completo' => [
                'required',
                'string',
                'max:100',
                'regex:/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/u'
            ],
            'documentacion' => [
                'required',
                'string',
                'unique:usuarios,documentacion',
                'regex:/^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/'
            ],
            'domicilio' => 'required|string|max:150',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:8',
            'imagen' => 'nullable|string',
            'roles' => 'in:user,admin',
            'email_verified_at' => 'nullable|date',
        ],
        [
            'nombre_completo.required' => 'El nombre es obligatorio.',
            'nombre_completo.regex' => 'El nombre solo puede contener letras y espacios.',
            'nombre_completo.max' => 'El nombre no puede tener más de 100 caracteres.',

            'documentacion.required' => 'El DNI o NIE es obligatorio.',
            'documentacion.regex' => 'El DNI o NIE no es válido (solo se permiten letras mayúsculas).',
            'documentacion.unique' => 'Este DNI/NIE ya está registrado.',

            'domicilio.required' => 'El domicilio es obligatorio.',
            'domicilio.max' => 'El domicilio no puede tener más de 150 caracteres.',

            'email.required' => 'El email es obligatorio.',
            'email.email' => 'El email debe tener un formato válido.',
            'email.unique' => 'Este email ya está registrado.',

            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
        ]
    );

    $imagen = $request->imagen ?: '/images/defaults/avatar.jpg';

    Usuario::create([
        ...$request->except('password'),
        'imagen' => $imagen,
        'password' => bcrypt($request->password),
    ]);

    return redirect()->route('admin.usuarios.index')
        ->with('success', 'Usuario creado correctamente.');
    }

    public function editar(Usuario $usuario)
    {
        return Inertia::render('admin/usuarios/editar', [
            'usuario' => $usuario
        ]);
    }

    public function actualizar(Request $request, Usuario $usuario)
    {
    $request->validate(
        [
            'nombre_completo' => [
                'required',
                'string',
                'max:100',
                'regex:/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/u'
            ],
            'documentacion' => [
                'required',
                'string',
                'regex:/^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/',
                'unique:usuarios,documentacion,' . $usuario->id
            ],
            'domicilio' => 'required|string|max:150',
            'email' => [
                'required',
                'email',
                'unique:usuarios,email,' . $usuario->id
            ],
            'imagen' => 'nullable|string',
            'roles' => 'in:user,admin',
            'email_verified_at' => 'nullable|date',
        ],
        [
            'nombre_completo.required' => 'El nombre es obligatorio.',
            'nombre_completo.regex' => 'El nombre solo puede contener letras y espacios.',
            'nombre_completo.max' => 'El nombre no puede tener más de 100 caracteres.',

            'documentacion.required' => 'El DNI o NIE es obligatorio.',
            'documentacion.regex' => 'El DNI o NIE no es válido (solo se permiten letras mayúsculas).',
            'documentacion.unique' => 'Este DNI/NIE ya está registrado.',

            'domicilio.required' => 'El domicilio es obligatorio.',
            'domicilio.max' => 'El domicilio no puede tener más de 150 caracteres.',

            'email.required' => 'El email es obligatorio.',
            'email.email' => 'El email debe tener un formato válido.',
            'email.unique' => 'Este email ya está registrado.',
        ]
    );

    $usuario->update($request->except('password'));

    return redirect()->route('admin.usuarios.index')
        ->with('success', 'Usuario actualizado correctamente.');
    }


    public function eliminar(Usuario $usuario)
    {
        try {
            $usuario->delete();

            return redirect()->route('admin.usuarios.index')
                ->with('success', 'Usuario eliminado correctamente.');
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() === '23503') {
                return redirect()->back()
                    ->withErrors(['general' => 'No se puede eliminar este usuario porque está asociado a otros registros como compras, pagos o suscripciones.
                                                Elimine los registros asociados para poder eliminar al usuario.']);
            }

            return redirect()->back()
                ->withErrors(['general' => 'Ocurrió un error al intentar eliminar el usuario.']);
        }
    }
}