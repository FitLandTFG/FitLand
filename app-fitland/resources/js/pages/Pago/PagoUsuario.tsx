// resources/js/pages/Pago/PagoUsuario.tsx
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '@/components/navbar';
import type { ItemCarrito } from '@/types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export default function PagoUsuario() {
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

  const handlePagar = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      alert('Error al cargar Stripe');
      return;
    }

    const response = await fetch('/api/crear-sesion-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: carrito }),
    });

    const data = await response.json();

    if (data.id) {
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert('Error al iniciar el pago');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Resumen de pago</h1>

        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="mb-6 space-y-3">
              {carrito.map((item) => (
                <li key={item.id} className="flex justify-between border-b pb-2">
                  <span>{item.nombre} x {item.cantidad}</span>
                  <span>€{(item.precio * item.cantidad).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <p className="text-right text-xl font-semibold mb-6">Total: €{total.toFixed(2)}</p>

            <div className="text-right">
              <button
                onClick={handlePagar}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Pagar con tarjeta
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
