<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 font-sans">

    <header class="bg-blue-600 text-white p-4">
        <div class="container mx-auto flex items-center justify-between relative">
            <div>
                <a href="/" style="background-color: #4EB11F;" class="inline-block text-white px-4 py-2 rounded-full">
                    Volver al inicio
                </a>
            </div>

            <h1 class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold">
                Administrador
            </h1>
        </div>
    </header>

    <main class="container mx-auto p-6">
        <h2 class="text-3xl font-bold text-center text-gray-700 mb-6">Bienvenido al Panel de Administración</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Usuarios</h3>
                <p class="text-gray-600 mb-4">Gestiona los usuarios registrados en FitLand.</p>
                <a href="/admin/usuarios" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Planes de suscripción</h3>
                <p class="text-gray-600 mb-4">Gestiona los distintos planes a los que se podrán suscribir los usuarios registrados.</p>
                <a href="/admin/planes_suscripcion" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Suscripciones</h3>
                <p class="text-gray-600 mb-4">Gestiona las suscripciones disponibles para los usuarios.</p>
                <a href="/admin/suscripciones" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Productos</h3>
                <p class="text-gray-600 mb-4">Gestiona los productos disponibles en la tienda online.</p>
                <a href="/admin/productos" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Pagos</h3>
                <p class="text-gray-600 mb-4">Gestiona los pagos realizados por los usuarios.</p>
                <a href="/admin/pagos" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Compras</h3>
                <p class="text-gray-600 mb-4">Gestiona las compras realizadas por los usuarios.</p>
                <a href="/admin/compras" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Clases</h3>
                <p class="text-gray-600 mb-4">Gestiona las clases disponibles para los usuarios.</p>
                <a href="/admin/clases" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Inscripciones</h3>
                <p class="text-gray-600 mb-4">Gestiona las inscripciones a las clases de los usuarios.</p>
                <a href="/admin/inscripciones" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Detalle de Compra</h3>
            <p class="text-gray-600 mb-4">Gestiona los productos asociados a cada compra.</p>
            <a href="/admin/detalle-compras" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Carrito</h3>
                <p class="text-gray-600 mb-4">Gestiona los productos añadidos al carrito por los usuarios.</p>
                <a href="/admin/carritos" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Ver opciones</a>
            </div>

            <div class="flex flex-col justify-end h-40">
</div>

        </div>
    </main>

    <footer class="bg-blue-600 text-white text-center p-4 mt-8">
        <p>&copy; 2025 FitLand. Todos los derechos reservados.</p>
    </footer>

</body>
</html>
