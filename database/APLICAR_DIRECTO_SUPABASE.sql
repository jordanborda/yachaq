-- =========================================================
-- YACHAQ - ESQUEMA PARA APLICAR DIRECTAMENTE EN SUPABASE
-- =========================================================
-- INSTRUCCIONES:
-- 1. Ve a: https://supabase.com/dashboard/project/hknvtplucxlpbvkldhhu/sql/new
-- 2. Copia TODO este contenido
-- 3. Pega en el editor SQL
-- 4. Haz clic en "Run" para ejecutar
-- =========================================================

-- Crear tipos enumerados
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'dropped');

-- Tabla de perfiles de usuario
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'student',
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de cursos
CREATE TABLE courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    status course_status DEFAULT 'draft',
    price DECIMAL(10,2) DEFAULT 0,
    duration_weeks INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de lecciones
CREATE TABLE lessons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    video_url TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(course_id, order_index)
);

-- Tabla de inscripciones
CREATE TABLE enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    status enrollment_status DEFAULT 'active',
    progress DECIMAL(3,2) DEFAULT 0,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(student_id, course_id)
);

-- Tabla de progreso de lecciones
CREATE TABLE lesson_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completion_time TIMESTAMP WITH TIME ZONE,
    time_spent_minutes INTEGER DEFAULT 0,
    UNIQUE(student_id, lesson_id)
);

-- Tabla de agentes IA
CREATE TABLE ai_agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    system_prompt TEXT NOT NULL,
    model_name TEXT NOT NULL DEFAULT 'claude-3-sonnet',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de sesiones de chat
CREATE TABLE chat_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    agent_id UUID REFERENCES ai_agents(id) ON DELETE CASCADE NOT NULL,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mensajes de chat
CREATE TABLE chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de tareas/asignaciones
CREATE TABLE assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    max_score INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de entregas de tareas
CREATE TABLE assignment_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    file_url TEXT,
    score INTEGER,
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    graded_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(assignment_id, student_id)
);

-- Tabla de sesiones virtuales
CREATE TABLE virtual_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    max_participants INTEGER DEFAULT 50,
    meeting_url TEXT,
    recording_url TEXT,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de participantes en sesiones
CREATE TABLE session_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES virtual_sessions(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE,
    left_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(session_id, student_id)
);

-- =========================================================
-- HABILITAR ROW LEVEL SECURITY
-- =========================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtual_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- =========================================================

-- Perfiles: usuarios pueden ver y editar su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Cursos: públicamente visibles los publicados
CREATE POLICY "Published courses are viewable by everyone" ON courses
    FOR SELECT USING (status = 'published');

CREATE POLICY "Instructors can manage their courses" ON courses
    FOR ALL USING (auth.uid() = instructor_id);

-- Lecciones: accesibles a estudiantes inscritos
CREATE POLICY "Lessons viewable by enrolled students" ON lessons
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM enrollments 
            WHERE course_id = lessons.course_id 
            AND student_id = auth.uid()
        )
    );

-- Inscripciones: usuarios ven sus propias inscripciones
CREATE POLICY "Users can view own enrollments" ON enrollments
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Users can create own enrollments" ON enrollments
    FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Progreso de lecciones: usuarios ven su propio progreso
CREATE POLICY "Users can view own lesson progress" ON lesson_progress
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Users can update own lesson progress" ON lesson_progress
    FOR ALL USING (auth.uid() = student_id);

-- Agentes IA: visibles para todos los usuarios autenticados
CREATE POLICY "AI agents are viewable by authenticated users" ON ai_agents
    FOR SELECT USING (auth.role() = 'authenticated');

-- Chat: usuarios ven sus propias sesiones
CREATE POLICY "Users can view own chat sessions" ON chat_sessions
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Users can create own chat sessions" ON chat_sessions
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can view messages from own sessions" ON chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM chat_sessions 
            WHERE id = chat_messages.session_id 
            AND student_id = auth.uid()
        )
    );

CREATE POLICY "Users can create messages in own sessions" ON chat_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM chat_sessions 
            WHERE id = chat_messages.session_id 
            AND student_id = auth.uid()
        )
    );

-- Sesiones virtuales: visibles para usuarios inscritos
CREATE POLICY "Virtual sessions viewable by enrolled students" ON virtual_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM enrollments 
            WHERE course_id = virtual_sessions.course_id 
            AND student_id = auth.uid()
        )
    );

-- =========================================================
-- TRIGGERS PARA UPDATED_AT
-- =========================================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at 
    BEFORE UPDATE ON courses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at 
    BEFORE UPDATE ON lessons 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at 
    BEFORE UPDATE ON chat_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================
-- DATOS INICIALES
-- =========================================================

-- Insertar agente IA por defecto
INSERT INTO ai_agents (name, description, system_prompt, model_name) VALUES 
(
    'Asistente Educativo Yachaq',
    'Agente IA especializado en educación y apoyo académico',
    'Eres un asistente educativo experto que ayuda a estudiantes con sus dudas académicas. Eres paciente, claro en tus explicaciones y siempre buscas adaptar tu respuesta al nivel del estudiante. Respondes en español y utilizas ejemplos prácticos.',
    'claude-3-sonnet'
);

-- =========================================================
-- ¡LISTO! 
-- =========================================================
-- Una vez ejecutado este script:
-- 1. Ve a Authentication > Settings para configurar providers
-- 2. Tu aplicación Next.js ya estará completamente funcional
-- 3. Podrás registrar usuarios y usar todas las funcionalidades