<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    /**
     * Muestra la lista de usuarios.
     */
    public function index()
    {
        $usuarios = Usuario::orderBy('id', 'desc')->get();

        return Inertia::render('usuarios/index', [
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Muestra el formulario para crear un nuevo usuario.
     */
    public function create()
    {
        return Inertia::render('usuarios/create');
    }

    /**
     * Guarda un nuevo usuario en la base de datos.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_completo' => 'required|string|max:50',
            'documentacion' => 'required|string|max:9',
            'domicilio' => 'required|string|max:150',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:6',
            'imagen' => 'nullable|string',
            'roles' => 'in:user,admin'
        ]);

        Usuario::create([
            ...$request->except('password'),
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('admin.usuarios.index');
    }

    /**
     * Muestra el formulario para editar un usuario existente.
     */
    public function edit(Usuario $usuario)
    {
        return Inertia::render('usuarios/edit', [
            'usuario' => $usuario
        ]);
    }

    /**
     * Actualiza un usuario en la base de datos.
     */
    public function update(Request $request, Usuario $usuario)
    {
        $request->validate([
            'nombre_completo' => 'required|string|max:50',
            'documentacion' => 'required|string|max:9',
            'domicilio' => 'required|string|max:150',
            'email' => 'required|email|unique:usuarios,email,' . $usuario->id,
            'imagen' => 'nullable|string',
            'roles' => 'in:user,admin'
        ]);

        $usuario->update($request->except('password'));

        return redirect()->route('admin.usuarios.index');
    }

    /**
     * Elimina un usuario de la base de datos.
     */
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return redirect()->route('admin.usuarios.index');
    }
}
