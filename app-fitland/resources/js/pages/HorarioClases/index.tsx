import React from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';

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
  const { clases, inicio, fin } = usePage().props as unknown as {
    clases: Clase[];
    inicio: string;
    fin: string;
  };

  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#41A510]">Clases</h2>
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
              <div key={titulo}>
                <h3 className="text-2xl font-bold mb-2 text-[#41A510]">{titulo}</h3>
                <p className="mb-4">{descripcion}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {actividades.map(([img, nombre]) => (
                    <div className="card w-48 shadow rounded overflow-hidden" key={nombre}>
                      <img
                        src={`/images/Clases/${img}`}
                        alt={nombre}
                        className="h-32 w-full object-cover"
                      />
                      <div className="p-2">
                        <h4 className="font-bold text-center">{nombre}</h4>
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
                            className={`${coloresClase[clase.nombre] || 'bg-gray-500'} text-white rounded-md h-full w-full flex flex-col justify-center items-center text-center px-2 py-2 shadow-sm hover:shadow-md transition-shadow`}
                          >
                            <div className="font-semibold text-sm leading-snug">{clase.nombre}</div>
                            <div className="text-xs mt-1">{clase.hora} - {clase.aforo} plazas</div>
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
