import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface DetalleCompra {
  id: number;
  compra: {
    id: number;
    usuario: {
      nombre_completo: string;
    };
  };
  producto: {
    id: number;
    nombre: string;
  };
  cantidad: number;
}

interface Props extends PageProps {
  detalle: DetalleCompra;
  flash?: {
    error?: string;
  };
}

const Editar: React.FC<Props> = ({ detalle, flash }) => {
  const { data, setData, put, processing, errors } = useForm({
    cantidad: detalle.cantidad,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/detalle-compras/${detalle.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar detalle de compras</h1>

      {flash?.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {flash.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <div>
          <label className="block mb-1 font-semibold">Cliente</label>
          <input
            type="text"
            value={detalle.compra.usuario.nombre_completo}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Producto</label>
          <input
            type="text"
            value={detalle.producto.nombre}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cantidad</label>
          <input
            type="number"
            min={1}
            value={data.cantidad}
            onChange={(e) => setData('cantidad', parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
          {errors.cantidad && <p className="text-red-600 text-sm">{errors.cantidad}</p>}
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Actualizar
          </button>
          <a
            href="/admin/detalle-compras"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Editar;
