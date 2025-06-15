import { useEffect } from 'react';
import Navbar from '@/components/navbar';
import { CheckCircle } from 'lucide-react';

export default function PagoExito() {
 useEffect(() => {
  const registrar = async () => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const carritoRaw = localStorage.getItem('carrito');
    const planId = localStorage.getItem('plan_id');

    if (!carritoRaw && !planId) {
      console.warn('Faltan datos en localStorage');
      return;
    }

    try {
      // 1. Procesar compra
      if (carritoRaw && JSON.parse(carritoRaw).length > 0) {
        const carrito = JSON.parse(carritoRaw);

        const compraRes = await fetch('/compras/crear-desde-carrito', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token ?? '',
          },
          body: JSON.stringify({ carrito }),
        });

        const compra = await compraRes.json();

        const pagoCompra = {
          compra_id: compra.compra_id,
          metodo_pago: 'Tarjeta - Vía Online',
          estado: 'completado',
          transaccion_id: null,
        };

        await fetch('/pagos/registrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token ?? '',
          },
          body: JSON.stringify(pagoCompra),
        });
      }

      // 2. Procesar suscripción
      if (planId) {
        const suscripcionRes = await fetch('/suscripciones/crear-desde-frontend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token ?? '',
          },
          body: JSON.stringify({ plan_id: parseInt(planId) }),
        });

        const suscripcion = await suscripcionRes.json();

        const pagoSuscripcion = {
          suscripcion_id: suscripcion.suscripcion_id,
          metodo_pago: 'Tarjeta - Vía Online',
          estado: 'completado',
          transaccion_id: null,
        };

        await fetch('/pagos/registrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token ?? '',
          },
          body: JSON.stringify(pagoSuscripcion),
        });
      }

      // 3. Limpiar localStorage
      localStorage.removeItem('monto_total');
      localStorage.removeItem('plan_id');

      if (carritoRaw) {
        localStorage.removeItem('carrito');
        window.dispatchEvent(new Event('carritoActualizado'));
      }

    } catch (error) {
      console.error('Error al registrar el pago:', error);
    }
  };

  registrar();
}, []);


  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 text-center bg-white">
  <CheckCircle size={64} className="text-green-500 mb-4" />
  <h1 className="text-3xl font-extrabold text-green-600 mb-2">¡Pago realizado con éxito!</h1>
  <p className="text-gray-700 text-lg mb-6">Gracias por tu compra. Puedes descargar la factura con los detalles de la compra.</p>

  {/* Botones alineados */}
  <div className="flex flex-wrap justify-center gap-4">
    <a
      href="/"
      className="bg-[#41A510] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
    >
      Volver a FitLand
    </a>

    <a
      href="/factura/pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded transition"
    >
      Descargar Factura
    </a>
  </div>
</div>

    </>
  );
}
