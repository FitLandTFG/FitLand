<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Inertia\Inertia;

class MiCuentaController extends Controller
{
    public function index()
    {
        $usuario = auth()->user();

        $usuario->foto_perfil_url = $usuario->imagen
            ? asset('storage/' . $usuario->imagen)
            : asset('images/defaults/avatar.jpg');

        return Inertia::render('MiCuenta/index', [
            'usuario' => $usuario,
        ]);
    }

    public function actualizarImagen(Request $request)
    {
        $request->validate(['imagen' => 'required|image|max:2048']);
        $user = $request->user();

        $path = $request->file('imagen')->store('imagenes', 'public');
        $user->imagen = $path;
        $user->save();

        return response()->json([
            'foto_perfil_url' => asset('storage/' . $user->imagen),
            'success' => true,
        ]);
    }
}
