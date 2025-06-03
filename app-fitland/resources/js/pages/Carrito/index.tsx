import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

export type CarritoItem = {
  id: number;
  cantidad: number;
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imagen_url: string;
  };
};

export default function Carrito() {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('carrito');
    if (saved) {
      setCarrito(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const disminuirCantidad = (id: number) => {
    setCarrito((prev) =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    if (confirm('¿Vaciar el carrito?')) {
      setCarrito([]);
    }
  };

  const total = carrito.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>

        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {carrito.map((item) => (
                <li key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-4">
                    <img src={item.producto.imagen_url} alt={item.producto.nombre} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.producto.nombre}</h2>
                      <p>Cantidad: {item.cantidad}</p>
                      <p>Precio: €{item.producto.precio.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => disminuirCantidad(item.id)}
                    className="text-red-600 text-2xl font-bold"
                    title="Disminuir cantidad o eliminar"
                  >
                    –
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <p className="text-xl font-semibold mb-4">Total: €{total.toFixed(2)}</p>
              <button
                onClick={vaciarCarrito}
                className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}