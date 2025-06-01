<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Carrito extends Model
{
    use HasFactory;

    protected $table = 'carritos';

    public function items()
{
    return $this->hasMany(\App\Models\ItemCarrito::class, 'carrito_id');
}

}
