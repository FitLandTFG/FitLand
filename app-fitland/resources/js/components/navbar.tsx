import AppLogo from './app-logo';
import { Link, usePage } from '@inertiajs/react';
import { User } from '@/types';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { auth } = usePage<{ auth: { user: User } }>().props;
  const user = auth.user;
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="h-22 bg-[#222222] text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-6">
        {user?.roles === 'admin' && (
          <a
            href="/admin"
            className="text-lg px-5 py-2 hover:underline"
          >
            Panel de administración
          </a>
        )}
      </div>

      <div className="absolute right-1/2 transform -translate-x-1/2">
        <Link href="/dashboard">
          <AppLogo />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/clases" className="text-lg px-5 py-2 hover:underline">Clases</Link>
        <Link href="/inscripciones" className="text-lg px-5 py-2 hover:underline">Inscripciones</Link>
        <Link href="/tienda" className="text-lg px-5 py-2 hover:underline">Tienda</Link>
        <Link href="/carrito" className="text-lg px-5 py-2 hover:underline">Carrito</Link>

        {user ? (
          <div className="relative" ref={menuRef}>
            <button onClick={() => setOpen(!open)} className="focus:outline-none cursor-pointer">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-13 h-13 rounded-full border object-cover"
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                <Link
                  href="/ajustes"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
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
