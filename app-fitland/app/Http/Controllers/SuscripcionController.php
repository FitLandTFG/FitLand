<?php

namespace App\Http\Controllers;

use App\Models\Suscripcion;
use App\Models\Usuario;
use App\Models\PlanSuscripcion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuscripcionController extends Controller
{
    public function index()
    {
        $suscripciones = Suscripcion::with(['usuario', 'plan'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/suscripciones/index', [
            'suscripciones' => $suscripciones
        ]);
    }

    public function crear()
{
    return Inertia::render('admin/suscripciones/crear', [
        'usuarios' => \App\Models\Usuario::orderBy('nombre_completo')->get(['id', 'nombre_completo']),
        'planes' => \App\Models\PlanSuscripcion::orderBy('nombre')->get(['id', 'nombre', 'precio', 'duracion_dias']), // ← aquí
    ]);
}

    public function guardar(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'plan_id' => 'required|exists:planes_suscripcion,id',
            'precio' => 'required|numeric|min:0',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'estado' => 'required|in:activa,expirada,cancelada',
        ]);

        Suscripcion::create($request->all());

        return redirect()->route('admin.suscripciones.index');
    }

    public function editar(Suscripcion $suscripcion)
    {
        return Inertia::render('admin/suscripciones/editar', [
            'suscripcion' => $suscripcion,
            'usuarios' => Usuario::orderBy('nombre_completo')->get(['id', 'nombre_completo']),
            'planes' => PlanSuscripcion::orderBy('nombre')->get(['id', 'nombre']),
        ]);
    }

    public function actualizar(Request $request, Suscripcion $suscripcion)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'plan_id' => 'required|exists:planes_suscripcion,id',
            'precio' => 'required|numeric|min:0',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'estado' => 'required|in:activa,expirada,cancelada',
        ]);

        $suscripcion->update($request->all());

        return redirect()->route('admin.suscripciones.index');
    }

    public function eliminar(Suscripcion $suscripcion)
    {
        $suscripcion->delete();

        return redirect()->route('admin.suscripciones.index');
    }
}
