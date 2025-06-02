import { router, usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';

type PageProps = {
  carrito: {
    items: CarritoItem[];
    total: number;
  };
};

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
  const { carrito } = usePage<PageProps>().props;

  const eliminarItem = (id: number) => {
    if (confirm('¿Seguro que deseas eliminar este producto del carrito?')) {
      router.delete(`/carrito/item/${id}`);
    }
  };

  const vaciarCarrito = () => {
    if (confirm('¿Vaciar todo el carrito?')) {
      router.post('/carrito/vaciar');
    }
  };

  const finalizarCompra = () => {
    if (confirm('¿Deseas finalizar la compra?')) {
      router.post('/carrito/checkout');
    }
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>

      {carrito.items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carrito.items.map((item) => (
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
                  onClick={() => eliminarItem(item.id)}
                  className="text-red-600 text-xl font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold mb-4">Total: €{carrito.total.toFixed(2)}</p>
            <button
              onClick={finalizarCompra}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mr-2"
            >
              Finalizar compra
            </button>
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
  );
}
