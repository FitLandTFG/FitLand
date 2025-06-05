<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clase;
use Inertia\Inertia;
use Carbon\Carbon;

class HorarioClasesController extends Controller
{
    public function index(Request $request)
    {
        $inicioSemana = Carbon::create(2025, 6, 2)->startOfDay();
        $finSemana = $inicioSemana->copy()->addDays(6)->endOfDay();

        $clases = Clase::whereBetween('horario', [$inicioSemana, $finSemana])
            ->orderBy('horario')
            ->get()
            ->map(function ($clase) {
                return [
                    'id' => $clase->id,
                    'nombre' => $clase->nombre,
                    'horario' => $clase->horario->format('Y-m-d H:i:s'),
                    'hora' => $clase->horario->format('H:i'),
                    'dia' => $clase->horario->format('l'),
                    'aforo' => $clase->aforo,
                ];
            });

        return Inertia::render('HorarioClases/index', [
            'clases' => $clases,
            'inicio' => $inicioSemana->toDateString(),
            'fin' => $finSemana->toDateString(),
        ]);
    }
}
