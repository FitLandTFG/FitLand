import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import Navbar from '@/components/navbar';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Navbar />

            <AuthLayout
                title="Verificar correo electrónico"
                description="Por favor, verifica tu dirección de correo haciendo clic en el enlace que te hemos enviado."
            >
                <Head title="Verificación de correo" />

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        Se ha enviado un nuevo enlace de verificación al correo que proporcionaste durante el registro.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6 text-center">
                    <Button disabled={processing} variant="secondary">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Reenviar correo de verificación
                    </Button>

                    <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                        Cerrar sesión
                    </TextLink>
                </form>
            </AuthLayout>
        </>
    );
}
