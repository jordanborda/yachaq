'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function AuthForm() {
  const supabase = createClient()

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Acceso a Yachaq
      </h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'github']}
        redirectTo={`${window.location.origin}/dashboard`}
        showLinks={false}
        view="sign_in"
        localization={{
          variables: {
            sign_in: {
              email_label: 'Correo electrónico',
              password_label: 'Contraseña',
              email_input_placeholder: 'Tu correo electrónico',
              password_input_placeholder: 'Tu contraseña',
              button_label: 'Iniciar sesión',
              loading_button_label: 'Iniciando sesión...',
              social_provider_text: 'Continuar con {{provider}}',
              link_text: '¿Ya tienes una cuenta? Inicia sesión',
            },
            sign_up: {
              email_label: 'Correo electrónico',
              password_label: 'Contraseña',
              email_input_placeholder: 'Tu correo electrónico',
              password_input_placeholder: 'Tu contraseña',
              button_label: 'Registrarse',
              loading_button_label: 'Registrándose...',
              social_provider_text: 'Continuar con {{provider}}',
              link_text: '¿No tienes una cuenta? Regístrate',
            },
          },
        }}
      />
    </div>
  )
}