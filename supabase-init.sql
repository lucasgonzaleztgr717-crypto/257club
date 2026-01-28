-- Migration para crear tablas en Supabase
-- Autor: Z.ai Code
-- Fecha: 20/01/2025

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'CLIENT',
  password_hash TEXT,
  last_sign_in_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  goal TEXT,
  pain_points TEXT,
  commitment INTEGER,
  source TEXT DEFAULT 'WEBSITE',
  status TEXT DEFAULT 'NEW',
  notes JSONB,
  last_contacted_at TIMESTAMP,
  follow_up_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID NOT NULL REFERENCES users(id),
  date_of_birth DATE,
  gender TEXT,
  height REAL,
  weight REAL,
  body_fat REAL,
  activity_level TEXT,
  primary_goal TEXT,
  goal_description TEXT,
  injuries JSONB,
  limitations TEXT,
  equipment JSONB,
  preferred_days JSONB,
  preferred_time TEXT,
  workout_frequency INTEGER,
  workout_duration INTEGER,
  status TEXT DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  coach_notes TEXT,
  mindset_notes TEXT,
  nutrition_notes TEXT
);

CREATE TABLE IF NOT EXISTS coaches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  specialization TEXT,
  bio TEXT,
  certifications JSONB,
  years_experience INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS nutritionists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  specialization TEXT,
  bio TEXT,
  certifications JSONB,
  license_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mindset_coaches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  specialization TEXT,
  bio TEXT,
  certifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  clients_assigned JSONB  -- IDs de clientes asignados
);

-- ============================================
-- TABLAS DE ENTRENAMIENTOS
-- ============================================

CREATE TABLE IF NOT EXISTS workout_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  coach_id UUID REFERENCES coaches(id),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,  -- 'STRENGTH', 'HYPERTROPHY', 'ENDURANCE', 'ZONE_2', 'MOBILITY', 'FULL_BODY', 'UPPER_BODY', 'LOWER_BODY', 'HIIT', 'FUNCTIONAL'
  difficulty TEXT NOT NULL, -- 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'
  weeks INTEGER DEFAULT 4,
  workouts_per_week INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES workout_plans(id),
  week INTEGER NOT NULL,
  day INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  duration INTEGER,  -- minutos
  rest_between_sets INTEGER,  -- segundos
  exercises JSONB,  -- [{exerciseId, sets, reps, weight, rest, notes}]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,  -- 'chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'cardio', 'mobility'
  muscle_groups JSONB,
  equipment TEXT,  -- 'barbell', 'dumbbell', 'machine', 'bodyweight', 'none'
  difficulty TEXT,
  description TEXT,
  video_url TEXT,
  image_url TEXT,
  is_compound BOOLEAN DEFAULT false,
  instructions JSONB,  -- [{step, description}]
  common_mistakes JSONB,  -- [{mistake, correction}]
  modifications JSONB,  -- alternatives]
  created_at TIMESTAMP WITH TIME ZABASE() DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  workout_id UUID NOT NULL REFERENCES workouts(id),
  date DATE NOT NULL,
  duration INTEGER,
  notes TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  completed BOOLEAN DEFAULT false,
  exercise_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- TABLAS DE NUTRICIÓN
-- ============================================

CREATE TABLE IF NOT EXISTS nutrition_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  nutritionist_id UUID REFERENCES nutritionists(id),
  name TEXT NOT NULL,
  description TEXT,
  calories INTEGER,
  macros JSONB,  -- {protein, carbs, fat}
  hydration_goal REAL,  -- litros por día
  dietary_restrictions JSONB,  -- [{restriction, description}]
  allergies JSONB,
  dislikes JSONB,
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS meals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES nutrition_plans(id),
  type TEXT NOT NULL,  -- 'BREAKFAST', 'MORNING_SNACK', 'LUNCH', 'AFTERNOON_SNACK', 'DINNER', 'EVENING_SNACK', 'PRE_WORKOUT', 'POST_WORKOUT'
  name TEXT NOT NULL,
  description TEXT,
  calories INTEGER,
  macros JSONB,
  ingredients JSONB,  -- [{name, quantity, unit}]
  instructions TEXT,
  image_url TEXT,
  prep_time INTEGER,  -- minutos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- TABLAS DE PROGRESO Y SEGUIMIENTO
-- ============================================

CREATE TABLE IF NOT EXISTS measurements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  -- Métricas principales
  weight REAL,
  body_fat REAL,
  muscle_mass REAL,
  water_mass REAL,
  
  -- Circunferencias (cm)
  chest REAL,
  waist REAL,
  hips REAL,
  biceps_left REAL,
  biceps_right REAL,
  thighs_left REAL,
  thighs_right REAL,
  calves_left REAL,
  calves_right REAL,
  
  -- Otros
  resting_heart_rate INTEGER,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS progress_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- URLs de fotos
  front_url TEXT,
  side_url TEXT,
  back_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- TABLAS DE MINDSET
-- ============================================

CREATE TABLE IF NOT EXISTS mindset_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  mindset_coach_id UUID REFERENCES mindset_coaches(id),
  type TEXT NOT NULL,  -- 'GRATITUD', 'VISUALIZACIÓN', 'AFIRMACION', 'REFLEXIÓN', 'MINDFULNESS', 'GOAL_SETTING', 'REFLEXIÓN', 'MINDFULNESS', 'MINDFULNESS'
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,  -- Contenido detallado del ejercicio
  duration INTEGER,  -- minutos
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  user_response JSONB,  -- Respuesta del usuario
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- TABLAS DE COMUNIDAD / CHAT
-- ============================================

CREATE TABLE IF NOT EXISTS community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_pinned BOOLEAN DEFAULT false,
  is_from_coach BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  community_post_id UUID NULL REFERENCES community_posts(id),
  content TEXT NOT NULL,
  is_from_user BOOLEAN DEFAULT true,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- TABLAS DE IA Y CHAT
-- ============================================

CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  messages JSONB,  -- [{role, content, timestamp}]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- TABLAS DE CITAS
-- ============================================

CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  client_id UUID REFERENCES clients(id),
  coach_id UUID REFERENCES coaches(id),
  nutritionist_id UUID REFERENCES nutritionists(id),
  mindset_coach_id UUID REFERENCES mindset_coaches(id),
  lead_id UUID REFERENCES leads(id),
  type TEXT NOT NULL,  -- 'ONBOARDING', 'CHECK_IN', 'COACHING', 'NUTRITION', 'MINDSET', 'SALES_CALL', 'FOLLOW_UP'
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  duration INTEGER,  -- minutos
  meeting_url TEXT,
  meeting_id TEXT,
  meeting_password TEXT,
  notes TEXT,
  follow_up_actions JSONB,
  status TEXT DEFAULT 'SCHEDULED',  -- 'SCHEDULED', 'CONFIRMED', ' COMPLETEd', 'CANCELLED', 'NO_SHOW'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  start_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- TABLAS DE SUSCRIPCIONES
-- ============================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  client_id UUID REFERENCES clients(id),
  plan TEXT NOT NULL,  -- 'START', 'PRO', 'ELITE', 'EXPERIENCE'
  status TEXT DEFAULT 'ACTIVE',  -- 'ACTIVE', 'CANCELLED', 'PAUSED', 'EXPIRED'
  start_date DATE,
  end_date DATE,
  amount REAL,
  currency TEXT DEFAULT 'ARS',
  payment_method TEXT,  -- 'mercadopago', 'stripe'
  payment_id TEXT,  -- External payment ID
  created_at TIMESTAMP WITH TIME ZABASE() DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- TABLAS DE NOTIFICACIONES
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  type TEXT NOT NULL,  -- 'WORKOUT_REMINDER', 'MEAL_REMINDER', 'CHECK_IN_REMINDER', 'APPOINTMENT_REMINDER', 'PROGRESS_UPDATE', 'COMMUNITY_POST', 'SYSTEM_ANNOUNCEMENT'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  content JSONB,  -- Datos adicionales
  link TEXT,  -- Enlace a sección de la app
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- ÍNDICES
-- ============================================

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_workouts_plan_id ON workouts(plan_id);
CREATE INDEX IF NOT EXISTS idx_workouts_user_id ON workout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_measurements_client_id ON measurements(client_id);
CREATE INDEX IF NOT EXISTS idx_measurements_date ON measurements(date);
CREATE INDEX IF NOT EXISTS idx_progress_photos_client_id ON progress_photos(client_id);
CREATE INDEX IF NOT EXISTS idx_mindset_exercises_client_id ON mindset_exercises(client_id);
CREATE INDEX IF NOT EXISTS idx_meals_plan_id ON meals(plan_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_workout_id ON workout_sessions(workout_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_timestamp ON community_posts(timestamp);

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger para actualizar `updated_at` automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  -- Actualizar tablas principales
  UPDATE users SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE leads SET updated_at = NO WHERE updated_at IS NULL;
  UPDATE clients SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE workouts SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE exercises SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE nutrition_plans SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE meals SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE measurements SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE progress_photos SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE mindset_exercises SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE community_posts SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE chat_messages SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE appointments SET updated_at = NOW() WHERE updated_at IS NULL;
  UPDATE notifications SET updated_at = NOW() WHERE updated_at IS NULL;
  RETURN NULL;
END;
LANGUAGE plpgsql;

-- Trigger automático
CREATE TRIGGER trigger_set_updated_at
AFTER UPDATE ON users OR leads OR clients OR workouts OR exercises OR nutrition_plans OR meals OR measurements
FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
END;

COMMENT ON trigger_set_updated_at IS 'Actualiza updated_at en tablas relacionadas';

-- ============================================
-- FUNCIONES
-- ============================================

CREATE OR REPLACE FUNCTION get_user_by_email(p_email TEXT)
RETURNS TABLE users
LANGUAGE SQL
AS $$
SELECT * FROM users WHERE email = p_email
LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION get_client_by_user(p_user_id UUID)
RETURNS TABLE clients
LANGUAGE SQL
AS $$
SELECT c.*, 
  u.email, u.full_name
FROM clients c
JOIN users u ON c.user_id = u.id
WHERE c.user_id = p_user_id;
$$;

-- ============================================
-- VISTAS
-- ============================================

-- Vista pública para leads (solo campos públicos)
CREATE OR REPLACE VIEW public_leads AS
SELECT 
  id,
  name,
  email,
  phone,
  source,
  status,
  created_at
FROM leads
WHERE status = 'NEW';

-- Vista para dashboard (leads con métricas)
CREATE OR REPLACE VIEW leads_dashboard AS
SELECT 
  COUNT(*) FILTER (CASE WHEN status = 'NEW' THEN 'new' ELSE 'other' END) as leads_count,
  COUNT(*) FILTER (CASE WHEN status = 'QUALIFIED' THEN 'qualified' ELSE 'other' END) as qualified_count,
  COUNT(*) FILTER (CASE WHEN status = 'SCHEDULED' THEN 'scheduled' ELSE 'other' END) as scheduled_count,
  COUNT(*) FILTER (CASE WHEN status = 'WON' THEN 'won' ELSE 'other' END) as won_count
FROM leads;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Habilitar RLS (Row Level Security) en Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Se asume que las políticas de seguridad están configuradas en el dashboard de Supabase
-- Recomendación: Crear un policy en Supabase para restringir accesos

-- ============================================
-- COMENTARIOS FINALES
-- ============================================

COMMENT ON 'Base de datos para 257Club Transformación Consciente';
COMMENT ON 'Creado por Z.ai Code';
COMMENT ON 'Fecha: 20/01/2025';

-- ============================================
-- FIN
-- ============================================
