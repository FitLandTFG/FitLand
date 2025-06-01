<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ItemCarrito extends Model
{
    use HasFactory;

    protected $table = 'items_carrito';

    public function producto()
{
    return $this->belongsTo(\App\Models\Producto::class, 'producto_id');
}

}
