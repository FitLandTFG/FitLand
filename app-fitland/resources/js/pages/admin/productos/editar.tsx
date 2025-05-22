import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Producto {
  id: number;
  tipo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
}

interface Props extends PageProps {
  producto: Producto;
}

const Editar: React.FC<Props> = ({ producto }) => {
  const { data, setData, put, processing, errors } = useForm({
    tipo: producto.tipo,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    imagen: producto.imagen,
    stock: producto.stock, // ✅ nuevo campo
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/productos/${producto.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {[
          { name: 'nombre', label: 'Nombre' },
          { name: 'descripcion', label: 'Descripción' },
          { name: 'precio', label: 'Precio', type: 'number' },
          { name: 'imagen', label: 'Imagen (URL)' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block mb-1 font-semibold">{label}</label>
            <input
              type={type}
              value={data[name as keyof typeof data] ?? ''}
              onChange={(e) => setData(name as keyof typeof data, e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors[name as keyof typeof errors] && (
              <p className="text-red-600 text-sm">{errors[name as keyof typeof errors]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block mb-1 font-semibold">Stock</label>
          <input
            type="number"
            min={0}
            max={999}
            value={data.stock}
            onChange={(e) => setData('stock', parseInt(e.target.value) || 0)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.stock && <p className="text-red-600 text-sm">{errors.stock}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tipo</label>
          <select
            value={data.tipo}
            onChange={(e) => setData('tipo', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="ropa">Ropa</option>
            <option value="suplemento">Suplemento</option>
            <option value="bebida">Bebida</option> {/* ✅ nuevo */}
            <option value="accesorio">Accesorio</option> {/* ✅ nuevo */}
          </select>
          {errors.tipo && <p className="text-red-600 text-sm">{errors.tipo}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Actualizar producto
          </button>
          <a href="/admin/productos" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Editar;
