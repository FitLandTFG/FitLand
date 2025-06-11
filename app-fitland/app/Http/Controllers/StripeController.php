<?php
// app/Http/Controllers/StripeController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeController extends Controller
{
    public function crearSesionCheckout(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $lineItems = collect($request->input('items'))->map(function ($item) {
            return [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item['nombre'],
                    ],
                    'unit_amount' => intval($item['precio'] * 100), // en céntimos
                ],
                'quantity' => $item['cantidad'],
            ];
        })->toArray();

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => url('/pago-exitoso'),
            'cancel_url' => url('/carrito'),
        ]);

        return response()->json(['id' => $session->id]);
    }
}
