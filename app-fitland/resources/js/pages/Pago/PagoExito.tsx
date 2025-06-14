import { useEffect } from 'react';
import Navbar from '@/components/navbar';
import { CheckCircle } from 'lucide-react'; // ícono moderno

export default function PagoExito() {
  useEffect(() => {
    const registrar = async () => {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const monto = localStorage.getItem('monto_total');
      const carritoRaw = localStorage.getItem('carrito');
      const planId = localStorage.getItem('plan_id');

      if (!monto || (!carritoRaw && !planId)) {
        console.warn('Faltan datos en localStorage');
        return;
      }

      try {
        let pagoData = null;

        if (carritoRaw) {
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

          pagoData = {
            compra_id: compra.compra_id,
            monto: parseFloat(monto),
            metodo_pago: 'stripe',
            estado: 'completado',
            transaccion_id: null,
          };
        }

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

          pagoData = {
            suscripcion_id: suscripcion.suscripcion_id,
            monto: parseFloat(monto),
            metodo_pago: 'stripe',
            estado: 'completado',
            transaccion_id: null,
          };
        }

        if (pagoData) {
          const response = await fetch('/pagos/registrar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': token ?? '',
            },
            body: JSON.stringify(pagoData),
          });

          if (!response.ok) {
            console.error('Error al registrar el pago:', await response.text());
            return;
          }

          console.log('Pago registrado correctamente');
        }

        localStorage.removeItem('monto_total');
        localStorage.removeItem('carrito');
        localStorage.removeItem('plan_id');
        window.dispatchEvent(new Event('carritoActualizado'));

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
        <p className="text-gray-700 text-lg mb-6">Gracias por tu compra. Te hemos enviado un correo con los detalles.</p>
        <a
          href="/"
          className="bg-[#41A510] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Volver a FitLand
        </a>
      </div>
    </>
  );
}