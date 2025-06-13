import React, { useState, useRef, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import { PageProps } from '@/types';

interface Suscripcion {
  fecha_inicio: string;
  fecha_fin: string;
}

interface Compra {
  id: number;
  producto: string;
  fecha: string;
  coste: number;
}

interface Inscripcion {
  id: number;
  fecha: string;
  clase: {
    nombre: string;
    imagen_url: string;
  };
}

interface Usuario {
  id: number;
  nombre_completo: string;
  email: string;
  domicilio: string;
  documentacion: string;
  foto_perfil_url: string;
  suscripcion_id: Suscripcion | null;
  compras: Compra[];
  inscripciones: Inscripcion[];
}

interface CuentaPageProps extends PageProps {
  usuario: Usuario;
}
  

export default function Cuenta() {
  const { usuario } = usePage<CuentaPageProps>().props;

  const [tab, setTab] = useState<'info' | 'suscripcion' | 'contrasena' | 'historial'>('info');
  const [modalVisible, setModalVisible] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(usuario.foto_perfil_url);
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const [errorFoto, setErrorFoto] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [actualPass, setActualPass] = useState('');
  const [nuevaPass, setNuevaPass] = useState('');
  const [cambiandoPass, setCambiandoPass] = useState(false);
  const [mensajePass, setMensajePass] = useState<string | null>(null);

  const diasRestantes = usuario.suscripcion_id
    ? Math.max(
        0,
        Math.ceil(
          (new Date(usuario.suscripcion_id.fecha_fin).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  const triggerInputFile = () => {
    inputFileRef.current?.click();
  };

  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('imagen', file);

    setSubiendoFoto(true);
    setErrorFoto(null);

    try {
      const res = await fetch('/mi-cuenta/actualizar-imagen', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': token ?? '',
        },
        body: formData,
      });

      if (!res.ok) {
        setErrorFoto('Error al subir la foto');
        setSubiendoFoto(false);
        return;
      }

      const data = await res.json();
      setFotoPreview(data.foto_perfil_url);
      setSubiendoFoto(false);
    } catch (error) {
      setErrorFoto('Error inesperado al subir la foto');
      setSubiendoFoto(false);
    }
  };

  const cancelarSuscripcion = async () => {
    try {
      const res = await fetch('/mi-cuenta/cancelar-suscripcion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token ?? '',
        },
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert('Error al cancelar suscripción');
      }
    } catch {
      alert('Error inesperado al cancelar suscripción');
    }
  };

  const cambiarContrasena = async (e: React.FormEvent) => {
    e.preventDefault();
    setCambiandoPass(true);
    setMensajePass(null);

    try {
      const res = await fetch('/mi-cuenta/cambiar-contrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token ?? '',
        },
        body: JSON.stringify({ actual: actualPass, nueva: nuevaPass }),
      });

      if (res.ok) {
        setMensajePass('Contraseña actualizada correctamente.');
        setActualPass('');
        setNuevaPass('');
      } else if (res.status === 422) {
        const data = await res.json();
        setMensajePass(data.message || 'Error en la actualización.');
      } else {
        setMensajePass('La contraseña actual introducida no es correcta.');
      }
    } catch {
      setMensajePass('Error inesperado al actualizar contraseña.');
    } finally {
      setCambiandoPass(false);
    }
  };

  return (
    <>
      <Head title="Mi cuenta" />
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 text-gray-900">
        <div className="flex justify-center mb-10">
          <div
            className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer group"
            onClick={triggerInputFile}
          >
            <img
              src={fotoPreview}
              alt="Foto de perfil"
              className="object-cover w-full h-full transition duration-300 group-hover:brightness-110"
              draggable={false}
            />
            <div className="absolute inset-0 bg-white bg-opacity-30 opacity-0 group-hover:opacity-60 flex items-center justify-center transition duration-300">
              <svg
                className="w-10 h-10 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 11l6-6m-1.5 1.5L9 11m0 0v6a1 1 0 001 1h6m-6 0L4 21l-1-1 8-8z"
                ></path>
              </svg>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputFileRef}
              onChange={handleFotoChange}
            />
          </div>
        </div>

        {errorFoto && (
          <p className="text-center text-red-600 mb-6 font-semibold">{errorFoto}</p>
        )}

        <nav className="flex justify-center space-x-6 mb-12 border-b border-gray-300">
          <button
            className={`pb-2 font-semibold text-lg ${
              tab === 'info' ? 'border-b-4 border-[#41A510] text-[#41A510] cursor-pointer' : 'text-gray-600 hover:text-[#41A510] cursor-pointer'
            }`}
            onClick={() => setTab('info')}
          >
            Información
          </button>
          <button
            className={`pb-2 font-semibold text-lg ${
              tab === 'suscripcion' ? 'border-b-4 border-[#41A510] text-[#41A510] cursor-pointer' : 'text-gray-600 hover:text-[#41A510] cursor-pointer'
            }`}
            onClick={() => setTab('suscripcion')}
          >
            Suscripción
          </button>
          <button
            className={`pb-2 font-semibold text-lg ${
              tab === 'contrasena' ? 'border-b-4 border-[#41A510] text-[#41A510] cursor-pointer' : 'text-gray-600 hover:text-[#41A510] cursor-pointer'
            }`}
            onClick={() => setTab('contrasena')}
          >
            Contraseña
          </button>
          <button
            className={`pb-2 font-semibold text-lg ${
              tab === 'historial' ? 'border-b-4 border-[#41A510] text-[#41A510] cursor-pointer' : 'text-gray-600 hover:text-[#41A510] cursor-pointer'
            }`}
            onClick={() => setTab('historial')}
          >
            Historial
          </button>
        </nav>

        <div>
          {tab === 'info' && (
            <div className="space-y-4 text-gray-800 max-w-xl mx-auto">
              <p>
                <strong>Nombre:</strong> {usuario.nombre_completo}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>DNI:</strong> {usuario.documentacion}
              </p>
              <p>
                <strong>Domicilio:</strong> {usuario.domicilio}
              </p>
              <p>
                <strong>Suscripción activa:</strong>{' '}
                {usuario.suscripcion_id ? 'Sí' : 'Ninguna'}
              </p>
            </div>
          )}

          {tab === 'suscripcion' && (
            <div className="max-w-xl mx-auto space-y-6 text-gray-800">
              {usuario.suscripcion_id ? (
                <>
                  <p>
                    <strong>Fecha de inicio:</strong>{' '}
                    {new Date(usuario.suscripcion_id.fecha_inicio).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fecha final:</strong>{' '}
                    {new Date(usuario.suscripcion_id.fecha_fin).toLocaleDateString()} (
                    {diasRestantes} días restantes)
                  </p>
                  <button
                    onClick={() => setModalVisible(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Dar de baja mi suscripción
                  </button>
                </>
              ) : (
                <p>No tienes ninguna suscripción activa actualmente.</p>
              )}
            </div>
          )}

          {tab === 'contrasena' && (
            <form onSubmit={cambiarContrasena} className="max-w-md mx-auto space-y-4 text-gray-800">
              <div>
                <label className="block font-semibold">Contraseña actual</label>
                <input
                  type="password"
                  value={actualPass}
                  onChange={(e) => setActualPass(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Nueva contraseña</label>
                <input
                  type="password"
                  value={nuevaPass}
                  onChange={(e) => setNuevaPass(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                disabled={cambiandoPass}
                className="bg-[#41A510] text-white px-4 py-2 rounded hover:bg-[#3B940E] transition cursor-pointer"
              >
                {cambiandoPass ? 'Actualizando...' : 'Actualizar contraseña'}
              </button>
              {mensajePass && (
                <p className="text-sm mt-2 text-center text-gray-700">{mensajePass}</p>
              )}
            </form>
          )}

          {tab === 'historial' && (
            <div className="space-y-8 max-w-3xl mx-auto text-gray-800">
              <div>
                <h3 className="text-xl font-semibold mb-2">Compras</h3>
                {usuario.compras.length > 0 ? (
                  <ul className="space-y-2">
                    {usuario.compras.map((compra) => (
                      <li
                        key={compra.id}
                        className="flex justify-between border-b border-gray-200 py-2"
                      >
                        <span>{compra.producto}</span>
                        <span>{new Date(compra.fecha).toLocaleDateString()}</span>
                        <span>{compra.coste.toFixed(2)} €</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay compras registradas.</p>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Inscripciones</h3>
                {usuario.inscripciones.length > 0 ? (
                  <ul className="space-y-4">
                    {usuario.inscripciones.map((inscripcion) => (
                      <li
                        key={inscripcion.id}
                        className="flex items-center space-x-4 border-b border-gray-200 pb-2"
                      >
                        <img
                          src={inscripcion.clase.imagen_url}
                          alt={inscripcion.clase.nombre}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{inscripcion.clase.nombre}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(inscripcion.fecha).toLocaleDateString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay inscripciones registradas.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-gray-800">
            <h2 className="text-lg font-semibold mb-4">
              ¿Estás seguro de que quieres dar de baja la suscripción que tienes activa?
            </h2>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={cancelarSuscripcion}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Confirmar cancelación
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}