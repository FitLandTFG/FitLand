import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Inicio',
    href: '/',
  },
];

type PageProps = {
  auth: {
    user: User;
  };
};

export default function Inicio() {
  const { auth } = usePage<PageProps>().props;
  const user = auth.user;

  return (
    <AppLayout>
      <Head title="Inicio" />
      <div className="bg-white text-gray-900">
        <section className="w-full max-w-7xl mx-auto mt-6 px-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
            loop={true}
            className="rounded-lg overflow-hidden"
          >
            {[
              '/images/Carrusel/carrusel1.jpg',
              '/images/Carrusel/carrusel2.jpeg',
              '/images/Carrusel/carrusel3.jpg'
            ].map((src, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-[450px] md:h-[550px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="w-full bg-[#41A510] text-white py-20 mt-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              ¡Transforma tu cuerpo con FitLand!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8">
              Únete hoy y entrena en el gimnasio más completo de Madrid.
            </p>
            <a
              href="/suscripciones"
              className="inline-block bg-white text-[#41A510] px-8 py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition"
            >
              Ver planes de suscripción
            </a>
          </div>
        </section>

        <section className="max-w-5xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#41A510]">FitLand</h2>
          <p className="mb-4 text-lg">
            ¡Llegamos a Madrid! Apertura próximamente: Junio 2025.
          </p>
          <p className="mb-4 text-lg">
            Ha llegado el gimnasio con la <b>sala fitness más grande de Madrid</b>. En FitLand encontrarás un espacio de más de 4.000m<sup>2</sup> donde podrás llevar a cabo tu entrenamiento con instalaciones equipadas con <b>lo último en maquinaria, innovación
              y tecnología fitness</b>.
          </p>
          <p className="text-lg">
            FitLand cuenta con <b>diversas actividades dirigidas al mes</b> (pilates, yoga, body pump, tonificación, baile, etc.) y clases virtuales para que entrenes cuando quieras. Zonas de entrenamiento funcional y cross, pesajes gratuitos Inbody,
            sala de recuperación con sauna y pozo de agua fría, además de solárium y grandes vestuarios equipados con taquillas individuales y secadores. Además de salas dirigidas al entrenamiento de artes marciales (boxeo, kickboxing, muay thai, etc.)
            para todas las edades.
          </p>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#41A510] mb-10">Lo que opinan nuestros clientes</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  nombre: 'María López',
                  texto: 'Las clases son geniales y el ambiente muy motivador. ¡Lo recomiendo al 100%!',
                  img: '/images/Opiniones/María López.avif',
                },
                {
                  nombre: 'Carlos Gómez',
                  texto: 'Maquinaria moderna y mucho espacio. Es el mejor gimnasio en el que he estado.',
                  img: '/images/Opiniones/Carlos Gómez.avif',
                },
                {
                  nombre: 'Laura Ruiz',
                  texto: '¡Las artes marciales para niños son una maravilla! Mi hijo está encantado.',
                  img: '/images/Opiniones/Laura Ruiz.avif',
                },
              ].map((t, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <img
                    src={t.img}
                    alt={t.nombre}
                    className="w-20 h-20 mx-auto rounded-full mb-5 object-cover"
                  />
                  <p className="text-sm text-gray-700 italic mb-2">"{t.texto}"</p>
                  <p className="font-semibold">{t.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <h2 className="text-3xl font-bold text-center text-[#41A510] mb-12">Características</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Todo incluido',
                  text: 'Con la mejor relación calidad/precio. Para que puedas sacar tu máximmo potencial',
                  img: '/images/Características/caracteristica1.jpg',
                },
                {
                  title: 'Sin permanencia',
                  text: 'Tú decides cuando vienes y cuando te vas, sin ningún compromiso a que pagues de más.',
                  img: '/images/Características/caracteristica2.jpg',
                },
                {
                  title: 'Innovación y tecnología',
                  text: 'Gran variedad de máquinas y equipo bien equipados para que hasta los días más llenos puedas entrenar.',
                  img: '/images/Características/caracteristica3.jpg',
                },
                {
                  title: 'Múltiples actividades',
                  text: 'Con la mayor oferta y variedad de actividades dirigidas si dispones de la suscripción correspondiente.',
                  img: '/images/Características/caracteristica4.jpg',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl cursor-pointer group"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-114 object-cover transition-transform duration-300 group-hover:brightness-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg text-center font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-center text-gray-700">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </AppLayout>
  );
}
