<?php

namespace App\Http\Controllers;

use App\Models\Suscripcion;
use App\Models\Usuario;
use App\Models\Pago;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagoController extends Controller
{
    public function index()
    {
        $pagos = Pago::with(['usuario', 'suscripcion'])->orderBy('id', 'desc')->get();

        return Inertia::render('admin/pagos/index', [
            'pagos' => $pagos
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/pagos/crear', [
            'usuarios' => Usuario::all(),
            'suscripciones' => Suscripcion::all(),
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'suscripcion_id' => 'required|exists:suscripciones,id',
            'cantidad' => 'required|numeric|min:0',
            'fecha_pago' => 'required|date',
            'metodo_pago' => 'required|string|max:50',
        ]);

        Pago::create($request->all());

        return redirect()->route('admin.pagos.index');
    }

    public function editar(Pago $pago)
    {
        return Inertia::render('admin/pagos/editar', [
            'pago' => $pago,
            'usuarios' => Usuario::all(),
            'suscripciones' => Suscripcion::all(),
        ]);
    }

    public function actualizar(Request $request, Pago $pago)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'suscripcion_id' => 'required|exists:suscripciones,id',
            'cantidad' => 'required|numeric|min:0',
            'fecha_pago' => 'required|date',
            'metodo_pago' => 'required|string|max:50',
        ]);

        $pago->update($request->all());

        return redirect()->route('admin.pagos.index');
    }

    public function eliminar(Pago $pago)
    {
        $pago->delete();

        return redirect()->route('admin.pagos.index');
    }
}
