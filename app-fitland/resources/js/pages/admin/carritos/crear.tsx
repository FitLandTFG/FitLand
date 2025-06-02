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
  flash?: {
    error?: string;
  };
}

const Crear: React.FC<Props> = ({ usuarios, productos, flash }) => {
  const { data, setData, post, processing, errors } = useForm({
    usuario_id: '',
    productos: [{ id: '', cantidad: 1 }],
  });

  const handleAddProducto = () => {
    setData('productos', [...data.productos, { id: '', cantidad: 1 }]);
  };

  const handleRemoveProducto = (index: number) => {
    const nuevos = [...data.productos];
    nuevos.splice(index, 1);
    setData('productos', nuevos);
  };

  const handleProductoChange = (index: number, campo: 'id' | 'cantidad', valor: string) => {
    const nuevos = [...data.productos];
    if (campo === 'id') {
      nuevos[index].id = valor;
    } else {
      nuevos[index].cantidad = parseInt(valor) || 1;
    }
    setData('productos', nuevos);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/carritos');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Carrito</h1>

      {flash?.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {flash.error}
        </div>
      )}

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
          <label className="block mb-2 font-semibold">Productos</label>
          {data.productos.map((producto, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <select
                value={producto.id}
                onChange={(e) => handleProductoChange(index, 'id', e.target.value)}
                className="flex-1 border rounded px-3 py-2"
              >
                <option value="">Seleccionar producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                value={producto.cantidad}
                onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                className="w-24 border rounded px-3 py-2"
                placeholder="Cantidad"
              />
              <button
                type="button"
                onClick={() => handleRemoveProducto(index)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProducto}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Añadir otro producto
          </button>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Crear carrito
          </button>
          <a href="/admin/carritos" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Crear;
