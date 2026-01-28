# Configuración de Supabase - 257Club Transformación Consciente

## Instalación Completada ✅

### Paquetes instalados:
- @supabase/supabase-js
- @supabase/auth-helpers-nextjs
- @supabase/postgrest-js

---

## Variables de Entorno

### Archivo: `.env.local` (NO subir a git)

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscmJ1a3hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjQ0MDUsImV4cCI6MjA4MzQwMDQwNX0LTQ0NSIuMDUsImVscmJ1a2hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjQwMDQwNX0LTQ0NSIuMDUsImVscmJ1a2hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjQwMDQwNX0LTQ0NSIuMDUsImVscmJ1a2hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjQwMDQwNX0LTQ0NSIuMDUsImVscmJ1a2hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4jQwMDQwMDQwNX0LTQ0NSIuMDUsImVscmJ1a2hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCJpXQiOjE3Njc4jQwMDQwMDQwNX0LTQ0abghyIxRMUNSHqeThdeqQnJlCosgvYd66GLm_ez5QrtDexKhd3Vn4A

# Database Connection
NEXT_PUBLIC_SUPABASE_DB_PASSWORD=your_supabase_db_password_here

# Database Connection String Alternative (para Prisma)
DATABASE_URL="postgresql://postgres:[YOUR_DB_USER]:[YOUR_DB_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres"
```

---

## Archivo: `.env` (plantilla - también en .gitignore)

```bash
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscmJ1a3hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjQ0MDUsImV4cCI6MjA4MzQwMDQwNX0LTQ0NSIuMDUsImVscmJ1a2hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCpYpXQiOjE3Njc4jwMDQwMDQwNX0LTQ0NSIuMDUsImVscmJ1a2hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCpXQiOjE3Njc4jwMDQwMDQwNX0LTQ0NSIuMDUsImVscmJ1a2hwa3R3YW9tZWN1c2Z2Iiwicm9sZSI6ImFub24iLCpXQiOjE3Njc4jwMDQwMDQwNX0LTQ0abghyIxRMUNSHqeThdeqQnJlCosgvYd66GLm_ez5QrtDexKhd3Vn4A

# Database Connection
NEXT_PUBLIC_SUPABASE_DB_PASSWORD=your_supabase_db_password_here

# Database Connection String Alternative (para Prisma)
DATABASE_URL="postgresql://postgres:[YOUR_DB_USER]:[YOUR_DB_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres"
```

---

## Configuración de Prisma para Supabase

### Actualizar `prisma/schema.prisma`:

Cambiar el datasource de:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

A:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Crear Client Supabase

### Archivo: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-anon-key': supabaseAnonKey,
    'apikey': supabaseAnonKey,
    'Content-Type': 'application/json'
    }
  }
})

// Database types (opcional - generado por Supabase)
export type Database = {
  users: Row<{
    id: string
    created_at: string
    email: string
    full_name: string
    role: string
  }
  }
}

export type Json = {
  [key: string]: any
}
```

---

## API Routes usando Supabase

### Ejemplo: `/api/leads/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, goal } = await request.json()

    // Insert en Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: `+54 9 ${phone}`,
        goal,
        source: 'WEBSITE',
        status: 'NEW',
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      lead: data[0],
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## Funciones Helper

### Archivo: `src/lib/supabase-helpers.ts`

```typescript
import { supabase } from '@/lib/supabase'

export async function createLead(lead: {
  name: string
  email: string
  phone: string
  goal: string
  source?: string
  notes?: string
}) {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name,
      email,
      phone,
      goal,
      source: source || 'WEBSITE',
      status: 'NEW',
      notes: notes || null,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  return { data, error }
}

export async function getLeads(filters?: { status?: string, limit?: number }) {
  let query = supabase.from('leads').select('*')

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  return { data, error }
}

export async function updateLeadStatus(
  id: string,
  status: string,
  notes?: string
) {
  const { data, error } = await supabase
    .from('leads')
    .update({
      status,
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}
```

---

## Migraciones de Base de Datos

### Crear tablas en Supabase:

Opciones:
1. **SQL directo** en el dashboard de Supabase
2. **Migraciones automáticas** usando el schema de Prisma actual

### Script SQL para crear tablas básicas:

```sql
-- Usuarios
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'CLIENT',
  password_hash TEXT
);

-- Leads
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  goal TEXT,
  source TEXT DEFAULT 'WEBSITE',
  status TEXT DEFAULT 'NEW',
  notes JSONB,
  commitment INTEGER
);

-- Clientes
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES users(id),
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

-- Workouts
CREATE TABLE workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  client_id UUID REFERENCES clients(id),
  coach_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  difficulty TEXT,
  weeks INTEGER DEFAULT 4,
  workouts_per_week INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE
);

-- Workout Sessions
CREATE TABLE workout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES users(id),
  workout_id UUID REFERENCES workouts(id),
  date DATE NOT NULL,
  duration INTEGER,
  notes TEXT,
  rating INTEGER,
  completed BOOLEAN DEFAULT false,
  exercise_data JSONB
);

-- ... resto de las tablas del schema actual
```

---

## Próximos Pasos

1. ✅ Obtener Project URL de Supabase
2. ⏳ Configurar `.env.local` con las credenciales
3. ⏳ Actualizar schema de Prisma para usar PostgreSQL
4. ⏳ Crear tablas en Supabase
5. ⏳ Crear helper functions de Supabase
6. ⏳ Actualizar APIs para usar Supabase
7. ⏳ Migrar datos existentes (si hay)
8. ⏳ Implementar autenticación con Supabase Auth
9. ⏳ Implementar Realtime subscriptions para chat y comunidad

---

**Documentación oficial de Supabase:**
- https://supabase.com/docs/guides/getting-started/quickstart
- https://supabase.com/docs/guides/auth/server-side/nextjs
- https://supabase.com/docs/guides/database/connecting-to-postgres

---

## Variables de Entorno - Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Project URL de Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key ya recibida ✅
- [ ] `NEXT_PUBLIC_SUPABASE_DB_PASSWORD` - Password de la DB
- [ ] `DATABASE_URL` - Connection string para Prisma PostgreSQL

---

**Nota de Seguridad:**
- ✅ Nunca compartir el `sb_secret_...` en código ni repositorios
- ✅ Usar `.env.local` para credenciales sensibles
- ✅ El Anon Key es pública y puede ir en el código
- ✅ Los passwords deben estar en variables de entorno locales
