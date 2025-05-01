<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suscripcion extends Model
{
    protected $table = 'suscripciones';

    protected $fillable = [
        'usuario_id',
        'plan_id',
        'precio',
        'fecha_inicio',
        'fecha_fin',
        'estado',
    ];

    public function usuario()
    {
        return $this->belongsTo(\App\Models\Usuario::class, 'usuario_id');
    }

    public function plan()
    {
        return $this->belongsTo(\App\Models\PlanSuscripcion::class, 'plan_id');
    }
}
