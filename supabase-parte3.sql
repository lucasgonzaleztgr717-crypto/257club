ALTER TABLE progress_photos ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA PROGRESS_PHOTOS:
-- Cliente puede leer SUS fotos
CREATE POLICY "Clients can read own progress photos" ON progress_photos
  FOR SELECT USING (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- Cliente puede crear SUS fotos
CREATE POLICY "Clients can create own progress photos" ON progress_photos
  FOR INSERT WITH CHECK (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- ============================================
-- TABLA: MINDSET_EXERCISES (Ejercicios de mindset)
-- ============================================
-- Contiene los ejercicios de mindset asignados a clientes
-- RLS: HABILITADO - Protegido igual que measurements
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

-- Índices
CREATE INDEX idx_mindset_exercises_client_id ON mindset_exercises(client_id);

-- HABILITAR RLS
ALTER TABLE mindset_exercises ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA MINDSET_EXERCISES:
-- Cliente puede leer SUS ejercicios
CREATE POLICY "Clients can read own mindset exercises" ON mindset_exercises
  FOR SELECT USING (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- Cliente puede crear SUS ejercicios
CREATE POLICY "Clients can create own mindset exercises" ON mindset_exercises
  FOR INSERT WITH CHECK (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- ============================================
-- TABLA: APPOINTMENTS (Citas/reuniones)
-- ============================================
-- Contiene todas las citas del sistema
-- RLS: HABILITADO - Participantes pueden ver, coaches/admins pueden gestionar
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

-- Índices
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_start_time ON appointments(start_time DESC);

-- HABILITAR RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA APPOINTMENTS:
-- Cliente puede leer SUS citas
CREATE POLICY "Clients can read own appointments" ON appointments
  FOR SELECT USING (
    auth.uid()::text = user_id::text
    OR (
      auth.uid()::text IN (
        SELECT user_id::text FROM clients WHERE id = client_id
      )
    )
  );

-- Coach/Admin puede leer todas las citas
CREATE POLICY "Service roles can read all appointments" ON appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role IN ('COACH', 'NUTRITIONIST', 'MINDSET_COACH', 'ADMIN')
    )
  );

-- Coaches pueden crear citas
CREATE POLICY "Service roles can create appointments" ON appointments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role IN ('COACH', 'NUTRITIONIST', 'MINDSET_COACH', 'ADMIN')
    )
  );

-- ============================================
-- TABLA: COMMUNITY_POSTS (Posts de la comunidad)
-- ============================================
-- Contiene los posts del foro/comunidad
-- RLS: HABILITADO - Cualquiera puede leer, solo autores pueden editar
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);

-- HABILITAR RLS
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA COMMUNITY_POSTS:
-- Cualquiera puede leer posts
CREATE POLICY "Anyone can read posts" ON community_posts
  FOR SELECT USING (true);

-- Usuario puede crear posts
CREATE POLICY "Users can create posts" ON community_posts
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Usuario puede actualizar SUS posts
CREATE POLICY "Users can update own posts" ON community_posts
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Usuario puede borrar SUS posts
CREATE POLICY "Users can delete own posts" ON community_posts
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- ============================================
-- TABLA: CHAT_MESSAGES (Comentarios de posts)
-- ============================================
-- Contiene los comentarios/comunicación en la comunidad
-- RLS: HABILITADO - Similar a community_posts
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  community_post_id UUID REFERENCES community_posts(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_community_post_id ON chat_messages(community_post_id);

-- HABILITAR RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA CHAT_MESSAGES:
-- Cualquiera puede leer mensajes
CREATE POLICY "Anyone can read chat messages" ON chat_messages
  FOR SELECT USING (true);

-- Usuario puede crear mensajes
CREATE POLICY "Users can create chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- ============================================
-- TABLA: AI_CONVERSATIONS (Historial de chat con IA)
-- ============================================
-- Contiene el historial de conversaciones con la IA
-- IMPORTANTE: Puede contener información personal - proteger con RLS
-- RLS: HABILITADO - Solo el usuario puede ver SUS conversaciones
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  messages TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);

-- HABILITAR RLS
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA AI_CONVERSATIONS:
-- Usuario puede leer SUS conversaciones
CREATE POLICY "Users can read own AI conversations" ON ai_conversations
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Usuario puede crear SUS conversaciones (el sistema las crea automáticamente)
CREATE POLICY "Users can create own AI conversations" ON ai_conversations
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Usuario puede actualizar SUS conversaciones
CREATE POLICY "Users can update own AI conversations" ON ai_conversations
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- ============================================
-- TABLA: SUBSCRIPTIONS (Suscripciones de pago)
-- ============================================
-- Contiene las suscripciones de los clientes
-- IMPORTANTE: Información financiera - proteger con RLS
-- RLS: HABILITADO - Solo admin puede ver todas, clientes las suyas
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

-- Índices
CREATE INDEX idx_subscriptions_client_id ON subscriptions(client_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- HABILITAR RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA SUBSCRIPTIONS:
-- Cliente puede leer SUS suscripciones
CREATE POLICY "Clients can read own subscriptions" ON subscriptions
  FOR SELECT USING (
    auth.uid()::text IN (
      SELECT user_id::text FROM clients WHERE id = client_id
    )
  );

-- Solo Admin puede ver todas las suscripciones
CREATE POLICY "Admin can read all subscriptions" ON subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

-- ============================================
-- TABLA: NOTIFICATIONS (Notificaciones del sistema)
-- ============================================
-- Contiene las notificaciones para los usuarios
-- RLS: HABILITADO - Solo el usuario puede ver SUS notificaciones
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- HABILITAR RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD PARA NOTIFICATIONS:
-- Usuario puede leer SUS notificaciones
CREATE POLICY "Users can read own notifications" ON notifications
