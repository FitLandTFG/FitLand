import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import Navbar from '@/components/navbar';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Navbar />

            <AuthLayout
                title="He olvidado mi contraseña"
                description="Introduce tu email para enviar un correo para reestablecer la contraseña"
            >
                <Head title="He olvidado mi contraseña" />

                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <div className="space-y-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Correo electrónico"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="my-6 flex items-center justify-start">
                            <Button className="w-full" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Enviar email para recuperar contraseña
                            </Button>
                        </div>
                    </form>

                    <div className="text-muted-foreground space-x-1 text-center text-sm">
                        <span>O volver a</span>
                        <TextLink href={route('login')}>iniciar sesión</TextLink>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
