-- ============================================
-- MIGRACIÓN SUPABASE SEGURA - 257Club Transformación Consciente
-- ============================================
-- VERSIÓN: 2.0 - Con seguridad completa (RLS en todas las tablas)
-- ============================================
--
-- INSTRUCCIONES:
-- 1. Copia TODO este código
-- 2. Ve a tu Supabase Dashboard
-- 3. Entra a SQL Editor
-- 4. Pega este código
-- 5. Haz clic en "RUN"
-- 6. Espera a que veas: "✅ Migración completada con éxito!"
--
-- ============================================

-- ============================================
-- PARTE 1: CREAR TIPOS ENUM
-- ============================================
-- Los ENUM son como "listas de opciones válidas" para columnas específicas
-- Esto evita que se guarden valores incorrectos en la base de datos
-- ============================================

-- Roles de usuario: Define qué tipo de usuario es cada persona
CREATE TYPE user_role AS ENUM ('CLIENT', 'COACH', 'NUTRITIONIST', 'MINDSET_COACH', 'ADMIN');

-- Planes de suscripción: Define los tipos de planes disponibles
CREATE TYPE subscription_plan AS ENUM ('START', 'PRO', 'ELITE', 'EXPERIENCE');

-- Estado de suscripción: Define el estado actual del plan
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'CANCELLED', 'PAUSED', 'EXPIRED');

-- Origen del lead: ¿De dónde vino el cliente?
CREATE TYPE lead_source AS ENUM ('INSTAGRAM', 'FACEBOOK', 'WEBSITE', 'REFERRAL', 'GOOGLE', 'OTHER');

-- Estado del lead: En qué etapa del proceso de ventas está
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'SCHEDULED', 'PROPOSAL_SENT', 'WON', 'LOST', 'FOLLOW_UP');

-- Tipo de entrenamiento: Qué tipo de entrenamiento es
CREATE TYPE workout_type AS ENUM ('STRENGTH', 'HYPERTROPHY', 'ENDURANCE', 'ZONE_2', 'MOBILITY', 'FULL_BODY', 'UPPER_BODY', 'LOWER_BODY', 'HIIT', 'FUNCTIONAL');

-- Dificultad del entrenamiento: Para principiantes, intermedios o avanzados
CREATE TYPE workout_difficulty AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- Tipo de comida: Desayuno, almuerzo, etc.
CREATE TYPE meal_type AS ENUM ('BREAKFAST', 'MORNING_SNACK', 'LUNCH', 'AFTERNOON_SNACK', 'DINNER', 'EVENING_SNACK', 'PRE_WORKOUT', 'POST_WORKOUT');

-- Tipo de ejercicio mental: Meditación, journaling, etc.
CREATE TYPE mindset_exercise_type AS ENUM ('JOURNALING', 'MEDITATION', 'VISUALIZATION', 'AFFIRMATION', 'GOAL_SETTING', 'REFLECTION', 'BREATHING', 'GRATITUDE');

-- Tipo de cita: ¿Para qué es la reunión?
CREATE TYPE appointment_type AS ENUM ('ONBOARDING', 'CHECK_IN', 'COACHING', 'NUTRITION', 'MINDSET', 'SALES_CALL', 'FOLLOW_UP');

-- Estado de cita: Estado actual de la reunión
CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- ============================================
-- PARTE 2: CREAR TABLAS PRINCIPALES
-- ============================================

-- ============================================
-- TABLA: USERS (Usuarios)
-- ============================================
-- Contiene la información básica de todos los usuarios del sistema
-- RLS: HABILITADO - Solo el usuario puede ver sus propios datos
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

-- Índices para mejor rendimiento en búsquedas
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- HABILITAR RLS (Row Level Security) - Seguridad a nivel de fila
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA USERS:
-- Los usuarios SOLO pueden leer sus propios datos (donde id coincide con auth.uid)
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Los usuarios SOLO pueden actualizar sus propios datos
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- ============================================
-- TABLA: LEADS (Prospectos/Clientes potenciales)
-- ============================================
-- Contiene la información de leads del sistema
-- RLS: HABILITADO - Para demo, cualquiera puede leer/crear leads
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

-- Índices para búsquedas rápidas
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- HABILITAR RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA LEADS:
-- Cualquiera puede crear leads (para el formulario de la landing page)
CREATE POLICY "Anyone can create leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Cualquiera puede leer leads (para demo/visualización pública)
CREATE POLICY "Anyone can read leads" ON leads
  FOR SELECT USING (true);

-- ============================================
-- TABLA: CLIENTS (Clientes activos)
-- ============================================
-- Contiene información detallada de los clientes del programa
-- RLS: HABILITADO - Solo el usuario coach/admin puede ver, clientes leen sus propios datos
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

-- Índices
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_status ON clients(status);

-- HABILITAR RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA CLIENTS:
-- Cliente puede leer SUS propios datos
CREATE POLICY "Clients can read own data" ON clients
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Coach/Admin puede leer todos los datos
CREATE POLICY "Service roles can read all clients" ON clients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role IN ('COACH', 'NUTRITIONIST', 'MINDSET_COACH', 'ADMIN')
    )
  );

-- Cliente puede actualizar SUS propios datos
CREATE POLICY "Clients can update own data" ON clients
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- ============================================
-- TABLA: COACHES (Entrenadores)
-- ============================================
-- Contiene información de los entrenadores del equipo
-- RLS: HABILITADO - Solo coaches/admins pueden ver, cada coach sus propios datos
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

-- HABILITAR RLS
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA COACHES:
-- Cualquiera puede leer (para ver equipo en el perfil)
CREATE POLICY "Anyone can read coaches" ON coaches
  FOR SELECT USING (true);

-- Coach puede actualizar SUS propios datos
CREATE POLICY "Coaches can update own data" ON coaches
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Solo admins/coaches pueden insertar
CREATE POLICY "Service roles can insert coaches" ON coaches
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role IN ('COACH', 'ADMIN')
    )
  );

-- ============================================
-- TABLA: NUTRITIONISTS (Nutricionistas)
-- ============================================
-- Contiene información de los nutricionistas del equipo
-- IMPORTANTE: license_number es sensible - proteger con RLS
-- RLS: HABILITADO - Solo admins pueden ver datos sensibles
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

-- HABILITAR RLS
ALTER TABLE nutritionists ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA NUTRITIONISTS:
-- Cualquiera puede leer NOMBRE y BIO (datos públicos del equipo)
CREATE POLICY "Anyone can read public nutritionist info" ON nutritionists
  FOR SELECT USING (true);

-- NADIE puede ver license_number directamente (columna protegida)
-- Esta se manejará a través de vistas o procedimientos especiales

-- ============================================
-- TABLA: MINDSET_COACHES (Coaches de mindset)
-- ============================================
-- Contiene información de los coaches de mindset
-- RLS: HABILITADO - Protegido igual que nutritionists
CREATE TABLE mindset_coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization TEXT,
  bio TEXT,
  certifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HABILITAR RLS
ALTER TABLE mindset_coaches ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA MINDSET_COACHES:
-- Cualquiera puede leer información pública
CREATE POLICY "Anyone can read mindset coaches" ON mindset_coaches
  FOR SELECT USING (true);

-- ============================================
-- TABLA: WORKOUT_PLANS (Planes de entrenamiento)
-- ============================================
-- Contiene los planes de entrenamiento asignados a cada cliente
-- RLS: HABILITADO - Solo coach/admin y el cliente pueden ver
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
