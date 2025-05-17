<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $table = 'compras';

    protected $fillable = [
        'usuario_id',
        'fecha_compra',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación con los productos a través de detalle_compras
    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'detalle_compras', 'compra_id', 'producto_id')
                    ->withPivot('cantidad');
    }

    // Relación con detalle_compras (si necesitas acceder directamente al detalle)
  public function detalles()
{
    return $this->hasMany(DetalleCompra::class, 'compra_id')->with('producto');
}


    public function pago()
    {
        return $this->hasOne(Pago::class, 'compra_id');
    }
}
