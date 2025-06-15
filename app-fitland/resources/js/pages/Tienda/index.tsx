import React, { useState, useEffect } from 'react';
import { Head, router, usePage, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import { Info, X } from 'lucide-react';
import type { User, ItemCarrito } from '@/types';


type Producto = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  tipo: string;
  descripcion?: string;
  stock?: number;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type Props = {
  productos: {
    data: Producto[];
    links: PaginationLink[];
  };
  categorias: string[];
  filtros: {
    categoria?: string;
    buscar?: string;
  };
  user: User | null;
  suscripcion: string | null;
};

export default function Tienda({ productos, categorias, filtros, user }: Props) {
  const [buscar, setBuscar] = useState(filtros.buscar || '');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(filtros.categoria || '');


  const { url } = usePage();
  const currentPage = new URLSearchParams(url.split('?')[1] || '').get('page') || 1;

  const aplicarFiltros = (nuevaBusqueda?: string, nuevaCategoria?: string) => {
    router.get(route('tienda.index'), {
      buscar: nuevaBusqueda !== undefined ? nuevaBusqueda : buscar,
      categoria: nuevaCategoria !== undefined ? nuevaCategoria : categoriaSeleccionada,
    }, { preserveState: true });
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(route('tienda.index'), {
        buscar,
        categoria: categoriaSeleccionada,
        page: currentPage,
      }, { preserveState: true });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [buscar, categoriaSeleccionada, currentPage]);

  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setCantidad(1);
  };

  return (
    <>
      <Navbar />
      <Head title="Tienda" />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4">
        <aside className="md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Categorías</h2>
          <ul>
            <li
              className={`cursor-pointer mb-1 ${!categoriaSeleccionada ? 'font-bold' : ''} hover:underline hover:decoration-[#41A510]`}
              onClick={() => {
                setCategoriaSeleccionada('');
                aplicarFiltros(buscar, '');
              }}
            >
              Todas
            </li>
            {categorias.map((categoria) => (
              <li
                key={categoria}
                className={`cursor-pointer mb-1 ${categoriaSeleccionada === categoria ? 'font-bold' : ''} hover:underline hover:decoration-[#41A510]`}
                onClick={() => {
                  setCategoriaSeleccionada(categoria);
                  aplicarFiltros(buscar, categoria);
                }}
              >
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </li>
            ))}
          </ul>
        </aside>

        <main className="md:w-3/4 md:pl-6">
          <div className="mb-4 relative">
            <input
              type="text"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full p-2 pr-10 border rounded"
            />
            {buscar && (
              <button
                type="button"
                onClick={() => setBuscar('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {productos.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productos.data.map((producto) => (
                  <div
                    key={producto.id}
                    className="border p-4 rounded flex flex-col items-center cursor-pointer"
                    onClick={() => setProductoSeleccionado(producto)}
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-80 object-contain"
                    />
                    <h3 className="text-lg font-semibold text-center mt-2">{producto.nombre}</h3>
                    <div className="text-gray-700 mt-2">

                        {producto.precio.toFixed(2)}€

                    </div>

                    <div className="flex space-x-4 mt-2">
                      <Info className="text-white" size={20} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {productos.links.map((link, index) => {
                  const label = link.label
                    .replace(/&laquo;|&raquo;/g, '')
                    .replace('Previous', 'Anterior')
                    .replace('Next', 'Siguiente');

                  return link.url ? (
                    <Link
                      key={index}
                      href={link.url}
                      className={`px-3 py-1 border rounded ${link.active
                        ?
                        'bg-[#41A510] text-white border-[#41A510]'
                        : 'bg-white text-[#41A510] border-[#41A510] hover:bg-[#41A510] hover:text-white'}`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span
                      key={index}
                      className="px-3 py-1 border rounded text-gray-400"
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </>
          ) : (
            <p>No se han encontrado resultados con esa búsqueda.</p>
          )}
        </main>
      </div>

      {productoSeleccionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={cerrarModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
              onClick={() => setProductoSeleccionado(null)}
            >
              ✕
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-full md:w-1/2 h-[28rem] object-contain"
              />
              <div className="flex flex-col flex-1">
                <h2 className="text-3xl font-bold mb-3">{productoSeleccionado.nombre}</h2>
                <p className="text-gray-700 mb-3">{productoSeleccionado.descripcion || 'Sin descripción disponible.'}</p>
                <p className="text-sm text-gray-500 mb-3">Stock disponible: {productoSeleccionado.stock ?? 'N/D'}</p>
                <p className="text-2xl font-semibold mb-4">

                    {productoSeleccionado.precio.toFixed(2)}€

                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0 && val <= (productoSeleccionado.stock ?? val)) {
                        setCantidad(val);
                      }
                    }}
                    className="w-16 text-center border rounded py-1 no-arrows"
                  />
                  <button
                    onClick={() =>
                      setCantidad((prev) =>
                        productoSeleccionado.stock ? Math.min(productoSeleccionado.stock, prev + 1) : prev + 1
                      )
                    }
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (!user) {
                        router.visit('/login');
                        return;
                      }

                      const carritoRaw = localStorage.getItem('carrito');
                      const carrito: ItemCarrito[] = carritoRaw ? JSON.parse(carritoRaw) : [];

                      const index = carrito.findIndex((item) => item.id === productoSeleccionado.id);

                      if (index !== -1) {
                        carrito[index].cantidad += cantidad;
                      } else {
                        carrito.push({
                          id: productoSeleccionado.id,
                          nombre: productoSeleccionado.nombre,
                          precio: productoSeleccionado.precio,
                          imagen: productoSeleccionado.imagen,
                          cantidad: cantidad,
                          stock: productoSeleccionado.stock,
                        });
                      }

                      localStorage.setItem('carrito', JSON.stringify(carrito));
                      window.dispatchEvent(new Event('carritoActualizado'));
                      setProductoSeleccionado(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2 cursor-pointer"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
