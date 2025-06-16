import React from 'react';
import { useForm } from '@inertiajs/react';

const Crear: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    tipo: 'ropa',
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    stock: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/productos');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Producto</h1>

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
          <label className="block mb-1 font-semibold">Tipo</label>
          <select
            value={data.tipo}
            onChange={(e) => setData('tipo', e.target.value)}
            className="w-full border rounded px-3 py-2"
            >
            <option value="ropa">Ropa</option>
            <option value="suplemento">Suplemento</option>
            <option value="bebida">Bebida</option>
            <option value="accesorio">Accesorio</option>
            </select>
          {errors.tipo && <p className="text-red-600 text-sm">{errors.tipo}</p>}
        </div>
        <div>
            <label className="block mb-1 font-semibold">Stock</label>
            <input
                type="number"
                value={data.stock}
                onChange={(e) => setData('stock', parseInt(e.target.value) || 0)}
                className="w-full border rounded px-3 py-2"
                min={0}
                max={999}
            />
            {errors.stock && <p className="text-red-600 text-sm">{errors.stock}</p>}
            </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Crear producto
          </button>
          <a href="/admin/productos" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Crear;
