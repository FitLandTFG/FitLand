import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Compra {
  id: number;
  usuario: {
    nombre_completo: string;
  };
}

interface Producto {
  id: number;
  nombre: string;
}

interface Props extends PageProps {
  compras: Compra[];
  productos: Producto[];
}

const Crear: React.FC<Props> = ({ compras, productos, flash }) => {
  const { data, setData, post, processing, errors } = useForm({
    compra_id: '',
    producto_id: '',
    cantidad: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/detalle-compras');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Añadir Producto a Compra</h1>


      {flash?.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {flash.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Compra */}
        <div>
          <label className="block mb-1 font-semibold">Compra</label>
          <select
            value={data.compra_id}
            onChange={(e) => setData('compra_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar compra</option>
            {compras.map((c) => (
              <option key={c.id} value={c.id}>
                #{c.id} - {c.usuario.nombre_completo}
              </option>
            ))}
          </select>
          {errors.compra_id && <p className="text-red-600 text-sm">{errors.compra_id}</p>}
        </div>

        {/* Producto */}
        <div>
          <label className="block mb-1 font-semibold">Producto</label>
          <select
            value={data.producto_id}
            onChange={(e) => setData('producto_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          {errors.producto_id && <p className="text-red-600 text-sm">{errors.producto_id}</p>}
        </div>

        {/* Cantidad */}
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

        {/* Botones */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Guardar
          </button>
          <a href="/admin/detalle-compras" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Crear;
