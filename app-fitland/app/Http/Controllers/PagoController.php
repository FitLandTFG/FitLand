<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Usuario;
use App\Models\Pago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        ]);

        $compra = Compra::with(['usuario', 'productos'])->findOrFail($request->compra_id);
        $usuario_id = $compra->usuario_id;

        $monto = $compra->productos->sum(function ($producto) {
            return $producto->precio * $producto->pivot->cantidad;
        });

        DB::transaction(function () use ($request, $compra, $usuario_id, $monto) {
            Pago::create([
                'usuario_id'     => $usuario_id,
                'compra_id'      => $compra->id,
                'monto'          => $monto,
                'fecha_pago'     => $request->fecha_pago,
                'metodo_pago'    => $request->metodo_pago,
                'estado'         => $request->estado,
                'transaccion_id' => $request->transaccion_id ?? null,
            ]);

            if ($request->estado === 'completado' && !$compra->stock_descargado) {
                foreach ($compra->productos as $producto) {
                    $cantidad = $producto->pivot->cantidad;

                    $producto->decrement('stock', $cantidad);
                }

                $compra->stock_descargado = true;
                $compra->save();
            }
        });

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
            'compra_id'      => 'required|exists:compras,id',
            'fecha_pago'     => 'required|date',
            'metodo_pago'    => 'required|string|max:50',
            'estado'         => 'required|in:pendiente,completado,fallido',
            'transaccion_id' => 'nullable|string|max:100',
        ]);

        $compra = Compra::with(['usuario', 'productos'])->findOrFail($request->compra_id);
        $usuario_id = $compra->usuario_id;

        $monto = $compra->productos->sum(function ($producto) {
            return $producto->precio * $producto->pivot->cantidad;
        });

        $estadoAnterior = $pago->getOriginal('estado');

        $pago->update([
            'usuario_id'     => $usuario_id,
            'compra_id'      => $compra->id,
            'monto'          => $monto,
            'fecha_pago'     => $request->fecha_pago,
            'metodo_pago'    => $request->metodo_pago,
            'estado'         => $request->estado,
            'transaccion_id' => $request->transaccion_id ?? null,
        ]);

        if (
            $estadoAnterior !== 'completado' && $request->estado === 'completado' && !$compra->stock_descargado
        ) {
            foreach ($compra->productos as $producto) {
                $cantidad = $producto->pivot->cantidad;

                if ($producto->stock < $cantidad) {
                    throw new \Exception("No hay suficiente stock para el producto: {$producto->nombre}");
                }

                $producto->decrement('stock', $cantidad);
            }

            $compra->stock_descargado = true;
            $compra->save();
        }
    }

    public function eliminar(Pago $pago)
    {
        $pago->delete();

        return redirect()->route('admin.pagos.index');
    }
}
