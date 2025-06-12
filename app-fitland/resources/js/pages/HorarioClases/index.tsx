import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import type { PageProps } from '@/types';

const diasSemana: Record<string, string> = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};

const coloresClase: Record<string, string> = {
  Zumba: 'bg-pink-500',
  Pilates: 'bg-green-500',
  GAP: 'bg-yellow-500',
  HIIT: 'bg-red-500',
  'Full Body Workout': 'bg-indigo-500',
  'Cardio Dance': 'bg-orange-400',
  Yoga: 'bg-purple-500',
  'Entrenamiento Funcional': 'bg-emerald-500',
  Boxeo: 'bg-blue-500',
  Kickboxing: 'bg-rose-500',
};

type Clase = {
  id: number;
  nombre: string;
  horario: string;
  hora: string;
  dia: string;
  aforo: number;
  inscritos: number;
};

function formatearRango(fechaInicio: string, fechaFin: string) {
  const f1 = new Date(fechaInicio);
  const f2 = new Date(fechaFin);
  const diaInicio = f1.getDate();
  const diaFin = f2.getDate();
  const mes = f1.toLocaleDateString('es-ES', { month: 'long' });
  const año = f1.getFullYear();
  return `Del ${diaInicio} al ${diaFin} de ${mes} de ${año}`;
}

export default function HorarioClases() {
  const { clases, inicio, fin, auth } = usePage<PageProps & {
    clases: Clase[];
    inicio: string;
    fin: string;
  }>().props;

  const estaLogueado = !!auth.user;

  return (
    <>
      <Navbar />
      <Head title="Clases" />

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#41A510]">Clases</h2>
          <div className="max-w-3xl mx-auto bg-[#F0FDF4] border border-[#41A510] rounded-lg p-4 mb-6 flex flex-col items-center text-center shadow-sm space-y-3">
            <div className="flex gap-2">
              <img src="/images/Planes suscripciones/Gold.png" alt="Icono Gold" className="w-12 h-12" />
              <img src="/images/Planes suscripciones/Diamond.png" alt="Icono Diamond" className="w-12 h-12" />
            </div>
            <p className="text-lg font-medium text-gray-700">
              <span className="text-[#41A510] font-semibold">¿Tienes una suscripción Gold o Diamond?</span> Disfruta de acceso <strong>ilimitado</strong> a todas nuestras clases y actividades del gimnasio. ¡Entrena sin límites!
            </p>
          </div>
          <p className="mb-8">Explora todas nuestras clases y actividades disponibles:</p>

          <div className="grid gap-12">
            {[
              {
                titulo: 'Artes marciales',
                descripcion: 'Variedad de artes marciales desde los más completos físicamente, hasta los más enfocados:',
                actividades: [
                  ['Boxeo.jpg', 'Boxeo'],
                  ['Jiu Jitsu.jpg', 'Jiu Jitsu'],
                  ['Judo.jpg', 'Judo'],
                  ['Kickboxing.png', 'Kickboxing'],
                  ['Muay thai.jpg', 'Muay Thai'],
                  ['MMA.jpg', 'MMA'],
                ],
              },
              {
                titulo: 'Varias',
                descripcion: 'Desde ejercicios dirigidos a estiramiento, equilibrio, aeróbico, hasta ejercicios intensivos de fuerza o libres:',
                actividades: [
                  ['Full Body Workout.jpg', 'Full Body Workout'],
                  ['Cardio dance.jpg', 'Cardio dance'],
                  ['Entrenamiento funcional.png', 'Entrenamiento funcional'],
                  ['GAP.jpg', 'GAP'],
                  ['HIIT.jpg', 'HIIT'],
                  ['Pilates.png', 'Pilates'],
                  ['Stretching.jpg', 'Stretching'],
                  ['Zumba.png', 'Zumba'],
                ],
              },
            ].map(({ titulo, descripcion, actividades }) => (
              <div key={titulo} className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2 text-[#41A510]">{titulo}</h3>
                <p className="mb-4 text-gray-600">{descripcion}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {actividades.map(([img, nombre]) => (
                    <div
                      key={nombre}
                      className="w-48 bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-xl cursor-pointer group"
                    >
                      <div className="overflow-hidden h-32">
                        <img
                          src={`/images/Clases/${img}`}
                          alt={nombre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 flex flex-col items-center">
                        <h4 className="font-semibold text-[#41A510] text-center mb-1">{nombre}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {formatearRango(inicio, fin)}
          </h2>
          <div className="grid grid-cols-8 gap-px text-sm rounded overflow-hidden">
            <div className="p-3 text-center text-lg" />
            {Object.values(diasSemana).map((dia) => (
              <div
                key={dia}
                className="p-3 font-bold text-center text-white text-lg border border-gray-300"
                style={{ backgroundColor: '#7DD625' }}
              >
                {dia}
              </div>
            ))}

            {Array.from({ length: 16 }).map((_, index) => {
              const hora = `${(6 + index).toString().padStart(2, '0')}:00`;
              return (
                <React.Fragment key={hora}>
                  <div
                    className="text-center font-semibold flex items-center justify-center text-lg border border-gray-300"
                    style={{ backgroundColor: '#7DD625', color: '#FFFFFF', height: '5rem' }}
                  >
                    {hora}
                  </div>
                  {Object.keys(diasSemana).map((diaIng) => {
                    const clase = clases.find((c) => {
                      const [horaClase] = c.hora.split(':').map(Number);
                      return c.dia === diaIng && horaClase === parseInt(hora);
                    });
                    return (
                      <div key={diaIng + hora} className="bg-white h-20 p-1 border border-gray-300">
                        {clase && (
                          <div
                            onClick={() => {
                              window.location.href = estaLogueado ? '/inscribirse' : '/login';
                            }}
                            className={`
                              ${coloresClase[clase.nombre] || 'bg-gray-500'}
                              text-white rounded-md h-full w-full flex flex-col justify-center items-center text-center px-2 py-2
                              shadow-sm hover:shadow-lg hover:brightness-110 transition duration-200 cursor-pointer
                            `}
                          >
                            <div className="font-semibold text-sm leading-snug">{clase.nombre}</div>
                            <div className="text-xs mt-1">
                              {clase.hora} - {clase.aforo - clase.inscritos} de {clase.aforo} plazas
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
