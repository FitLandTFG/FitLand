<?php

namespace App\Http\Controllers;

use App\Models\PlanSuscripcion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanSuscripcionController extends Controller
{
    public function index()
    {
        $planes = PlanSuscripcion::orderBy('id', 'desc')->get();

        return Inertia::render('admin/planes_suscripcion/index', [
            'planes' => $planes
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/planes_suscripcion/crear');
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:50',
            'precio' => 'required|numeric|min:0',
            'tipo' => 'required|in:Prueba,Silver,Gold,Diamond',
            'duracion_dias' => 'required|integer|min:1',
        ],
        [
            'nombre.max' => 'El nombre no puede tener más de 50 caracteres.',
        ]);
        $existe = PlanSuscripcion::whereRaw('LOWER(nombre) = ?', [strtolower($request->nombre)])->exists();

        if ($existe) {
            return back()->withErrors(['nombre' => 'Ya existe un plan con ese nombre.'])->withInput();
        }

        PlanSuscripcion::create($request->only(['nombre', 'precio', 'tipo', 'duracion_dias']));

        return redirect()->route('admin.planes_suscripcion.index');
    }

    public function editar(PlanSuscripcion $plan)
    {
        return Inertia::render('admin/planes_suscripcion/editar', [
            'plan' => $plan
        ]);
    }

    public function actualizar(Request $request, PlanSuscripcion $plan)
    {
        $request->validate([
            'nombre' => 'required|string|max:50',
            'precio' => 'required|numeric|min:0',
            'tipo' => 'required|in:Prueba,Silver,Gold,Diamond',
            'duracion_dias' => 'required|integer|min:1',
        ]);

    $existe = PlanSuscripcion::whereRaw('LOWER(nombre) = ?', [strtolower($request->nombre)])
    ->where('id', '!=', $plan->id)
    ->exists();

    if ($existe) {
        return back()->withErrors(['nombre' => 'Ya existe otro plan con ese nombre.'])->withInput();
    }

        $plan->update($request->only(['nombre', 'precio', 'tipo', 'duracion_dias']));

        return redirect()->route('admin.planes_suscripcion.index');
    }

   public function eliminar(PlanSuscripcion $plan)
    {
        try {
            $plan->delete();

            return redirect()->route('admin.planes_suscripcion.index')
                ->with('success', 'Plan eliminado correctamente.');
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() === '23503') {
                return redirect()->back()
                    ->withErrors(['general' => 'No se puede eliminar este plan porque está asociado a una o más usuarios suscritos.
                                                Elimine las suscripciones asociadas para poder eliminar el plan.']);
            }

            return redirect()->back()
                ->withErrors(['general' => 'Ocurrió un error al intentar eliminar el plan.']);
        }
    }

    public function publicIndex()
    {
        $planes = PlanSuscripcion::orderBy('precio')->get();

        return Inertia::render('Suscripciones/index', [
            'planes' => $planes
        ]);
    }
}
