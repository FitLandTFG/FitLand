import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Plan {
  id: number;
  nombre: string;
  precio: number;
  tipo: 'Prueba' | 'Silver' | 'Gold' | 'Diamond';
  duracion_dias: number;
}

interface Props extends PageProps {
  plan: Plan;
}

const Editar: React.FC<Props> = ({ plan }) => {
  const { data, setData, put, processing, errors } = useForm({
    nombre: plan.nombre,
    precio: plan.precio,
    tipo: plan.tipo,
    duracion_dias: plan.duracion_dias,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/planes_suscripcion/${plan.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Plan de Suscripción</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-semibold">Nombre</label>
          <input
            type="text"
            value={data.nombre}
            onChange={(e) => setData('nombre', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.nombre && <p className="text-red-600 text-sm">{errors.nombre}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Precio</label>
          <input
            type="number"
            step="0.01"
            value={data.precio}
            onChange={(e) => setData('precio', parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
          {errors.precio && <p className="text-red-600 text-sm">{errors.precio}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tipo</label>
          <select
            value={data.tipo}
            onChange={(e) => setData('tipo', e.target.value as Plan['tipo'])}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Prueba">Prueba</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Diamond">Diamond</option>
          </select>
          {errors.tipo && <p className="text-red-600 text-sm">{errors.tipo}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Duración (días)</label>
          <input
            type="number"
            value={data.duracion_dias}
            onChange={(e) => setData('duracion_dias', parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
          {errors.duracion_dias && <p className="text-red-600 text-sm">{errors.duracion_dias}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Actualizar plan
          </button>

          <a
            href="/admin/planes_suscripcion"
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
