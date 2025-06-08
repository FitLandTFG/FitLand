import { useForm, usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import { router } from '@inertiajs/react';

type Clase = {
  id: number;
  nombre: string;
  fecha: string;
};

type Inscripcion = {
  id: number;
  clase_id: number;
  fecha: string;
  nombre: string;
};

export default function Inscribirse() {
  const { clases, inscripciones, flash, errors } = usePage<
    PageProps & { clases: Clase[]; inscripciones: Inscripcion[] }
  >().props;

  const [tab, setTab] = useState<'formulario' | 'misClases'>('formulario');
  const [nombreSeleccionado, setNombreSeleccionado] = useState('');
  const [fechasFiltradas, setFechasFiltradas] = useState<Clase[]>([]);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(flash?.success ?? null);
  const [showModal, setShowModal] = useState(false);
  const [selectedInscripcion, setSelectedInscripcion] = useState<Inscripcion | null>(null);

  const { data, setData, post, processing, clearErrors } = useForm({
    clase_id: '',
  });

  useEffect(() => {
    if (nombreSeleccionado) {
      const filtradas = clases
        .filter((c) => c.nombre === nombreSeleccionado)
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

      setFechasFiltradas(filtradas);
      setData('clase_id', '');
      setErrorGeneral(null);
      clearErrors();
    } else {
      setFechasFiltradas([]);
    }
  }, [nombreSeleccionado, clases, clearErrors, setData]);
  useEffect(() => {
    if (flash?.success) {
      setSuccessMessage(flash.success);
    }
  }, [flash]);

  const nombresUnicos = Array.from(new Set(clases.map((c) => c.nombre)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('inscribirse.guardar'), {
      onError: (err) => {
        setErrorGeneral(err.general ?? null);
        setSuccessMessage(null);
      },
      onSuccess: () => {
        setErrorGeneral(null);
        setSuccessMessage('Inscripción realizada con éxito.');
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 text-black">
        {(successMessage || errorGeneral || Object.keys(errors).length > 0) && (
          <div className="mb-4 space-y-2">
            {successMessage && (
              <div className="p-2 bg-green-100 border border-green-300 text-green-800 rounded">
                {successMessage}
              </div>
            )}
            {errorGeneral && (
              <div className="p-2 bg-red-100 border border-red-300 text-red-800 rounded">
                {errorGeneral}
              </div>
            )}
            {Object.keys(errors).map((key) => (
              <div
                key={key}
                className="p-2 bg-red-100 border border-red-300 text-red-800 rounded"
              >
                {errors[key]}
              </div>
            ))}
          </div>
        )}

        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-semibold ${tab === 'formulario'
              ? 'border-b-4 border-green-600 text-green-600'
              : 'text-gray-500 cursor-pointer'
              }`}
            onClick={() => {
              setTab('formulario');
              setErrorGeneral(null);
              setSuccessMessage(null);
              Object.keys(errors).forEach((key) => delete errors[key]);
            }}
          >
            Inscribirse
          </button>
          <button
            className={`px-4 py-2 font-semibold ${tab === 'misClases'
              ? 'border-b-4 border-green-600 text-green-600'
              : 'text-gray-500 cursor-pointer'
              }`}
            onClick={() => {
              setTab('misClases');
              setErrorGeneral(null);
              setSuccessMessage(null);
              Object.keys(errors).forEach((key) => delete errors[key]);
            }}
          >
            Mis clases
          </button>
        </div>

        {tab === 'formulario' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Inscribirse a una clase</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Nombre de clase</label>
                <select
                  value={nombreSeleccionado}
                  onChange={(e) => {
                    setNombreSeleccionado(e.target.value);
                    setErrorGeneral(null);
                    setSuccessMessage(null);
                    Object.keys(errors).forEach((key) => delete errors[key]);
                  }}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="">Selecciona una clase</option>
                  {nombresUnicos.map((nombre) => (
                    <option key={nombre} value={nombre}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>

              {fechasFiltradas.length > 0 && (
                <div>
                  <label className="block font-semibold mb-1">Día y hora</label>
                  <ul className="space-y-2">
                    {fechasFiltradas.map((clase) => {
                      const yaInscritoEnHorario = inscripciones.some(
                        (i) =>
                          i.clase_id === clase.id &&
                          new Date(i.fecha).toISOString() ===
                          new Date(clase.fecha).toISOString()
                      );

                      return (
                        <li key={clase.id}>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="clase_id"
                              value={clase.id}
                              id={`clase-${clase.id}`}
                              onChange={() => {
                                setData('clase_id', clase.id.toString());
                                setErrorGeneral(null);
                                setSuccessMessage(null);
                                Object.keys(errors).forEach((key) => delete errors[key]);
                              }}
                              checked={data.clase_id === clase.id.toString()}
                              disabled={yaInscritoEnHorario}
                              className="peer hidden"
                            />
                            <label
                              htmlFor={`clase-${clase.id}`}
                              className={`flex items-center gap-2 cursor-pointer select-none`}
                            >
                              <span
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${data.clase_id === clase.id.toString()
                                    ? 'border-[#41A510]'
                                    : 'border-gray-400'
                                  }`}
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${data.clase_id === clase.id.toString() ? 'bg-[#41A510]' : ''}`}
                                ></span>
                              </span>
                              {new Date(clase.fecha).toLocaleString()}
                            </label>
                            {new Date(clase.fecha).toLocaleString()}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                disabled={processing || !data.clase_id}
                className={`px-4 py-2 rounded text-white ${processing || !data.clase_id
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer'
                  }`}
              >
                {processing ? 'Enviando...' : 'Inscribirse'}
              </button>
            </form>
          </>
        )}

        {tab === 'misClases' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Clases inscritas</h1>
            {inscripciones.length === 0 ? (
              <p className="text-gray-600">Aún no estás inscrito en ninguna clase.</p>
            ) : (
              <ul className="space-y-3">
                {inscripciones.map((i, index) => (
                  <li
                    key={index}
                    className="border p-3 rounded bg-white flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Clase:</strong> {i.nombre}
                      </p>
                      <p>
                        <strong>Fecha:</strong> {new Date(i.fecha).toLocaleString()}
                      </p>
                    </div>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
                      onClick={() => {
                        setSelectedInscripcion(i);
                        setShowModal(true);
                      }}
                    >
                      Cancelar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        {showModal && selectedInscripcion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/20">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-semibold mb-4">
                ¿Estás seguro de que deseas cancelar la inscripción de{' '}
                <span className="text-green-700">{selectedInscripcion.nombre}</span>?
              </h2>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    router.delete(route('inscribirse.eliminar', selectedInscripcion.id));
                    setShowModal(false);
                  }}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
