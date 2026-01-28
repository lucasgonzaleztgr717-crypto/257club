-- ============================================
-- MIGRACIÓN SUPABASE - 257Club Transformación Consciente
-- ============================================
-- Instrucciones:
-- 1. Copia todo este código
-- 2. Ve a tu Supabase Dashboard
-- 3. Entra a SQL Editor
-- 4. Pega este código
-- 5. Haz clic en "Run"
-- ============================================

-- Crear enum para user_role
CREATE TYPE user_role AS ENUM ('CLIENT', 'COACH', 'NUTRITIONIST', 'MINDSET_COACH', 'ADMIN');

-- Crear enum para subscription_plan
CREATE TYPE subscription_plan AS ENUM ('START', 'PRO', 'ELITE', 'EXPERIENCE');

-- Crear enum para subscription_status
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'CANCELLED', 'PAUSED', 'EXPIRED');

-- Crear enum para lead_source
CREATE TYPE lead_source AS ENUM ('INSTAGRAM', 'FACEBOOK', 'WEBSITE', 'REFERRAL', 'GOOGLE', 'OTHER');

-- Crear enum para lead_status
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'SCHEDULED', 'PROPOSAL_SENT', 'WON', 'LOST', 'FOLLOW_UP');

-- Crear enum para workout_type
CREATE TYPE workout_type AS ENUM ('STRENGTH', 'HYPERTROPHY', 'ENDURANCE', 'ZONE_2', 'MOBILITY', 'FULL_BODY', 'UPPER_BODY', 'LOWER_BODY', 'HIIT', 'FUNCTIONAL');

-- Crear enum para workout_difficulty
CREATE TYPE workout_difficulty AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- Crear enum para meal_type
CREATE TYPE meal_type AS ENUM ('BREAKFAST', 'MORNING_SNACK', 'LUNCH', 'AFTERNOON_SNACK', 'DINNER', 'EVENING_SNACK', 'PRE_WORKOUT', 'POST_WORKOUT');

-- Crear enum for mindset_exercise_type
CREATE TYPE mindset_exercise_type AS ENUM ('JOURNALING', 'MEDITATION', 'VISUALIZATION', 'AFFIRMATION', 'GOAL_SETTING', 'REFLECTION', 'BREATHING', 'GRATITUDE');

-- Crear enum para appointment_type
CREATE TYPE appointment_type AS ENUM ('ONBOARDING', 'CHECK_IN', 'COACHING', 'NUTRITION', 'MINDSET', 'SALES_CALL', 'FOLLOW_UP');

-- Crear enum para appointment_status
CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- ============================================
-- TABLA: USERS
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255),
  phone VARCHAR(20),
  role user_role DEFAULT 'CLIENT',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: LEADS
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  source lead_source DEFAULT 'WEBSITE',
  status lead_status DEFAULT 'NEW',
  goals TEXT,
  budget TEXT,
  timeline TEXT,
  pain_points TEXT,
  previous_attempts TEXT,
  commitment INTEGER,
  notes TEXT,
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  follow_up_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para leads
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- TABLA: CLIENTS
-- ============================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  gender VARCHAR(10),
  height DECIMAL(5, 2),
  weight DECIMAL(5, 2),
  body_fat DECIMAL(5, 2),
  activity_level VARCHAR(20),
  primary_goal TEXT,
  secondary_goals TEXT,
  goal_description TEXT,
  injuries TEXT,
  limitations TEXT,
  equipment TEXT,
  preferred_days TEXT,
  preferred_time VARCHAR(20),
  workout_frequency INTEGER,
  workout_duration INTEGER,
  status VARCHAR(20) DEFAULT 'active',
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  coach_notes TEXT,
  mindset_notes TEXT,
  nutrition_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_status ON clients(status);

-- ============================================
-- TABLA: COACHES
-- ============================================
CREATE TABLE coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization TEXT,
  bio TEXT,
  certifications TEXT,
  years_experience INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: NUTRITIONISTS
-- ============================================
CREATE TABLE nutritionists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization TEXT,
  bio TEXT,
  certifications TEXT,
  license_number VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: MINDSET_COACHES
-- ============================================
CREATE TABLE mindset_coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization TEXT,
  bio TEXT,
  certifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: WORKOUT_PLANS
-- ============================================
CREATE TABLE workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES coaches(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type workout_type NOT NULL,
  difficulty workout_difficulty NOT NULL,
  weeks INTEGER DEFAULT 4,
  workouts_per_week INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT TRUE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_workout_plans_client_id ON workout_plans(client_id);
CREATE INDEX idx_workout_plans_is_active ON workout_plans(is_active);

-- ============================================
-- TABLA: EXERCISES
-- ============================================
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  muscle_groups TEXT,
  equipment VARCHAR(50),
  difficulty VARCHAR(20),
  description TEXT,
  video_url TEXT,
  image_url TEXT,
  is_compound BOOLEAN DEFAULT FALSE,
  instructions TEXT,
  common_mistakes TEXT,
  modifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: WORKOUTS
-- ============================================
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES workout_plans(id) ON DELETE CASCADE,
  week INTEGER NOT NULL,
  day INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type workout_type NOT NULL,
  duration INTEGER,
  rest_between_sets INTEGER,
  exercises TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_workouts_plan_id ON workouts(plan_id);

-- ============================================
-- TABLA: WORKOUT_SESSIONS
-- ============================================
CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workout_id UUID NOT NULL REFERENCES workouts(id),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER,
  notes TEXT,
  rating INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  exercise_data TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX idx_workout_sessions_workout_id ON workout_sessions(workout_id);

-- ============================================
-- TABLA: NUTRITION_PLANS
-- ============================================
CREATE TABLE nutrition_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  nutritionist_id UUID REFERENCES nutritionists(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  calories INTEGER,
  macros TEXT,
  hydration_goal DECIMAL(4, 2),
  dietary_restrictions TEXT,
  allergies TEXT,
  dislikes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_nutrition_plans_client_id ON nutrition_plans(client_id);
CREATE INDEX idx_nutrition_plans_is_active ON nutrition_plans(is_active);

-- ============================================
-- TABLA: MEALS
-- ============================================
CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES nutrition_plans(id) ON DELETE CASCADE,
  type meal_type NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  calories INTEGER,
  macros TEXT,
  ingredients TEXT,
  instructions TEXT,
  image_url TEXT,
  prep_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_meals_plan_id ON meals(plan_id);

-- ============================================
-- TABLA: MEASUREMENTS
-- ============================================
CREATE TABLE measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  weight DECIMAL(5, 2),
  body_fat DECIMAL(5, 2),
  muscle_mass DECIMAL(5, 2),
  water_mass DECIMAL(5, 2),
  chest DECIMAL(5, 2),
  waist DECIMAL(5, 2),
  hips DECIMAL(5, 2),
  biceps_left DECIMAL(5, 2),
  biceps_right DECIMAL(5, 2),
  thighs_left DECIMAL(5, 2),
  thighs_right DECIMAL(5, 2),
  calves_left DECIMAL(5, 2),
  calves_right DECIMAL(5, 2),
  resting_heart_rate INTEGER,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_measurements_client_id ON measurements(client_id);
CREATE INDEX idx_measurements_date ON measurements(date DESC);

-- ============================================
-- TABLA: PROGRESS_PHOTOS
-- ============================================
CREATE TABLE progress_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  front_url TEXT,
  side_url TEXT,
  back_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_progress_photos_client_id ON progress_photos(client_id);
CREATE INDEX idx_progress_photos_date ON progress_photos(date DESC);

-- ============================================
-- TABLA: MINDSET_EXERCISES
-- ============================================
CREATE TABLE mindset_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  mindset_coach_id UUID REFERENCES mindset_coaches(id),
  type mindset_exercise_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  duration INTEGER,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  user_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_mindset_exercises_client_id ON mindset_exercises(client_id);

-- ============================================
-- TABLA: APPOINTMENTS
-- ============================================
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id),
  coach_id UUID REFERENCES coaches(id),
  nutritionist_id UUID REFERENCES nutritionists(id),
  mindset_coach_id UUID REFERENCES mindset_coaches(id),
  lead_id UUID REFERENCES leads(id),
  type appointment_type NOT NULL,
  status appointment_status DEFAULT 'SCHEDULED',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  meeting_url TEXT,
  meeting_id VARCHAR(100),
  meeting_password VARCHAR(50),
  notes TEXT,
  follow_up_actions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_start_time ON appointments(start_time DESC);

-- ============================================
-- TABLA: COMMUNITY_POSTS
-- ============================================
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);

-- ============================================
-- TABLA: CHAT_MESSAGES
-- ============================================
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  community_post_id UUID REFERENCES community_posts(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_community_post_id ON chat_messages(community_post_id);

-- ============================================
-- TABLA: AI_CONVERSATIONS
-- ============================================
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  messages TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);

-- ============================================
-- TABLA: SUBSCRIPTIONS
-- ============================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL,
  status subscription_status DEFAULT 'ACTIVE',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  amount DECIMAL(10, 2),
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_client_id ON subscriptions(client_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- TABLA: NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- ============================================
-- FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS PARA updated_at
-- ============================================
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coaches_updated_at
  BEFORE UPDATE ON coaches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nutritionists_updated_at
  BEFORE UPDATE ON nutritionists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mindset_coaches_updated_at
  BEFORE UPDATE ON mindset_coaches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workout_plans_updated_at
  BEFORE UPDATE ON workout_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at
  BEFORE UPDATE ON workouts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workout_sessions_updated_at
  BEFORE UPDATE ON workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nutrition_plans_updated_at
  BEFORE UPDATE ON nutrition_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meals_updated_at
  BEFORE UPDATE ON meals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mindset_exercises_updated_at
  BEFORE UPDATE ON mindset_exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON community_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at
  BEFORE UPDATE ON ai_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CONFIGURACIÓN ROW LEVEL SECURITY (RLS) - OPCIONAL
-- ============================================
-- Habilitar RLS en tablas principales
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede crear leads
CREATE POLICY "Anyone can create leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Política: Cualquiera puede leer leads (para demo)
CREATE POLICY "Anyone can read leads" ON leads
  FOR SELECT USING (true);

-- Política: Usuarios pueden leer sus propios datos
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Clients can read own data" ON clients
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can read own appointments" ON appointments
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can read own conversations" ON ai_conversations
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can read own posts" ON community_posts
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create posts" ON community_posts
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Verificar que las tablas se crearon correctamente
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Mensaje final
SELECT '✅ Migración completada con éxito! Las tablas han sido creadas.' AS status;
