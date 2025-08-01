import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'

export function useProfileSync() {
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (!user) return

    const syncProfile = async () => {
      try {
        // Verificar si el perfil ya existe
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single()

        if (!existingProfile) {
          // Crear perfil automáticamente
          const { error } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email || '',
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
              avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
              role: 'student'
            })

          if (error) {
            console.error('Error creando perfil:', error.message)
          } else {
            console.log('Perfil creado exitosamente')
          }
        }
      } catch (error) {
        console.error('Error sincronizando perfil:', error)
      }
    }

    syncProfile()
  }, [user, supabase])
}