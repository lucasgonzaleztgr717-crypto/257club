# Configuración Supabase - 257Club Transformación Consciente

## ✅ Migración Completada

### Base de Datos
- **Project URL**: `https://xdjgjzwbvkkugxhzwkkg.supabase.co`
- **Anon Key**: `sb_publishable_SYzCqTsDZzEa-r5_NpXPEg_NFqlhND0`
- **Status**: ✅ Base de datos creada y configurada

### Tablas Creadas (21 total)
1. ✅ users - Usuarios del sistema
2. ✅ leads - Prospectos/leads
3. ✅ clients - Clientes activos
4. ✅ coaches - Entrenadores
5. ✅ nutritionists - Nutricionistas
6. ✅ mindset_coaches - Coaches de mindset
7. ✅ workout_plans - Planes de entrenamiento
8. ✅ exercises - Ejercicios de la biblioteca
9. ✅ workouts - Entrenamientos específicos
10. ✅ workout_sessions - Sesiones completadas
11. ✅ nutrition_plans - Planes de nutrición
12. ✅ meals - Comidas de planes nutricionales
13. ✅ measurements - Mediciones de progreso
14. ✅ progress_photos - Fotos de progreso
15. ✅ mindset_exercises - Ejercicios de mindset
16. ✅ appointments - Citas/reuniones
17. ✅ community_posts - Posts de la comunidad
18. ✅ chat_messages - Mensajes del chat
19. ✅ ai_conversations - Conversaciones con IA
20. ✅ subscriptions - Suscripciones de pago
21. ✅ notifications - Notificaciones del sistema

### Seguridad RLS
- ✅ RLS habilitado en TODAS las 21 tablas
- ✅ Políticas de seguridad implementadas
- ✅ Datos sensibles protegidos (license_number, datos financieros)

### Políticas Principales
- **Leads**: Cualquiera puede crear y leer (para demo)
- **Users**: Solo pueden leer/actualizar sus propios datos
- **Clients**: Pueden leer sus propios datos; coaches/admins pueden leer todos
- **Nutritionists**: Solo datos públicos visibles (sin license_number)
- **Subscriptions**: Solo admins pueden ver todas; clientes las suyas

## 📝 Configuración Frontend

### Archivo .env
```bash
# Local Database (Prisma)
DATABASE_URL=file:/home/z/my-project/db/custom.db

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xdjgjzwbvkkugxhzwkkg.supabase.co
DATABASE_SUPABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xdjgjzwbvkkugxhzwkkg.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_SYzCqTsDZzEa-r5_NpXPEg_NFqlhND0

# OpenAI Configuration
OPENAI_API_KEY=[SET_IN_ENV_VARIABLE]

# Twilio Configuration
TWILIO_ACCOUNT_SID=[SET_IN_ENV_VARIABLE]
TWILIO_AUTH_TOKEN=[SET_IN_ENV_VARIABLE]

# Local Paths
ICLOUD_PHOTOS_PATH=C:\Users\lucas\iCloudPhotos\Photos
```

### API Endpoints Disponibles
- ✅ `POST /api/leads` - Crear nuevo lead
- ✅ `GET /api/leads` - Obtener leads (con filtros)
- ✅ `POST /api/ai/chat` - Chat con IA

### Helpers de Supabase
- ✅ `createLead()` - Crear lead
- ✅ `getLeads()` - Obtener leads con filtros
- ✅ `getLeadByEmail()` - Buscar lead por email
- ✅ `updateLeadStatus()` - Actualizar estado de lead
- ✅ `addLeadNote()` - Agregar notas a lead
- ✅ `createUser()` - Crear usuario
- ✅ `getUserByEmail()` - Buscar usuario por email
- ✅ `createClient()` - Crear cliente
- ✅ `getClientByUserId()` - Obtener cliente por user_id
- ✅ `createMeasurement()` - Crear medición
- ✅ `getMeasurementsByClientId()` - Obtener mediciones de cliente
- ✅ `getLatestMeasurement()` - Obtener última medición
- ✅ `createAppointment()` - Crear cita
- ✅ `getAppointmentsByUserId()` - Obtener citas de usuario
- ✅ `updateAppointmentStatus()` - Actualizar estado de cita
- ✅ `saveAIConversation()` - Guardar conversación IA
- ✅ `getLatestAIConversation()` - Obtener última conversación IA

## 🧪 Pasos para Probar

### 1. Verificar en Supabase Dashboard
1. Ve a: https://supabase.com/dashboard/project/xdjgjzwbvkkugxhzwkkg
2. Abre **Table Editor**
3. Verifica que las 21 tablas estén ahí
4. Abre la tabla `leads` (debería estar vacía)

### 2. Probar Formulario de Leads
1. Abre la aplicación: http://localhost:3000
2. Completa el formulario en la landing page:
   - Nombre
   - Email
   - Teléfono
   - Objetivo
   - Puntos de dolor
   - Nivel de compromiso
3. Envía el formulario
4. Verifica en Supabase Dashboard → Table Editor → leads
5. Deberías ver el nuevo lead

### 3. Verificar Políticas de Seguridad
En Supabase SQL Editor, ejecuta:
```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Deberías ver múltiples políticas por tabla.

## 🚀 Próximos Pasos Sugeridos

1. **Implementar autenticación con Supabase Auth**
   - Configurar login/registro de usuarios
   - Integrar con NextAuth.js
   - Proteger rutas del dashboard

2. **Crear admin panel**
   - Ver y gestionar leads
   - Dashboard de métricas
   - Sistema de notificaciones

3. **Implementar notificaciones**
   - Email al crear lead
   - SMS con Twilio
   - Push notifications

4. **Integrar pagos**
   - Stripe o PayPal
   - Gestión de suscripciones
   - Webhooks

5. **Mejorar la IA**
   - Personalizar respuestas según rol
   - Integrar con historial de conversaciones
   - Agregar contexto de cliente

## 📚 Archivos Importantes

- `/home/z/my-project/src/lib/supabase.ts` - Cliente Supabase
- `/home/z/my-project/src/lib/supabase-helpers.ts` - Helpers para Supabase
- `/home/z/my-project/src/app/api/leads/route.ts` - API de leads
- `/home/z/my-project/.env` - Variables de entorno
- `/home/z/my-project/supabase-limpio.sql` - SQL completo de migración

## 📞 Soporte

Si encuentras algún error:
1. Revisa el dev.log: `/home/z/my-project/dev.log`
2. Verifica la consola del navegador
3. Ejecuta: `bun run lint` para revisar errores de código
