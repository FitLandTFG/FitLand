<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Carrito extends Model
{

    use HasFactory;

    protected $table = 'carritos';

    protected $fillable = [
        'usuario_id',
    ];
    public $timestamps = false;

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function items()
    {
        return $this->hasMany(ItemCarrito::class, 'carrito_id')->with('producto');
    }
}
