<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use App\Models\Usuario;
use App\Models\Clase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InscripcionController extends Controller
{
    public function index()
    {
        $inscripciones = Inscripcion::with(['usuario', 'clase'])->orderBy('id', 'desc')->get();

        return Inertia::render('admin/inscripciones/index', [
            'inscripciones' => $inscripciones
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/inscripciones/crear', [
            'usuarios' => Usuario::all(),
            'clases' => Clase::all(),
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'clase_id' => 'required|exists:clases,id',
            'fecha_inscripcion' => 'required|date',
        ]);

        $clase = Clase::findOrFail($request->clase_id);

        if ($clase->aforo <= 0) {
            return back()->withErrors(['clase_id' => 'No hay plazas disponibles en esta clase.']);
        }

        $clase->decrement('aforo');

        Inscripcion::create($request->all());

        return redirect()->route('admin.inscripciones.index');
    }

    public function editar(Inscripcion $inscripcion)
    {
        return Inertia::render('admin/inscripciones/editar', [
            'inscripcion' => $inscripcion,
            'usuarios' => Usuario::all(),
            'clases' => Clase::all(),
        ]);
    }

    public function actualizar(Request $request, Inscripcion $inscripcion)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'clase_id' => 'required|exists:clases,id',
            'fecha_inscripcion' => 'required|date',
        ]);

        $inscripcion->update($request->all());

        return redirect()->route('admin.inscripciones.index');
    }

    public function eliminar(Inscripcion $inscripcion)
    {
        $inscripcion->delete();

        return redirect()->route('admin.inscripciones.index');
    }
}
