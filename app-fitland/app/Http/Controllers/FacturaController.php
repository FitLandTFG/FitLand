<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
   use App\Models\Pago;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class FacturaController extends Controller
{


public function generarPDF()
{
    $usuario = Auth::user();

    $pago = Pago::with(['compra.productos', 'suscripcion.plan'])
        ->where('usuario_id', $usuario->id)
        ->where('estado', 'completado')
        ->latest()
        ->first();

    if (!$pago) {
        abort(404, 'No se encontró un pago reciente');
    }

    $pdf = Pdf::loadView('facturas.factura', ['pago' => $pago]);

    return $pdf->stream('factura.pdf');
}

}
