import AppLayout from '@/layouts/app-layout';
import { XCircle } from 'lucide-react';

export default function PagoCancelado() {
  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 text-center bg-white">
        <XCircle size={64} className="text-red-500 mb-4" />
        <h1 className="text-3xl font-extrabold text-red-600 mb-2">Pago cancelado</h1>
        <p className="text-gray-700 text-lg mb-6">
          El proceso de pago fue cancelado o no se completó. Puedes volver al carrito para intentarlo de nuevo.
        </p>
        <a
          href="/carrito"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Volver al carrito
        </a>
      </div>
    </AppLayout>
  );
}