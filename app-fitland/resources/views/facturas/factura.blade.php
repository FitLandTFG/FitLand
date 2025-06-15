<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Factura</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            color: #333;
            margin: 40px;
            background-color: #f9f9f9;
        }

        .logo-container {
            text-align: right;
        }

        h1 {
            color: #42A612;
            font-size: 28px;
            margin: 20px 0 10px 0;
        }

        h3 {
            color: #42A612;
            font-size: 20px;
            margin-top: 30px;
            margin-bottom: 10px;
        }

        p {
            margin: 6px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background-color: #fff;
        }

        th {
            background-color: #42A612;
            color: #fff;
            padding: 10px;
            text-align: left;
            font-weight: 600;
        }

        td {
            padding: 10px;
            border: 1px solid #ccc;
            vertical-align: top;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        .logo {
            width: 100px;
        }

        .total-row td {
            font-weight: bold;
            color: black;
            background-color: #eef6fb;
        }

        .section {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

    <div class="logo-container">
        <img src="{{ public_path('images/logo.png') }}" alt="Logo FitLand" class="logo">
    </div>

    <h1>Factura FitLand</h1>

    <div class="section">
        <p><strong>Fecha:</strong> {{ $pago->created_at->format('d/m/Y') }}</p>
        <p><strong>Cliente:</strong> {{ $pago->usuario->nombre_completo }}</p>
        <p><strong>Método de pago:</strong> {{ $pago->metodo_pago }}</p>
    </div>

    @if($pago->compra)
        <h3>Productos</h3>
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                @foreach($pago->compra->productos as $producto)
                    <tr>
                        <td>{{ $producto->nombre }}</td>
                        <td>{{ $producto->pivot->cantidad }}</td>
                        <td>{{ number_format($producto->precio, 2) }} €</td>
                    </tr>
                @endforeach
                <tr class="total-row">
                    <td colspan="2"><strong>Total pagado</strong></td>
                    <td><strong>{{ number_format($pago->monto, 2) }} €</strong></td>
                </tr>
            </tbody>
        </table>
   @elseif($pago->suscripcion)
    <h3>Suscripción</h3>
    <table>
        <thead>
            <tr>
                <th>Plan</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $pago->suscripcion->plan->nombre }}</td>
                <td>1</td>
                <td>{{ number_format($pago->monto, 2) }} €</td>
            </tr>
            <tr class="total-row">
                <td colspan="2"><strong>Total pagado</strong></td>
                <td><strong>{{ number_format($pago->monto, 2) }} €</strong></td>
            </tr>
        </tbody>
    </table>
@endif


</body>
</html>
