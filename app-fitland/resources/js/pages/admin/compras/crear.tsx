import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Usuario {
  id: number;
  nombre_completo: string;
}

interface Producto {
  id: number;
  nombre: string;
}

interface Props extends PageProps {
  usuarios: Usuario[];
  productos: Producto[];
}

const Crear: React.FC<Props> = ({ usuarios, productos }) => {
  const { data, setData, post, processing, errors } = useForm({
    usuario_id: '',
    producto_id: '',
    fecha_compra: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/compras');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Registrar Compra</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-semibold">Usuario</label>
          <select
            value={data.usuario_id}
            onChange={(e) => setData('usuario_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre_completo}
              </option>
            ))}
          </select>
          {errors.usuario_id && <p className="text-red-600 text-sm">{errors.usuario_id}</p>}
        </div>

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

        <div>
          <label className="block mb-1 font-semibold">Fecha de Compra</label>
          <input
            type="date"
            value={data.fecha_compra}
            onChange={(e) => setData('fecha_compra', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fecha_compra && <p className="text-red-600 text-sm">{errors.fecha_compra}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Registrar compra
          </button>
          <a href="/admin/compras" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Crear;
