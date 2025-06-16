import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface ProductoPivot {
  cantidad: number;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  pivot: ProductoPivot;
}

interface Compra {
  id: number;
  fecha_compra: string;
  usuario: {
    id: number;
    nombre_completo: string;
  };
  productos: Producto[];
}

interface Pago {
  id: number;
  compra_id: number;
  fecha_pago: string;
  metodo_pago: string;
  transaccion_id: string | null;
  estado: 'pendiente' | 'completado' | 'fallido';
}

interface Props extends PageProps {
  pago: Pago;
  compras: Compra[];
}

const Editar: React.FC<Props> = ({ pago, compras }) => {
  const { data, setData, put, processing, errors } = useForm({
    compra_id: pago.compra_id,
    fecha_pago: pago.fecha_pago,
    metodo_pago: pago.metodo_pago,
    transaccion_id: pago.transaccion_id ?? '',
    estado: pago.estado,
  });

  const [montoCalculado, setMontoCalculado] = useState(0);

  useEffect(() => {
    const compra = compras.find((c) => c.id === Number(data.compra_id));
    if (compra) {
      const total = compra.productos.reduce((sum, p) => sum + p.precio * p.pivot.cantidad, 0);
      setMontoCalculado(total);
    } else {
      setMontoCalculado(0);
    }
  }, [data.compra_id, compras]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/pagos/${pago.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Pago</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-semibold">Compra</label>
          <select
            value={data.compra_id}
            onChange={(e) => setData('compra_id', Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar compra</option>
            {compras.map((c) => (
              <option key={c.id} value={c.id}>
                #{c.id} - {c.fecha_compra} - {c.usuario?.nombre_completo}
              </option>
            ))}
          </select>
          {errors.compra_id && <p className="text-red-600 text-sm">{errors.compra_id}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Monto calculado (€)</label>
          <input
            type="number"
            readOnly
            value={montoCalculado}
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Fecha de Pago</label>
          <input
            type="datetime-local"
            value={data.fecha_pago.slice(0, 16)}
            onChange={(e) => setData('fecha_pago', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fecha_pago && <p className="text-red-600 text-sm">{errors.fecha_pago}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Método de Pago</label>
          <input
            type="text"
            value={data.metodo_pago}
            onChange={(e) => setData('metodo_pago', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.metodo_pago && <p className="text-red-600 text-sm">{errors.metodo_pago}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">ID de Transacción (opcional)</label>
          <input
            type="text"
            value={data.transaccion_id}
            onChange={(e) => setData('transaccion_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Estado</label>
          <select
            value={data.estado}
            onChange={(e) =>
              setData('estado', e.target.value as 'pendiente' | 'completado' | 'fallido')
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
            <option value="fallido">Fallido</option>
          </select>
          {errors.estado && <p className="text-red-600 text-sm">{errors.estado}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Actualizar pago
          </button>
          <a href="/admin/pagos" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Editar;
