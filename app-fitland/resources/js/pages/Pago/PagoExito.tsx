import { useEffect } from 'react';
import Navbar from '@/components/navbar';

export default function PagoExito() {
useEffect(() => {
  const registrarPago = async () => {
    const compraId = localStorage.getItem('compra_id');
    const monto = localStorage.getItem('monto_total');
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (!compraId || !monto) {
      console.warn('No hay datos de compra en localStorage');
      return;
    }

    try {
      const response = await fetch('/pagos/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token ?? '',
        },
        body: JSON.stringify({
          compra_id: parseInt(compraId),
          monto: parseFloat(monto),
          metodo_pago: 'stripe',
          estado: 'completado',
          transaccion_id: null,
        }),
      });

      if (!response.ok) {
        console.error('Error al registrar el pago:', await response.text());
        return;
      }

      console.log('Pago registrado correctamente');

      // Limpiar después
      localStorage.removeItem('compra_id');
      localStorage.removeItem('monto_total');
      localStorage.removeItem('carrito');
      window.dispatchEvent(new Event('carritoActualizado'));
    } catch (error) {
      console.error('Error al enviar el pago:', error);
    }
  };

  registrarPago();
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
