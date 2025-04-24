import React from 'react';
import { PageProps, User } from '@/types';
import { Link } from '@inertiajs/react';
interface Props extends PageProps {
    usuarios: User[];
}

const Index: React.FC<Props> = ({ usuarios }) => {


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>

            <div className="mb-4">

                <Link
                    href="/admin/usuarios/crear"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Crear Usuario
                </Link>
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
                                        href={`/admin/usuarios/${u.id}/eliminar`}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Eliminar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
