<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    protected $table = 'clases';

    protected $fillable = [
        'nombre',
        'horario',
        'aforo',
    ];

    protected $casts = [
        'horario' => 'datetime',
    ];

    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class);
    }
    public function detalles()
{
    return $this->hasMany(DetalleCompra::class, 'compra_id');
}

}
