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
            'compras' => Compra::with([
                'usuario',
                'productos' => function ($query) {
                    $query->withPivot('cantidad');
                }
            ])->get(),
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'compra_id'    => 'required|exists:compras,id',
            'fecha_pago'   => 'required|date',
            'metodo_pago'  => 'required|string|max:50',
            'estado'       => 'required|in:pendiente,completado,fallido',
            'transaccion_id' => 'nullable|string|max:100',
            // Si usas monto manual, activa esta línea:
            // 'monto'        => 'required|numeric|min:0',
        ]);

        $compra = Compra::with(['usuario', 'productos'])->findOrFail($request->compra_id);
        $usuario_id = $compra->usuario_id;

        $monto = $compra->productos->sum(function ($producto) {
            return $producto->precio * $producto->pivot->cantidad;
        });

        Pago::create([
            'usuario_id'     => $usuario_id,
            'compra_id'      => $compra->id,
            'monto'          => $monto,
            'fecha_pago'     => $request->fecha_pago,
            'metodo_pago'    => $request->metodo_pago,
            'estado'         => $request->estado,
            'transaccion_id' => $request->transaccion_id ?? null,
        ]);

        return redirect()->route('admin.pagos.index');
    }

    public function editar(Pago $pago)
{
    $pago->load([
        'compra.usuario',
        'compra.productos' => function ($query) {
            $query->withPivot('cantidad');
        }
    ]);

    $compras = Compra::with([
        'usuario',
        'productos' => function ($query) {
            $query->withPivot('cantidad');
        }
    ])->get();

    return Inertia::render('admin/pagos/editar', [
        'pago'    => $pago,
        'compras' => $compras,
    ]);
}


    public function actualizar(Request $request, Pago $pago)
    {
        $request->validate([
            'compra_id'    => 'required|exists:compras,id',
            'fecha_pago'   => 'required|date',
            'metodo_pago'  => 'required|string|max:50',
            'estado'       => 'required|in:pendiente,completado,fallido',
            'transaccion_id' => 'nullable|string|max:100',
            // 'monto' => 'required|numeric|min:0', // Solo si lo introduces a mano
        ]);

        $compra = Compra::with(['usuario', 'productos'])->findOrFail($request->compra_id);
        $usuario_id = $compra->usuario_id;

        $monto = $compra->productos->sum(function ($producto) {
            return $producto->precio * $producto->pivot->cantidad;
        });

        $pago->update([
            'usuario_id'     => $usuario_id,
            'compra_id'      => $compra->id,
            'monto'          => $monto, // o $request->monto
            'fecha_pago'     => $request->fecha_pago,
            'metodo_pago'    => $request->metodo_pago,
            'estado'         => $request->estado,
            'transaccion_id' => $request->transaccion_id ?? null,
        ]);

        return redirect()->route('admin.pagos.index');
    }

    public function eliminar(Pago $pago)
    {
        $pago->delete();

        return redirect()->route('admin.pagos.index');
    }
}
