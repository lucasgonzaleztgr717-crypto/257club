  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_workout_plans_client_id ON workout_plans(client_id);
CREATE INDEX idx_workout_plans_is_active ON workout_plans(is_active);

-- HABILITAR RLS
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA WORKOUT_PLANS:
-- Cliente puede leer SUS planes
CREATE POLICY "Clients can read own workout plans" ON workout_plans
  FOR SELECT USING (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- Coach/Admin puede leer todos los planes
CREATE POLICY "Service roles can read all workout plans" ON workout_plans
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role IN ('COACH', 'ADMIN')
    )
  );

-- ============================================
-- TABLA: EXERCISES (Ejercicios de la biblioteca)
-- ============================================
-- Contiene la biblioteca de ejercicios disponibles
-- RLS: HABILITADO - Cualquiera puede leer, solo coaches/admins pueden editar
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

-- Índices
CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);

-- HABILITAR RLS
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA EXERCISES:
-- Cualquiera puede leer ejercicios
CREATE POLICY "Anyone can read exercises" ON exercises
  FOR SELECT USING (true);

-- Solo coaches/admins pueden crear/editar ejercicios
CREATE POLICY "Service roles can manage exercises" ON exercises
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role IN ('COACH', 'ADMIN')
    )
  );

-- ============================================
-- TABLA: WORKOUTS (Entrenamientos específicos dentro de un plan)
-- ============================================
-- Contiene los entrenamientos de cada plan
-- RLS: HABILITADO - Protegido igual que workout_plans
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

-- Índices
CREATE INDEX idx_workouts_plan_id ON workouts(plan_id);

-- HABILITAR RLS
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA WORKOUTS:
-- Se heredan las políticas de workout_plans a través de relaciones

-- ============================================
-- TABLA: WORKOUT_SESSIONS (Sesiones de entrenamiento completadas)
-- ============================================
-- Contiene el historial de entrenamientos completados por cada usuario
-- RLS: HABILITADO - Solo el usuario puede ver sus propias sesiones
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

-- Índices
CREATE INDEX idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX idx_workout_sessions_workout_id ON workout_sessions(workout_id);
CREATE INDEX idx_workout_sessions_date ON workout_sessions(date DESC);

-- HABILITAR RLS
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA WORKOUT_SESSIONS:
-- Usuario puede leer SUS propias sesiones
CREATE POLICY "Users can read own workout sessions" ON workout_sessions
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Usuario puede crear SUS propias sesiones
CREATE POLICY "Users can create own workout sessions" ON workout_sessions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Usuario puede actualizar SUS propias sesiones
CREATE POLICY "Users can update own workout sessions" ON workout_sessions
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- ============================================
-- TABLA: NUTRITION_PLANS (Planes de nutrición)
-- ============================================
-- Contiene los planes de nutrición asignados a clientes
-- RLS: HABILITADO - Protegido igual que workout_plans
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

-- Índices
CREATE INDEX idx_nutrition_plans_client_id ON nutrition_plans(client_id);
CREATE INDEX idx_nutrition_plans_is_active ON nutrition_plans(is_active);

-- HABILITAR RLS
ALTER TABLE nutrition_plans ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA NUTRITION_PLANS:
-- Cliente puede leer SUS planes
CREATE POLICY "Clients can read own nutrition plans" ON nutrition_plans
  FOR SELECT USING (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- Nutritionist/Admin puede leer planes que crearon
CREATE POLICY "Nutritionists can read assigned plans" ON nutrition_plans
  FOR SELECT USING (auth.uid()::text = nutritionist_id::text);

-- ============================================
-- TABLA: MEALS (Comidas de un plan de nutrición)
-- ============================================
-- Contiene las comidas de cada plan nutricional
-- RLS: HABILITADO - Se hereda protección de nutrition_plans
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

-- Índices
CREATE INDEX idx_meals_plan_id ON meals(plan_id);

-- HABILITAR RLS
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA MEALS:
-- Cliente puede leer comidas de SUS planes
CREATE POLICY "Clients can read own meals" ON meals
  FOR SELECT USING (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id IN (
        SELECT client_id FROM nutrition_plans WHERE id = plan_id
      )
    )
  );

-- ============================================
-- TABLA: MEASUREMENTS (Mediciones de progreso)
-- ============================================
-- Contiene las mediciones de progreso de cada cliente
-- RLS: HABILITADO - Solo el usuario puede ver sus mediciones
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

-- Índices
CREATE INDEX idx_measurements_client_id ON measurements(client_id);
CREATE INDEX idx_measurements_date ON measurements(date DESC);

-- HABILITAR RLS
ALTER TABLE measurements ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA MEASUREMENTS:
-- Cliente puede leer SUS mediciones
CREATE POLICY "Clients can read own measurements" ON measurements
  FOR SELECT USING (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- Cliente puede crear SUS mediciones
CREATE POLICY "Clients can create own measurements" ON measurements
  FOR INSERT WITH CHECK (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- ============================================
-- TABLA: PROGRESS_PHOTOS (Fotos de progreso)
-- ============================================
-- Contiene las fotos de progreso de cada cliente
-- IMPORTANTE: URLs pueden ser sensibles - proteger con RLS
-- RLS: HABILITADO - Solo el cliente puede ver sus propias fotos
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

-- Índices
CREATE INDEX idx_progress_photos_client_id ON progress_photos(client_id);
CREATE INDEX idx_progress_photos_date ON progress_photos(date DESC);

-- HABILITAR RLS
