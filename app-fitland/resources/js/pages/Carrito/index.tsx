import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { ItemCarrito } from '@/types';
export interface PageProps {
  suscripcion?: string | null;
  [key: string]: unknown;
}


export default function Carrito() {
  const { suscripcion } = usePage<PageProps>().props;

  const tieneDescuento = suscripcion === 'Diamond Mensual' || suscripcion === 'Diamond Anual';

  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carritoRaw = localStorage.getItem('carrito');
    const carritoParsed: ItemCarrito[] = carritoRaw ? JSON.parse(carritoRaw) : [];
    setCarrito(carritoParsed);
    calcularTotal(carritoParsed);
  }, []);

  const calcularTotal = (items: ItemCarrito[]) => {
    const totalCalculado = items.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    setTotal(totalCalculado);
  };

  const actualizarCarrito = (nuevoCarrito: ItemCarrito[]) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    calcularTotal(nuevoCarrito);
  };

  const modificarCantidad = (id: number, cambio: number) => {
    const actualizado = carrito
      .map((item) => {
        if (item.id === id) {
          const nuevaCantidad = item.cantidad + cambio;
          if (nuevaCantidad <= 0) return null;
          if (item.stock !== undefined && nuevaCantidad > item.stock) return item;
          return { ...item, cantidad: nuevaCantidad };
        }
        return item;
      })
      .filter((item): item is ItemCarrito => item !== null);

    actualizarCarrito(actualizado);
  };

  const vaciarCarrito = () => {
    localStorage.removeItem('carrito');
    setCarrito([]);
    setTotal(0);
    window.dispatchEvent(new Event('carritoActualizado'));
  };

  const handlePago = async () => {
  try {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    localStorage.removeItem('plan_id');

    localStorage.setItem('carrito', JSON.stringify(carrito));

    const response = await fetch('/pago/crear-sesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token ?? '',
      },
      body: JSON.stringify({ carrito }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('No se pudo iniciar el pago.');
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    alert('Ocurrió un error al procesar el pago.');
  }
};



  return (
    <AppLayout>
      <Head title="Carrito" />
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
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-20 h-20 object-contain rounded border"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.nombre}</h2>
                      <p>Precio: €{item.precio.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Stock: {item.stock ?? 'N/D'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => modificarCantidad(item.id, -1)}
                          className="bg-gray-300 px-2 rounded text-black hover:bg-gray-400 cursor-pointer"
                        >
                          –
                        </button>
                        <span>{item.cantidad}</span>
                        <button
                          onClick={() => modificarCantidad(item.id, 1)}
                          disabled={item.stock !== undefined && item.cantidad >= item.stock}
                          className="bg-gray-300 px-2 rounded text-black hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <div className="text-right mb-4">
                <p className="text-xl font-semibold">Total: €{total}</p>
                {tieneDescuento && (
                  <>
                    <p className="text-green-700 font-semibold">
                      Descuento (10%): –€{(total * 0.1)}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      Total a pagar: €{(total * 0.9)}
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={vaciarCarrito}
                className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded cursor-pointer"
              >
                Vaciar carrito
              </button>

              <button
                onClick={handlePago}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded ml-4 cursor-pointer"
              >
                Pagar
              </button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
