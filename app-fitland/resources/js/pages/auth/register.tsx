import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    nombre_completo: string;
    documentacion: string;
    domicilio: string,
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        nombre_completo: '',
        documentacion: '',
        domicilio: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Crear una cuenta" description="Introduce tus datos para crear una cuenta">
            <Head title="Registro" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nombre_completo">Nombre y apellidos</Label>
                        <Input
                            id="nombre_completo"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="nombre_completo"
                            value={data.nombre_completo}
                            onChange={(e) => setData('nombre_completo', e.target.value)}
                            disabled={processing}
                            placeholder="Nombre y apellidos"
                        />
                        <InputError message={errors.nombre_completo} className="mt-2"/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="documentacion">Documentación</Label>
                        <Input
                            id="documentacion"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="documentacion"
                            value={data.documentacion}
                            onChange={(e) => setData('documentacion', e.target.value)}
                            disabled={processing}
                            placeholder="DNI/NIE"
                        />
                        <InputError message={errors.documentacion} className="mt-2"/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="domicilio">Domicilio</Label>
                        <Input
                            id="domicilio"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="domicilio"
                            value={data.domicilio}
                            onChange={(e) => setData('domicilio', e.target.value)}
                            disabled={processing}
                            placeholder="Domicilio"
                        />
                        <InputError message={errors.domicilio} className="mt-2"/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="correoelectronico@ejemplo.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Contraseña"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmar contraseña"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Crear cuenta
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    ¿Ya tienes una cuenta?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Iniciar sesión
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
