<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;

class ClaseController extends Controller
{
    public function index()
    {
        $clases = Clase::orderBy('id', 'desc')->get();

        return Inertia::render('admin/clases/index', [
            'clases' => $clases,
            'flash' => ['error' => session('error')],
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
        try {
            $clase->delete();
            return redirect()->route('admin.clases.index');
        } catch (QueryException $e) {
            if ($e->getCode() === '23503') {
                return redirect()->back()->with('error', 'No se puede eliminar la clase porque tiene inscripciones asociadas.
                                                          Elimine las inscripciones asociadas para poder eliminar la clase.');
            }
    
            return redirect()->back()->with('error', 'Ocurrió un error al eliminar la clase.');
        }
    }
}
