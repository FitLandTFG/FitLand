import AppLogo from './app-logo';
import { Link, usePage } from '@inertiajs/react';
import { User } from '@/types';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { auth } = usePage<{ auth: { user: User } }>().props;
  const user = auth.user;

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCarrito, setOpenCarrito] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const carritoRef = useRef<HTMLDivElement>(null);

  const [carrito, setCarrito] = useState<{ id: number; nombre: string; cantidad: number; precio: number }[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setOpenUserMenu(false);
      }
      if (carritoRef.current && !carritoRef.current.contains(event.target as Node)) {
        setOpenCarrito(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (openCarrito) {
      fetch('/carrito/obtener')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => setCarrito(data.items))
        .catch(error => {
          console.error('Error al cargar el carrito:', error);
        });
    }
  }, [openCarrito]);

  return (
    <nav className="h-22 bg-[#222222] text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-6">
        {user?.roles === 'admin' && (
          <a href="/admin" className="text-lg px-5 py-2 hover:underline">
            Panel de administración
          </a>
        )}
      </div>

      <div className="absolute right-1/2 transform -translate-x-1/2">
        <Link href="/">
          <AppLogo />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/clases" className="text-lg px-5 py-2 hover:underline">Clases</Link>
        <Link href="/inscripciones" className="text-lg px-5 py-2 hover:underline">Inscripciones</Link>
        <Link href="/tienda" className="text-lg px-5 py-2 hover:underline">Tienda</Link>

        {/* Carrito (solo si el usuario ha iniciado sesión) */}
        {user && (
          <div className="relative" ref={carritoRef}>
            <button
              onClick={() => setOpenCarrito(!openCarrito)}
              className="text-lg px-5 py-2 hover:underline"
            >
              Carrito
            </button>

            {openCarrito && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded shadow-lg z-50 p-4">
                {carrito.length === 0 ? (
                  <p className="text-center text-gray-600">No hay productos en el carrito.</p>
                ) : (
                  <ul>
                    {carrito.map((producto) => (
                      <li key={producto.id} className="flex justify-between items-center border-b py-2">
                        <div>
                          <p className="font-semibold">{producto.nombre}</p>
                          <p className="text-sm text-gray-600">Cantidad: {producto.cantidad}</p>
                        </div>
                        <p>{(producto.precio * producto.cantidad).toFixed(2)} €</p>
                      </li>
                    ))}
                    <div className="mt-2 text-right font-bold">
                      Total: {carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2)} €
                    </div>
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {/* Usuario */}
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setOpenUserMenu(!openUserMenu)} className="focus:outline-none cursor-pointer">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-13 h-13 rounded-full border object-cover"
              />
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                <Link href="/ajustes" className="block px-4 py-2 hover:bg-gray-100">
                  Ajustes
                </Link>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Cerrar sesión
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="text-lg px-5 py-2 hover:underline">Iniciar sesión</Link>
            <Link href="/register" className="text-lg px-5 py-2 hover:underline">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
