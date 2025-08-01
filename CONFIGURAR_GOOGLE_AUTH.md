# 🔐 Configurar Autenticación con Google

## 📋 Pasos para habilitar Google OAuth en Supabase

### 1. Obtener credenciales de Google Cloud Console

1. **Ve a Google Cloud Console**:
   - URL: https://console.cloud.google.com/

2. **Crear/Seleccionar proyecto**:
   - Crea un nuevo proyecto o selecciona uno existente
   - Nombre sugerido: "Yachaq-Education"

3. **Habilitar Google+ API**:
   - Ve a "APIs y servicios" → "Biblioteca"
   - Busca "Google+ API" y habilítala
   - También habilita "Google Identity API"

4. **Crear credenciales OAuth 2.0**:
   - Ve a "APIs y servicios" → "Credenciales"
   - Haz clic en "Crear credenciales" → "ID de cliente de OAuth 2.0"
   - Tipo de aplicación: "Aplicación web"
   - Nombre: "Yachaq Login"

5. **Configurar URLs autorizadas**:
   ```
   Orígenes de JavaScript autorizados:
   - http://localhost:3000
   - https://tu-dominio.com (para producción)
   
   URIs de redirección autorizados:
   - https://hknvtplucxlpbvkldhhu.supabase.co/auth/v1/callback
   ```

6. **Copiar credenciales**:
   - Copia el "Client ID"
   - Copia el "Client Secret"

### 2. Configurar en Supabase Dashboard

1. **Ve a tu proyecto Supabase**:
   - URL: https://supabase.com/dashboard/project/hknvtplucxlpbvkldhhu

2. **Ir a Authentication**:
   - Menú lateral → "Authentication" → "Providers"

3. **Configurar Google Provider**:
   - Busca "Google" en la lista
   - Habilita el toggle
   - Pega el "Client ID" de Google
   - Pega el "Client Secret" de Google
   - Guarda los cambios

### 3. Verificar URLs de redirección

En el dashboard de Supabase, ve a:
- Authentication → Settings → URL Configuration
- Verifica que las siguientes URLs estén configuradas:

```
Site URL: http://localhost:3000
Redirect URLs:
- http://localhost:3000/dashboard
- https://tu-dominio.com/dashboard (para producción)
```

### 4. Probar la autenticación

1. **Ejecuta la aplicación**:
   ```bash
   pnpm dev
   ```

2. **Ve a**: http://localhost:3000

3. **Haz clic en "Continuar con Google"**

4. **Deberías ver**:
   - Redirección a Google
   - Pantalla de autorización de Google
   - Redirección de vuelta a `/dashboard`

## 🚨 Solución de problemas

### Error: "redirect_uri_mismatch"
- **Causa**: La URL de redirección no está configurada correctamente
- **Solución**: Asegúrate de que la URL en Google Cloud Console sea exactamente:
  ```
  https://hknvtplucxlpbvkldhhu.supabase.co/auth/v1/callback
  ```

### Error: "invalid_client"
- **Causa**: Client ID o Client Secret incorrectos
- **Solución**: Verifica que hayas copiado correctamente las credenciales

### Error: "access_denied"
- **Causa**: El usuario canceló la autorización
- **Solución**: Normal, el usuario puede intentar de nuevo

### No redirecciona al dashboard
- **Causa**: URL de redirección incorrecta en Supabase
- **Solución**: Verifica la configuración en Authentication → Settings

## 📝 Ejemplo de credenciales (reemplaza con las tuyas)

```env
# Estas van en tu Google Cloud Console, NO en .env
Client ID: 123456789-abcdefghijk.apps.googleusercontent.com
Client Secret: GOCSPX-abcdefghijklmnopqrstuvwxyz
```

## ✅ Checklist final

- [ ] Proyecto creado en Google Cloud Console
- [ ] Google+ API habilitada
- [ ] Credenciales OAuth 2.0 creadas
- [ ] URLs de redirección configuradas en Google
- [ ] Provider de Google habilitado en Supabase
- [ ] Client ID y Secret configurados en Supabase
- [ ] URLs de redirección configuradas en Supabase
- [ ] Prueba de login exitosa

Una vez completados estos pasos, el botón "Continuar con Google" funcionará perfectamente! 🎉