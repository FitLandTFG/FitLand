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
        $yaInscrito = Inscripcion::where('usuario_id', $request->usuario_id)
            ->where('clase_id', $request->clase_id)
            ->exists();

        if ($yaInscrito) {
            return back()->withErrors(['general' => 'Este usuario ya está inscrito en esta clase.']);
        }

        $suscripcion = \App\Models\Suscripcion::where('usuario_id', $request->usuario_id)
        ->where('estado', 'activa')
        ->whereDate('fecha_inicio', '<=', now())
        ->whereDate('fecha_fin', '>=', now())
        ->with('plan')
        ->first();

        if (!$suscripcion || !in_array($suscripcion->plan->tipo, ['Gold', 'Diamond'])) {
            return back()->withErrors([
                'general' => 'Necesitas una suscripción Gold o Diamond para inscribirte en las clases.',
            ]);
        }

        $clase = Clase::withCount('inscripciones')->findOrFail($request->clase_id);

        if ($clase->inscripciones_count >= $clase->aforo) {
            return back()->withErrors(['general' => 'No puedes inscribirte a esta clase porque ya no hay plazas disponibles.']);
        }

        if (now()->gt($request->fecha_inscripcion)) {
            return back()->withErrors(['fecha_inscripcion' => 'No puedes inscribirte a una clase en el pasado.']);
        }

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

        $yaInscrito = \App\Models\Inscripcion::where('usuario_id', $request->usuario_id)
            ->where('clase_id', $request->clase_id)
            ->where('id', '!=', $inscripcion->id)
            ->exists();

        if ($yaInscrito) {
            return back()->withErrors([
                'general' => 'Este usuario ya está inscrito en esta clase.',
            ]);
        }

        $inscripcion->update([
            'usuario_id' => $request->usuario_id,
            'clase_id' => $request->clase_id,
            'fecha_inscripcion' => date('Y-m-d H:i:s', strtotime($request->fecha_inscripcion)),
        ]);

        return redirect()->route('admin.inscripciones.index')
            ->with('success', 'Inscripción actualizada correctamente.');
    }


    public function eliminar(Inscripcion $inscripcion)
    {
        $inscripcion->delete();

        return redirect()->route('admin.inscripciones.index');
    }

    public function formularioPublico()
    {
        $usuarioId = auth()->id();

        $clases = Clase::all()->map(function ($clase) {
            return [
                'id' => $clase->id,
                'nombre' => $clase->nombre,
                'fecha' => $clase->horario,
            ];
        });

       $inscripciones = Inscripcion::with('clase:id,nombre,horario')
        ->where('usuario_id', $usuarioId)
        ->get()
        ->map(function ($i) {
            return [
                'id' => $i->id,
                'clase_id' => $i->clase_id,
                'fecha' => $i->clase->horario,
                'nombre' => $i->clase->nombre,

            ];
        });


        return Inertia::render('Inscribirse/index', [
            'clases' => $clases,
            'inscripciones' => $inscripciones,
        ]);
    }


    public function guardarDesdeFrontend(Request $request)
    {
        $request->validate([
            'clase_id' => 'required|exists:clases,id',
        ]);

        $user = auth()->user();

        $yaInscrito = Inscripcion::where('usuario_id', $user->id)
            ->where('clase_id', $request->clase_id)
            ->exists();

        if ($yaInscrito) {
            return back()->withErrors(['general' => 'Ya estás inscrito en esta clase.']);

        }

        $suscripcion = \App\Models\Suscripcion::where('usuario_id', $user->id)
        ->where('estado', 'activa')
        ->whereDate('fecha_inicio', '<=', now())
        ->whereDate('fecha_fin', '>=', now())
        ->with('plan')
        ->first();

        if (!$suscripcion || !in_array($suscripcion->plan->tipo, ['Gold', 'Diamond'])) {
            return back()->withErrors([
            'general' => 'Necesitas una suscripción Gold o Diamond para inscribirte en las clases.',
            ]);
        }


        $clase = \App\Models\Clase::findOrFail($request->clase_id);

        if (now()->gt($clase->horario)) {
            return back()->withErrors(['clase_id' => 'Esta clase ya ha ocurrido.']);
        }

        $inscritos = Inscripcion::where('clase_id', $clase->id)->count();
        if ($inscritos >= $clase->aforo) {
            return back()->withErrors(['clase_id' => 'No puedes inscribirte a esta clase porque ya no hay plazas disponibles.']);
        }

        Inscripcion::create([
            'usuario_id' => $user->id,
            'clase_id' => $request->clase_id,
            'fecha_inscripcion' => $clase->horario,
        ]);

        return redirect()->route('inscribirse.formulario')->with('success', 'Inscripción realizada con éxito.');
    }

    public function eliminarDesdeFrontend($id)
    {
        $user = auth()->user();

        $inscripcion = Inscripcion::where('id', $id)
            ->where('usuario_id', $user->id)
            ->firstOrFail();

        $clase = $inscripcion->clase;
        $clase->increment('aforo');

        $inscripcion->delete();

        return redirect()->route('inscribirse.formulario')->with('success', 'Te has dado de baja de la clase.');
    }

    public function destroy($id)
    {
        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->delete();

        return back()->with('success', 'Inscripción cancelada con éxito.');
    }


}
