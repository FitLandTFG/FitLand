import { useEffect } from 'react';
import Navbar from '@/components/navbar';

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

        // 🛒 Si es compra
        if (carritoRaw) {
          const carrito = JSON.parse(carritoRaw);

          // Crear compra
          const compraRes = await fetch('/compras/crear-desde-carrito', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': token ?? '',
            },
            body: JSON.stringify({ carrito }),
          });

          const compra = await compraRes.json();

          // Crear pago
          pagoData = {
            compra_id: compra.compra_id,
            monto: parseFloat(monto),
            metodo_pago: 'stripe',
            estado: 'completado',
            transaccion_id: null,
          };
        }

        // 🧾 Si es suscripción
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

        // Limpiar todo
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
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago realizado con éxito!</h1>
        <p className="text-lg">Gracias por tu compra. Te enviaremos un correo con los detalles.</p>
      </div>
    </>
  );
}
