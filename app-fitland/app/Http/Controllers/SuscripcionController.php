<?php

namespace App\Http\Controllers;

use App\Models\Suscripcion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuscripcionController extends Controller
{
    public function index()
    {
        $suscripciones = Suscripcion::orderBy('id', 'desc')->get();

        return Inertia::render('admin/suscripciones/index', [
            'suscripciones' => $suscripciones
        ]);
    }

    // Aquí luego puedes añadir métodos como crear, guardar, editar, actualizar, eliminar...
}