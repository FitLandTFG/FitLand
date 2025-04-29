<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanSuscripcion extends Model
{
    protected $table = 'planes_suscripcion';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'precio',
        'tipo',
        'duracion_dias',
    ];
}
