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

interface Compra {
  id: number;
  usuario_id: number;
  fecha_compra: string;
  detalles: {
    producto_id: number;
    cantidad: number;
  }[];
}

interface Props extends PageProps {
  compra: Compra;
  usuarios: Usuario[];
  productos: Producto[];
}

const Editar: React.FC<Props> = (props) => {
  const { compra, usuarios, productos, flash } = props;

  const { data, setData, put, processing, errors } = useForm<{
    usuario_id: number | string;
    fecha_compra: string;
    productos: { id: number | string; cantidad: number }[];
  }>({
    usuario_id: compra.usuario_id,
    fecha_compra: compra.fecha_compra,
    productos: compra.detalles.map((d) => ({
      id: d.producto_id,
      cantidad: d.cantidad,
    })),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/compras/${compra.id}`);
  };

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
    } else if (campo === 'cantidad') {
      nuevos[index].cantidad = parseInt(valor);
    }
    setData('productos', nuevos);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Compra</h1>

      {flash?.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {flash.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Usuario */}
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

        {/* Fecha */}
        <div>
          <label className="block mb-1 font-semibold">Fecha de Compra</label>
          <input
  type="datetime-local"
  value={data.fecha_compra?.slice(0, 16)}
  onChange={(e) => setData('fecha_compra', e.target.value)}
  className="w-full border rounded px-3 py-2"
/>

          {errors.fecha_compra && <p className="text-red-600 text-sm">{errors.fecha_compra}</p>}
        </div>

        {/* Productos */}
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
          {errors.productos && <p className="text-red-600 text-sm">{errors.productos}</p>}

          <button
            type="button"
            onClick={handleAddProducto}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Añadir otro producto
          </button>
        </div>

        {/* Botones */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Actualizar compra
          </button>
          <a href="/admin/compras" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Editar;
