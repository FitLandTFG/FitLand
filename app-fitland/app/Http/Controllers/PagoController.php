<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Usuario;
use App\Models\Pago;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagoController extends Controller
{
    public function index()
    {
        $pagos = Pago::with(['usuario', 'compra'])->orderBy('id', 'desc')->get();

        return Inertia::render('admin/pagos/index', [
            'pagos' => $pagos
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/pagos/crear', [
            'usuarios' => Usuario::all(),
            'compras' => Compra::all(),
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'usuario_id'   => 'required|exists:usuarios,id',
            'compra_id'    => 'required|exists:compras,id',
            'monto'        => 'required|numeric|min:0',
            'fecha_pago'   => 'required|date',
            'metodo_pago'  => 'required|string|max:50',
        ]);

        Pago::create([
            'usuario_id'     => $request->usuario_id,
            'compra_id'      => $request->compra_id,
            'monto'          => $request->monto,
            'fecha_pago'     => $request->fecha_pago,
            'metodo_pago'    => $request->metodo_pago,
            'estado'         => 'pendiente', // o 'pagado' si ya está confirmado
            'transaccion_id' => $request->transaccion_id ?? null,
        ]);

        return redirect()->route('admin.pagos.index');
    }

    public function editar(Pago $pago)
    {
        return Inertia::render('admin/pagos/editar', [
            'pago'     => $pago,
            'usuarios' => Usuario::all(),
            'compras'  => Compra::all(),
        ]);
    }

    public function actualizar(Request $request, Pago $pago)
    {
        $request->validate([
            'usuario_id'   => 'required|exists:usuarios,id',
            'compra_id'    => 'required|exists:compras,id',
            'monto'        => 'required|numeric|min:0',
            'fecha_pago'   => 'required|date',
            'metodo_pago'  => 'required|string|max:50',
        ]);

        $pago->update([
            'usuario_id'     => $request->usuario_id,
            'compra_id'      => $request->compra_id,
            'monto'          => $request->monto,
            'fecha_pago'     => $request->fecha_pago,
            'metodo_pago'    => $request->metodo_pago,
            'estado'         => $request->estado ?? $pago->estado,
            'transaccion_id' => $request->transaccion_id ?? $pago->transaccion_id,
        ]);

        return redirect()->route('admin.pagos.index');
    }

    public function eliminar(Pago $pago)
    {
        $pago->delete();

        return redirect()->route('admin.pagos.index');
    }
}
