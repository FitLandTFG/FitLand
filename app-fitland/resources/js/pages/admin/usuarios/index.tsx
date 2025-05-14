import React from 'react';
import { PageProps, User } from '@/types';
import { Link } from '@inertiajs/react';

interface Props extends PageProps {
    usuarios: User[];
    errors: Record<string, string>;
}

const Index: React.FC<Props> = ({ usuarios, errors }) => {


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>

            {errors.general && (
                <div className="mb-4 px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errors.general}
                </div>
                )}
            <div className="mb-4 flex space-x-4">
                <Link
                    href="/admin/usuarios/crear"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Crear Usuario
                </Link>
                <a
                    href="/admin"
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Volver
                </a>
            </div>

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Contraseña</th>
                            <th className="px-4 py-2">DNI/NIF</th>
                            <th className="px-4 py-2">Domicilio</th>
                            <th className="px-4 py-2">Imagen</th>
                            <th className="px-4 py-2">Rol</th>
                            <th className="px-4 py-2">Email Verificado</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => (
                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{u.id}</td>
                                <td className="px-4 py-2">{u.nombre_completo}</td>
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2 break-all text-xs text-gray-700">{u.password}</td>
                                <td className="px-4 py-2">{u.documentacion}</td>
                                <td className="px-4 py-2">{u.domicilio}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={u.imagen}
                                        alt="Imagen"
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                </td>
                                <td className="px-4 py-2 capitalize">{u.roles}</td>
                                <td className="px-4 py-2">{u.email_verified_at ?? 'No verificado'}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <Link
                                        href={`/admin/usuarios/${u.id}/editar`}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </Link>
                                    <Link
                                        as="button"
                                        method="delete"
                                        href={`/admin/usuarios/${u.id}`}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        onClick={(e) => {
                                            if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        Eliminar
                                    </Link>
                                </td>

                            </tr>
                        ))}
                        {usuarios.length === 0 && (
                            <tr>
                                <td colSpan={10} className="text-center text-gray-500 py-4">
                                    No hay usuarios registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
