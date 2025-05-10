<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClaseController extends Controller
{
    public function index()
    {
        $clases = Clase::orderBy('id', 'desc')->get();

        return Inertia::render('admin/clases/index', [
            'clases' => $clases
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/clases/crear');
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'horario' => 'required|date',
            'aforo' => 'required|integer|min:1',
        ]);

        Clase::create($request->all());

        return redirect()->route('admin.clases.index');
    }

    public function editar(Clase $clase)
    {
        return Inertia::render('admin/clases/editar', [
            'clase' => $clase
        ]);
    }

    public function actualizar(Request $request, Clase $clase)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'horario' => 'required|date',
            'aforo' => 'required|integer|min:1',
        ]);

        $clase->update($request->all());

        return redirect()->route('admin.clases.index');
    }

    public function eliminar(Clase $clase)
    {
        $clase->delete();

        return redirect()->route('admin.clases.index');
    }
}
