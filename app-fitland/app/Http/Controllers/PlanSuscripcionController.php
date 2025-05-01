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
        ]);

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

        $plan->update($request->only(['nombre', 'precio', 'tipo', 'duracion_dias']));

        return redirect()->route('admin.planes_suscripcion.index');
    }

    public function eliminar(PlanSuscripcion $plan)
    {
        $plan->delete();

        return redirect()->route('admin.planes_suscripcion.index');
    }
}
