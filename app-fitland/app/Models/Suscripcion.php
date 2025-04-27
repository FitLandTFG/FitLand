<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suscripcion extends Model
{
    protected $table = 'suscripciones';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'precio',
        'duracion_meses',
    ];
}