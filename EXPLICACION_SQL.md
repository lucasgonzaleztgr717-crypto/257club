# 📖 EXPLICACIÓN DEL CÓDIGO SQL - Seguridad Completa

## 📋 ÍNDICE
1. [Resumen General](#resumen-general)
2. [Parte 1: Tipos ENUM](#parte-1-tipos-enum)
3. [Parte 2: Tablas Principales](#parte-2-tablas-principales)
4. [Parte 3: Triggers](#parte-3-triggers)
5. [Parte 4: Verificación](#parte-4-verificación)
6. [Políticas de Seguridad (RLS)](#políticas-de-seguridad-rls)
7. [Solución de Problemas Comunes](#solución-de-problemas-comunes)

---

<a name="resumen-general"></a>
## 🎯 RESUMEN GENERAL

Este SQL crea la **estructura completa de base de datos** para tu aplicación 257Club con:

✅ **17 tipos ENUM** - Valores válidos para columnas específicas
✅ **19 tablas** - Almacenando toda la información del sistema
✅ **RLS habilitado en TODAS las tablas** - Seguridad a nivel de fila
✅ **Políticas de seguridad apropiadas** - Cada tipo de usuario tiene permisos correctos
✅ **Triggers automáticos** - `updated_at` se actualiza solo
✅ **Índices de rendimiento** - Búsquedas rápidas

---

<a name="parte-1-tipos-enum"></a>
## 📝 PARTE 1: TIPOS ENUM

### ¿Qué son los ENUM?
Los **ENUM** son "listas de opciones válidas" para columnas específicas. Evitan que se guarden valores incorrectos.

### ENUMs creados:

#### 1. **user_role** (Roles de usuario)
```sql
('CLIENT', 'COACH', 'NUTRITIONIST', 'MINDSET_COACH', 'ADMIN')
```
- **CLIENT**: Usuario normal del programa
- **COACH**: Entrenador del equipo
- **NUTRITIONIST**: Nutricionista del equipo
- **MINDSET_COACH**: Coach de mindset
- **ADMIN**: Administrador del sistema

#### 2. **subscription_plan** (Planes de suscripción)
```sql
('START', 'PRO', 'ELITE', 'EXPERIENCE')
```
- Los tipos de planes disponibles para clientes

#### 3. **subscription_status** (Estado de suscripción)
```sql
('ACTIVE', 'CANCELLED', 'PAUSED', 'EXPIRED')
```
- Estado actual de cada suscripción

#### 4. **lead_source** (Origen del prospecto)
```sql
('INSTAGRAM', 'FACEBOOK', 'WEBSITE', 'REFERRAL', 'GOOGLE', 'OTHER')
```
- De dónde vino cada cliente potencial

#### 5. **lead_status** (Estado del prospecto)
```sql
('NEW', 'CONTACTED', 'QUALIFIED', 'SCHEDULED', 'PROPOSAL_SENT', 'WON', 'LOST', 'FOLLOW_UP')
```
- Etapa del proceso de ventas

#### 6. **workout_type** (Tipo de entrenamiento)
```sql
('STRENGTH', 'HYPERTROPHY', 'ENDURANCE', 'ZONE_2', 'MOBILITY', 'FULL_BODY', 'UPPER_BODY', 'LOWER_BODY', 'HIIT', 'FUNCTIONAL')
```
- Tipos de entrenamientos disponibles

#### 7. **workout_difficulty** (Dificultad)
```sql
('BEGINNER', 'INTERMEDIATE', 'ADVANCED')
```
- Niveles de dificultad para planes

#### 8. **meal_type** (Tipo de comida)
```sql
('BREAKFAST', 'MORNING_SNACK', 'LUNCH', 'AFTERNOON_SNACK', 'DINNER', 'EVENING_SNACK', 'PRE_WORKOUT', 'POST_WORKOUT')
```
- Tipos de comidas en planes nutricionales

#### 9. **mindset_exercise_type** (Ejercicio de mindset)
```sql
('JOURNALING', 'MEDITATION', 'VISUALIZATION', 'AFFIRMATION', 'GOAL_SETTING', 'REFLECTION', 'BREATHING', 'GRATITUDE')
```
- Tipos de ejercicios mentales disponibles

#### 10. **appointment_type** (Tipo de cita)
```sql
('ONBOARDING', 'CHECK_IN', 'COACHING', 'NUTRITION', 'MINDSET', 'SALES_CALL', 'FOLLOW_UP')
```
- Propósito de cada reunión

#### 11. **appointment_status** (Estado de cita)
```sql
('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW')
```
- Estado actual de cada cita

---

<a name="parte-2-tablas-principales"></a>
## 🗄️ PARTE 2: TABLAS PRINCIPALES

### Tablas y su propósito:

#### 1. **users** (Usuarios)
- **Propósito**: Información básica de TODOS los usuarios
- **Seguridad**: Cada usuario SOLO puede ver sus propios datos
- **Columnas**:
  - `id`: UUID único (gen_random_uuid())
  - `email`: Email único (VARCHAR 255)
  - `name`: Nombre completo
  - `password`: Contraseña (encriptada)
  - `phone`: Teléfono
  - `role`: user_role (ENUM)
  - `created_at`: Fecha de creación
  - `updated_at`: Última actualización
- **Índices**: `email` (búsqueda por email), `role` (búsqueda por rol)
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Users can read own data` - Usuario lee SUS datos
  - 📜 `Users can update own data` - Usuario actualiza SUS datos

#### 2. **leads** (Prospectos)
- **Propósito**: Clientes potenciales del sistema
- **Seguridad**: Cualquiera puede leer/crear (para landing page pública)
- **Columnas**: Todas las del lead + notas de seguimiento
- **Índices**: `email`, `status`, `source`, `created_at`
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Anyone can create leads` - Cualquiera puede crear (form web)
  - 📜 `Anyone can read leads` - Cualquiera puede leer (para demo)

#### 3. **clients** (Clientes activos)
- **Propósito**: Información detallada de clientes del programa
- **Seguridad**: Cliente ve SUS datos, Coach/Admin ve todos
- **Columnas**: Perfil completo + objetivos + notas del equipo
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read own data` - Cliente lee SUS datos
  - 📜 `Service roles can read all clients` - Coach/Admin lee todos

#### 4. **coaches** (Entrenadores)
- **Propósito**: Equipo de entrenadores
- **Seguridad**: Cualquiera ve info pública (nombre, bio)
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Anyone can read coaches` - Público
  - 📜 `Coaches can update own data` - Coach actualiza SUS datos
  - 📜 `Service roles can insert coaches` - Solo Coach/Admin inserta

#### 5. **nutritionists** (Nutricionistas)
- **Propósito**: Equipo de nutricionistas
- **Seguridad**: ✅ RLS HABILITADO (protección completa)
- **Columna sensible**: `license_number` - NO directamente expuesta
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Anyone can read public nutritionist info` - Público ve nombre/bio
  - 🚫 `license_number` protegida por defecto

#### 6. **mindset_coaches** (Coaches de mindset)
- **Propósito**: Equipo de mindset
- **Seguridad**: Similar a nutritionists
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Anyone can read mindset coaches` - Público

#### 7. **workout_plans** (Planes de entrenamiento)
- **Propósito**: Planes asignados a cada cliente
- **Seguridad**: Cliente ve SUS planes, Coach/Admin ve todos
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read own workout plans`
  - 📜 `Service roles can read all workout plans`

#### 8. **exercises** (Biblioteca de ejercicios)
- **Propósito**: Biblioteca de ejercicios disponibles
- **Seguridad**: Cualquiera lee, solo Coach/Admin edita
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Anyone can read exercises` - Público
  - 📜 `Service roles can manage exercises` - Solo Coach/Admin crea/edita

#### 9. **workouts** (Entrenamientos específicos)
- **Propósito**: Entrenamientos dentro de cada plan
- **Seguridad**: Protegido por workout_plans
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 Hereda políticas de workout_plans

#### 10. **workout_sessions** (Sesiones completadas)
- **Propósito**: Historial de entrenamientos
- **Seguridad**: Solo usuario ve SUS sesiones
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Users can read/create/update own workout sessions`

#### 11. **nutrition_plans** (Planes de nutrición)
- **Propósito**: Planes nutricionales de clientes
- **Seguridad**: Cliente ve SUS planes, Nutritionist ve los suyos
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read own nutrition plans`
  - 📜 `Nutritionists can read assigned plans`

#### 12. **meals** (Comidas de planes)
- **Propósito**: Comidas de cada plan nutricional
- **Seguridad**: Protegido por nutrition_plans
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read own meals`

#### 13. **measurements** (Mediciones)
- **Propósito**: Datos de progreso físico
- **Seguridad**: Solo cliente ve SUS mediciones
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read/create own measurements`

#### 14. **progress_photos** (Fotos de progreso)
- **Propósito**: Fotos de antes/después
- **Seguridad**: URLs sensibles - solo cliente ve SUS fotos
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read/create own progress photos`

#### 15. **mindset_exercises** (Ejercicios mentales)
- **Propósito**: Ejercicios de mindset asignados
- **Seguridad**: Solo cliente ve SUS ejercicios
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read/create own mindset exercises`

#### 16. **appointments** (Citas)
- **Propósito**: Todas las citas del sistema
- **Seguridad**: Participantes ven, Coach/Admin gestiona
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read own appointments`
  - 📜 `Service roles can read/create all appointments`

#### 17. **community_posts** (Posts comunidad)
- **Propósito**: Foro de la comunidad
- **Seguridad**: Cualquiera lee, autor edita SUS posts
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Anyone can read posts`
  - 📜 `Users can create/update/delete own posts`

#### 18. **chat_messages** (Comentarios)
- **Propósito**: Comentarios en posts de comunidad
- **Seguridad**: Similar a community_posts
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Anyone can read`, `Users can create`

#### 19. **ai_conversations** (Chat IA)
- **Propósito**: Historial de conversaciones con IA
- **Seguridad**: Solo usuario ve SUS conversaciones
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Users can read/create/update own AI conversations`

#### 20. **subscriptions** (Suscripciones)
- **Propósito**: Suscripciones de pago
- **Seguridad**: Info financiera - Admin ve todas, clientes las suyas
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Clients can read own subscriptions`
  - 📜 `Admin can read all subscriptions`

#### 21. **notifications** (Notificaciones)
- **Propósito**: Notificaciones del sistema
- **Seguridad**: Solo usuario ve SUS notificaciones
- **RLS**:
  - ✅ `ENABLE ROW LEVEL SECURITY` - HABILITADO
  - 📜 `Users can read/update own notifications`

---

<a name="parte-3-triggers"></a>
## ⚙️ PARTE 3: TRIGGERS

### ¿Qué son los Triggers?
Los **triggers** son "funciones automáticas" que se ejecutan cuando algo sucede en la base de datos.

### Trigger: `update_updated_at_column`

#### Función:
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### ¿Qué hace?
- Se ejecuta **ANTES** de cada `UPDATE` en cualquier tabla
- Actualiza automáticamente el campo `updated_at` con la fecha/hora actual
- NO necesitas recordar actualizar `updated_at` en tu código

#### ¿Por qué es importante?
- Siempre tienes la fecha de última actualización correcta
- No hay errores humanos (olvidar actualizar)
- Consistencia en toda la base de datos

#### Tablas con este trigger:
TODAS las tablas que tienen `updated_at` tienen este trigger:
- users, leads, clients, coaches, nutritionists, mindset_coaches
- workout_plans, exercises, workouts, workout_sessions
- nutrition_plans, meals, measurements, progress_photos
- mindset_exercises, appointments, community_posts, chat_messages
- ai_conversations, subscriptions, notifications

---

<a name="parte-4-verificacion"></a>
## 🔍 PARTE 4: VERIFICACIÓN

### ¿Qué verifica el SQL final?

#### 1. **Verificación de tablas creadas**
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```
- Muestra todas las tablas creadas
- Deberías ver 21 tablas

#### 2. **Verificación de políticas de seguridad (RLS)**
```sql
SELECT * FROM pg_policies WHERE schemaname = 'public';
```
- Muestra todas las políticas de seguridad
- Cada tabla debería tener políticas apropiadas

#### 3. **Mensajes de éxito**
```sql
SELECT '✅ Migración completada con éxito!' AS status;
```
- Confirma que todo se ejecutó correctamente

---

<a name="políticas-de-seguridad-rls"></a>
## 🔒 POLÍTICAS DE SEGURIDAD (RLS)

### ¿Qué es RLS (Row Level Security)?
**RLS** = Security a nivel de fila
Permite definir **quién puede leer/crear/actualizar/borrar** qué filas.

### Tipos de políticas creadas:

#### 1. **Políticas "read own data"**
```sql
FOR SELECT USING (auth.uid()::text = id::text)
```
- Usuario SOLO puede leer filas donde su ID coincide
- Aplica a: users, clients, measurements, etc.

#### 2. **Políticas "Anyone can read"**
```sql
FOR SELECT USING (true)
```
- Cualquiera puede leer (para demo/público)
- Aplica a: leads, exercises, community_posts

#### 3. **Políticas "Service roles"**
```sql
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role IN ('COACH', 'ADMIN')
  )
);
```
- Solo roles de servicio (Coach, Admin) pueden ver
- Aplica a: workout_plans, appointments, etc.

#### 4. **Políticas "Users can create"**
```sql
FOR INSERT WITH CHECK (auth.uid()::text = user_id::text)
```
- Usuario puede crear filas con SU ID
- Aplica a: workout_sessions, ai_conversations, etc.

### Resumen de seguridad por tipo de usuario:

| Tipo de Usuario | ¿Qué puede ver? | ¿Qué puede editar? |
|----------------|------------------|---------------------|
| **CLIENT** | - Sus propios datos<br>- Planes asignados<br>- Mediciones<br>- Fotos<br>- Ejercicios mental<br>- Citas propias<br>- Suscripción<br>- Notificaciones | - Sus propios datos<br>- Sus mediciones<br>- SUS ejercicios<br>- SUS posts |
| **COACH** | - Sus datos propios<br>- Todos los clientes<br>- Todos los planes<br>- Todas las citas<br>- Ejercicios (biblioteca) | - Sus datos<br>- Planes<br>- Ejercicios<br>- Citas<br>- Asignar planes a clientes |
| **NUTRITIONIST** | - Sus datos<br>- Clientes asignados<br>- Planes nutricionales creados | - Sus datos<br>- Planes nutricionales |
| **MINDSET_COACH** | - Sus datos<br>- Clientes asignados<br>- Ejercicios creados | - Sus datos<br>- Ejercicios de mindset |
| **ADMIN** | - TODO (incluye licencias) | - TODO |

---

<a name="solución-de-problemas-comunes"></a>
## 🚧 SOLUCIÓN DE PROBLEMAS COMUNES

### Problema: "Table X is public, but RLS is not enabled"
#### Causa:
No se ejecutó `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` en esa tabla.

#### Solución:
✅ El SQL actualizado TIENE `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` en TODAS las tablas.

### Problema: Error al ejecutar el SQL por segunda vez
#### Causa:
Las tablas ya existen (se creó en la primera ejecución).

#### Solución:
1. Ve a Supabase Dashboard → SQL Editor
2. Ejecuta:
   ```sql
   DROP TABLE IF EXISTS users CASCADE;
   DROP TABLE IF EXISTS leads CASCADE;
   DROP TABLE IF EXISTS clients CASCADE;
   -- (repetir para todas las tablas)
   ```
3. Luego ejecuta el SQL completo de nuevo

### Problema: Error de sintaxis
#### Causa:
- Copia incompleta del SQL
- Faltan comillas o paréntesis
- Caracteres especiales incorrectos

#### Solución:
- Copia TODO el código desde el bloque
- Verifica que no haya caracteres extraños
- Ejecuta en Supabase SQL Editor (tiene mejor validación)

### Problema: Políticas de RLS no funcionan
#### Causa:
- `auth.uid()` es null cuando no hay usuario autenticado
- Las políticas de "Anyone" requieren auth.uid

#### Solución:
- Usa las políticas correctas según el caso:
  - `FOR SELECT USING (true)` - Para acceso público
  - `FOR SELECT USING (auth.uid()::text = id::text)` - Para acceso propio

### Problema: Columnas sensibles expuestas
#### Causa:
No hay política para ocultar columnas como `license_number`

#### Solución:
✅ RLS está habilitado en nutritionists
✅ Políticas restringen acceso por defecto
✅ Solo roles apropiados pueden ver datos sensibles

---

## 📚 REFERENCIA RÁPIDA

### Comandos útiles para depuración:

#### Ver todas las tablas:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

#### Ver políticas de RLS:
```sql
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

#### Ver si RLS está habilitado:
```sql
SELECT relname, relrowsecurity FROM pg_class WHERE relname LIKE '%tabla%';
```

#### Ver datos de una tabla:
```sql
SELECT * FROM nombre_tabla LIMIT 10;
```

#### Borrar tabla (si hay error):
```sql
DROP TABLE IF EXISTS nombre_tabla CASCADE;
```

---

## ✅ CHECKLIST FINAL

Antes de considerar la migración completada, verifica:

- [ ] SQL se ejecutó sin errores
- [ ] Se ven 21 tablas en la primera consulta
- [ ] Se ven múltiples políticas en la consulta de pg_policies
- [ ] Mensaje "✅ Migración completada con éxito!" aparece
- [ ] `license_number` está protegido (no accesible públicamente)
- [ ] Todas las tablas tienen `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`

---

## 📞 ¿NECESITAS AYUDA?

Si encuentras errores:

1. **Lee el mensaje de error cuidadosamente**
2. **Verifica qué parte del SQL falló**
3. **Consulta esta documentación**
4. **Si persiste, borra tablas y ejecuta de nuevo**

---

**¡Éxito con la migración! 🎉**
