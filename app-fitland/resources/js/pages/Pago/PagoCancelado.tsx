import Navbar from '@/components/navbar';

export default function PagoCancelado() {
  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Pago cancelado</h1>
        <p className="text-lg">Tu pago fue cancelado. Puedes volver a intentarlo desde el carrito.</p>
      </div>
    </>
  );
}
