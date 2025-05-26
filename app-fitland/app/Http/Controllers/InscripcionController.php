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
        $inscripciones = Inscripcion::with(['usuario', 'clase'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/inscripciones/index', [
            'inscripciones' => $inscripciones
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/inscripciones/crear', [
            'usuarios' => Usuario::all(),
            'clases' => Clase::all(),
            'inscripciones' => Inscripcion::select('usuario_id', 'clase_id')->get(),
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'clase_id' => 'required|exists:clases,id',
            'fecha_inscripcion' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $clase = Clase::findOrFail($request->clase_id);

        if ($clase->aforo <= 0) {
            return back()->withErrors(['clase_id' => 'No hay plazas disponibles en esta clase.']);
        }

        // Opcional: evitar inscripciones en fechas pasadas
        if (now()->gt($request->fecha_inscripcion)) {
            return back()->withErrors(['fecha_inscripcion' => 'No puedes inscribirte a una clase en el pasado.']);
        }

        $clase->decrement('aforo');

        // Garantiza formato seguro al guardar
        Inscripcion::create([
            'usuario_id' => $request->usuario_id,
            'clase_id' => $request->clase_id,
            'fecha_inscripcion' => date('Y-m-d H:i:s', strtotime($request->fecha_inscripcion)),
        ]);

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
            'fecha_inscripcion' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $inscripcion->update([
            'usuario_id' => $request->usuario_id,
            'clase_id' => $request->clase_id,
            'fecha_inscripcion' => date('Y-m-d H:i:s', strtotime($request->fecha_inscripcion)),
        ]);

        return redirect()->route('admin.inscripciones.index');
    }

    public function eliminar(Inscripcion $inscripcion)
    {
        $inscripcion->delete();

        return redirect()->route('admin.inscripciones.index');
    }
}
