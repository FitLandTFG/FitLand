<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::orderBy('id', 'desc')->get();

        return Inertia::render('usuarios/index', [
            'usuarios' => $usuarios
        ]);
    }

    public function crear()
    {
        return Inertia::render('usuarios/crear');
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'nombre_completo' => 'required|string|max:50',
            'documentacion' => 'required|string|max:9',
            'domicilio' => 'required|string|max:150',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:6',
            'imagen' => 'nullable|string',
            'roles' => 'in:user,admin',
            'email_verified_at' => 'nullable|date',
        ]);

        $imagen = $request->imagen ?: '/images/defaults/avatar.jpg'; 

        Usuario::create([
            ...$request->except('password'),
            'imagen' => $imagen,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('admin.usuarios.index');
    }

    public function editar(Usuario $usuario)
    {
        return Inertia::render('usuarios/editar', [
            'usuario' => $usuario
        ]);
    }

    public function actualizar(Request $request, Usuario $usuario)
    {
        $request->validate([
            'nombre_completo' => 'required|string|max:50',
            'documentacion' => 'required|string|max:9',
            'domicilio' => 'required|string|max:150',
            'email' => 'required|email|unique:usuarios,email,' . $usuario->id,
            'imagen' => 'nullable|string',
            'roles' => 'in:user,admin',
            'email_verified_at' => 'nullable|date',
        ]);

        $usuario->update($request->except('password'));

        return redirect()->route('admin.usuarios.index');
    }

    public function eliminar(Usuario $usuario)
    {
        $usuario->delete();

        return redirect()->route('admin.usuarios.index');
    }
}
