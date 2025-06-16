<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    public function __invoke(Request $request): Response|RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('inicio', absolute: false));
        }

        if (! $request->session()->has('verification_sent')) {
            $request->user()->sendEmailVerificationNotification();
            $request->session()->put('verification_sent', true);
        }

        return Inertia::render('auth/verify-email', [
            'status' => 'verification-link-sent',
        ]);
    }
}
