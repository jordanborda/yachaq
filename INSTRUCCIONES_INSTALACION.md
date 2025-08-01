# 🚀 Instrucciones de Instalación - Yachaq Platform

## ⚠️ IMPORTANTE: Aplicar Esquema de Base de Datos

La plataforma Yachaq está completamente configurada, pero necesitas aplicar el esquema de base de datos en Supabase para que funcione correctamente.

## 📋 Pasos para Aplicar el Esquema SQL

### Opción 1: Dashboard de Supabase (Recomendado)

1. **Abrir Dashboard de Supabase**
   - Ve a: https://supabase.com/dashboard
   - Accede a tu proyecto: `hknvtplucxlpbvkldhhu`

2. **Habilitar Branching 2.0** (si no está habilitado)
   - Haz clic en tu ícono de usuario (esquina superior derecha)
   - Selecciona "Branching 2.0"
   - Haz clic en "Enable feature"

3. **Crear Branch de Desarrollo**
   - Haz clic en las flechas junto al nombre del proyecto (menú superior)
   - Haz clic en "Create branch"
   - Nombra el branch: `development`
   - Confirma la creación (acepta los costos asociados)

4. **Cambiar al Branch de Desarrollo**
   - Usa el selector de branch para cambiar a `development`

5. **Aplicar el Esquema**
   - Ve a "SQL Editor" en el menú lateral
   - Abre el archivo: `database/schema.sql`
   - Copia TODO el contenido del archivo
   - Pega el contenido en el editor SQL
   - Haz clic en "Run" para ejecutar

### Opción 2: Aplicar Directamente en Main (Solo para Desarrollo)

Si este es un proyecto nuevo sin datos de producción:

1. **Ir al Editor SQL**
   - Ve a: https://supabase.com/dashboard/project/hknvtplucxlpbvkldhhu/sql/new
   
2. **Aplicar Esquema**
   - Copia el contenido completo de `database/schema.sql`
   - Pega en el editor
   - Ejecuta el script

## 🔧 Después de Aplicar el Esquema

### 1. Generar Tipos TypeScript Actualizados

```bash
# En el terminal del proyecto
pnpm add -D supabase
npx supabase gen types typescript --project-id hknvtplucxlpbvkldhhu > lib/supabase/types.ts
```

### 2. Configurar Autenticación

1. Ve a **Authentication > Settings** en Supabase
2. Configura los providers que desees:
   - **Google**: Sigue la guía de Supabase para obtener Client ID y Secret
   - **GitHub**: Configura OAuth App en GitHub
   - **Email**: Ya está habilitado por defecto

3. **URLs de Redirección**:
   - Desarrollo: `http://localhost:3000/auth/callback`
   - Producción: `https://tu-dominio.com/auth/callback`

### 3. Verificar Políticas RLS

Las políticas de Row Level Security ya están incluidas en el esquema, pero verifica que estén activas:

- Ve a **Table Editor** en Supabase
- Selecciona cada tabla
- Verifica que "Row Level Security" esté habilitado

## 🧪 Probar la Aplicación

1. **Iniciar el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```

2. **Acceder a la aplicación**:
   - URL: http://localhost:3000
   - Regístrate o inicia sesión
   - Explora las funcionalidades

## 📊 Estructura de la Base de Datos Aplicada

Una vez aplicado el esquema, tendrás las siguientes tablas:

### Tablas Principales:
- `profiles` - Perfiles de usuario
- `courses` - Cursos disponibles
- `lessons` - Lecciones de cada curso
- `enrollments` - Inscripciones de estudiantes
- `lesson_progress` - Progreso en lecciones

### Sistema de IA:
- `ai_agents` - Agentes de IA disponibles
- `chat_sessions` - Sesiones de chat
- `chat_messages` - Mensajes del chat

### Aula Virtual:
- `virtual_sessions` - Sesiones de clase virtual
- `session_participants` - Participantes en sesiones

### Evaluaciones:
- `assignments` - Tareas y asignaciones
- `assignment_submissions` - Entregas de tareas

## 🔐 Seguridad Implementada

- **Row Level Security (RLS)** en todas las tablas
- **Políticas de acceso** específicas por rol
- **Autenticación robusta** con Supabase Auth
- **Tipos enumerados** para consistencia de datos

## 🚨 Solución de Problemas

### Error: "relation does not exist"
- **Causa**: El esquema no se ha aplicado correctamente
- **Solución**: Re-ejecuta el script SQL completo

### Error de autenticación
- **Causa**: Configuración incorrecta de providers
- **Solución**: Verifica las URLs de redirección y las claves API

### Error de permisos RLS
- **Causa**: Políticas de seguridad muy restrictivas
- **Solución**: Verifica que el usuario esté autenticado correctamente

## 📞 Soporte

Si encuentras algún problema:

1. Verifica que el esquema SQL se aplicó completamente
2. Revisa los logs de Supabase en la sección "Logs"
3. Comprueba que todas las variables de entorno estén configuradas
4. Asegúrate de que la autenticación esté funcionando

## ✅ Lista de Verificación

- [ ] Esquema SQL aplicado en Supabase
- [ ] Tipos TypeScript generados
- [ ] Autenticación configurada
- [ ] Variables de entorno configuradas
- [ ] Aplicación ejecutándose sin errores
- [ ] Registro/Login funcionando
- [ ] Dashboard accesible
- [ ] Páginas de cursos, chat IA y aula virtual funcionando

Una vez completados estos pasos, tu plataforma educativa Yachaq estará completamente funcional! 🎉