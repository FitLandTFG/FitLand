<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ItemCarrito extends Model
{
    use HasFactory;

    protected $table = 'items_carrito';

    public $timestamps = false; // ← importante porque la tabla no tiene created_at/updated_at

    protected $fillable = [
        'carrito_id',
        'producto_id',
        'cantidad',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }

    public function carrito()
    {
        return $this->belongsTo(Carrito::class, 'carrito_id');
    }
}
