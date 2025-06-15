import React, { useState, useRef, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

interface Suscripcion {
  fecha_inicio: string;
  fecha_fin: string;
  plan: {
    nombre: string;
  };
}

interface Compra {
  id: number;
  fecha: string;
  productos: {
    nombre: string;
    imagen_url: string | null;
    precio: number;
    cantidad: number;
  }[];
  pago: {
    monto: number;
  };
}

interface Inscripcion {
  id: number;
  fecha: string;
  clase: {
    nombre: string;
  };
}

interface Usuario {
  id: number;
  nombre_completo: string;
  email: string;
  domicilio: string;
  documentacion: string;
  foto_perfil_url: string;
  suscripcionActiva: Suscripcion | null;
  compras: Compra[];
  inscripciones: Inscripcion[];
}

interface CuentaPageProps extends PageProps {
  usuario: Usuario;
  suscripcionActiva: Suscripcion | null;
  compras: Compra[];
  inscripciones: Inscripcion[];
}


export default function Cuenta() {
  const { usuario, suscripcionActiva, compras, inscripciones } = usePage<CuentaPageProps>().props;

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

  const diasRestantes = suscripcionActiva
    ? Math.max(
      0,
      Math.ceil(
        (new Date(suscripcionActiva.fecha_fin).getTime() - new Date().getTime()) /
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
      window.location.reload();
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
        credentials: 'same-origin',
        body: JSON.stringify({
          contrasena_actual: actualPass,
          nueva_contrasena: nuevaPass,
          nueva_contrasena_confirmation: nuevaPass,
        }),
      });

      if (res.ok) {
        setMensajePass('Contraseña actualizada correctamente.');
        setActualPass('');
        setNuevaPass('');
      } else if (res.status === 422) {
        const data = await res.json();
        const errores = data.errors;
        if (errores?.contrasena_actual) {
          setMensajePass(errores.contrasena_actual.join(' '));
        } else if (errores?.nueva_contrasena) {
          setMensajePass(errores.nueva_contrasena.join(' '));
        } else {
          setMensajePass(data.message || 'Error en la validación. La contraseña actual introducida es incorrecta');
        }
      }
    } catch {
      setMensajePass('Error inesperado al actualizar contraseña.');
    } finally {
      setCambiandoPass(false);
    }
  };

  return (
    <AppLayout>
      <Head title="Mi cuenta" />
      <div className="max-w-5xl mx-auto p-6 text-gray-900">
        <div className="flex justify-center mb-12">
          <div
            className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer group ring-4 ring-[#41A510]/30 shadow-lg transition"
            onClick={triggerInputFile}
          >
            <img
                    src={fotoPreview}
                    alt={
                        fotoPreview.includes('/images/defaults/avatar.jpg')
                        ? 'Avatar por defecto'
                        : `Foto de perfil de ${usuario.nombre_completo}`
                    }
                    className={`object-cover w-full h-full ${subiendoFoto ? 'opacity-60' : ''} transition duration-300`}
                    draggable={false}
                    />

            <div className="absolute inset-0 bg-white bg-opacity-30 opacity-0 group-hover:opacity-60 flex items-center justify-center transition duration-300">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
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

        <nav className="flex justify-center space-x-10 mb-12 border-b border-gray-200">
          {['info', 'suscripcion', 'contrasena', 'historial'].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item as typeof tab)}
              className={`relative pb-3 text-lg font-semibold transition-all duration-300 cursor-pointer ${tab === item
                  ? 'text-[#41A510] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#41A510]'
                  : 'text-gray-500 hover:text-[#41A510]'
                }`}
            >
              {{
                info: 'Información',
                suscripcion: 'Suscripción',
                contrasena: 'Contraseña',
                historial: 'Historial'
              }[item]}
            </button>
          ))}
        </nav>

        <div>
          {tab === 'info' && (
            <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-xl mx-auto border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-600">Nombre:</span>
                <span>{usuario.nombre_completo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-600">Email:</span>
                <span>{usuario.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-600">DNI:</span>
                <span>{usuario.documentacion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-600">Domicilio:</span>
                <span>{usuario.domicilio}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-600">Suscripción activa:</span>
                <span className={`font-bold ${suscripcionActiva ? 'text-[#41A510]' : 'text-gray-400'}`}>
                  {suscripcionActiva ? 'Sí' : 'Ninguna'}
                </span>
              </div>
            </div>
          )}

          {tab === 'suscripcion' && (
            <div className="max-w-xl mx-auto text-gray-800">
              {suscripcionActiva ? (
                <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold text-[#41A510]">
                      {suscripcionActiva.plan.nombre}
                    </p>
                    <span className="text-sm bg-[#41A510]/10 text-[#41A510] px-3 py-1 rounded-full">
                      Activa
                    </span>
                  </div>
                  <p>
                    <strong>Inicio:</strong> {new Date(suscripcionActiva.fecha_inicio).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Finaliza:</strong> {new Date(suscripcionActiva.fecha_fin).toLocaleDateString()}
                    <span className="text-sm text-gray-500 ml-2">
                      ({diasRestantes} días restantes)
                    </span>
                  </p>
                  <button
                    onClick={() => setModalVisible(true)}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition cursor-pointer"
                  >
                    Cancelar suscripción
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  No tienes ninguna suscripción activa.
                </div>
              )}
            </div>
          )}

          {tab === 'contrasena' && (
            <form onSubmit={cambiarContrasena} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-xl shadow border border-gray-200">
              <div>
                <label className="block font-medium mb-1 text-gray-700">Contraseña actual</label>
                <input
                  type="password"
                  value={actualPass}
                  onChange={(e) => setActualPass(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#41A510]/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Nueva contraseña</label>
                <input
                  type="password"
                  value={nuevaPass}
                  onChange={(e) => setNuevaPass(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#41A510]/50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={cambiandoPass}
                className="w-full bg-[#41A510] text-white py-2 rounded hover:bg-[#3B940E] transition cursor-pointer"
              >
                {cambiandoPass ? 'Actualizando...' : 'Actualizar contraseña'}
              </button>
              {mensajePass && (
                <p className={`text-sm mt-2 text-center ${mensajePass.includes('correctamente') ? 'text-green-600' : 'text-red-600'}`}>
                  {mensajePass}
                </p>
              )}
            </form>
          )}

          {tab === 'historial' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto text-gray-800">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-6 text-[#41A510]">Compras</h3>
                {compras.length > 0 ? (
                  <ul className="space-y-6">
                    {compras.map((compra) => (
                      <li key={compra.id} className="bg-gray-50 border rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-2">
                          <strong>Fecha:</strong>{' '}
                          {new Date(compra.fecha).toLocaleDateString()}
                        </p>
                        <ul className="divide-y divide-gray-200">
                          {compra.productos.map((producto, index) => (
                            <li key={index} className="flex items-center py-2 gap-3">
                              <img
                                src={producto.imagen_url ?? '/images/productos/producto-generico.png'}
                                alt={producto.nombre}
                                className="w-14 h-14 object-cover border rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{producto.nombre}</p>
                                <p className="text-sm text-gray-500">
                                  {producto.precio.toFixed(2)} € x {producto.cantidad}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <p className="text-right mt-4 font-semibold text-[#41A510]">
                          Total: {compra.pago?.monto?.toFixed(2) ?? '0.00'} €
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No hay compras registradas.</p>
                )}
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-6 text-[#41A510]">Inscripciones</h3>
                {inscripciones.length > 0 ? (
                  <ul className="space-y-6">
                    {inscripciones.map((inscripcion) => (
                      <li
                        key={inscripcion.id}
                        className="bg-gray-50 border rounded-lg p-4 shadow-sm"
                      >
                        <p className="font-medium text-lg">{inscripcion.clase.nombre}</p>
                        <p className="text-sm text-gray-500">
                          Fecha: {new Date(inscripcion.fecha).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No hay inscripciones registradas.</p>
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
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={cancelarSuscripcion}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded cursor-pointer"
              >
                Confirmar cancelación
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
