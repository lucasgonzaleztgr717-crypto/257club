# 🚀 Cómo Probar la Conexión a Supabase

## Paso 1: Verificar Base de Datos en Supabase

1. Abre tu Supabase Dashboard:
   https://supabase.com/dashboard/project/elrbukxpktwaomecusfv

2. En el menú izquierdo, haz clic en **Table Editor** (icono de tabla)

3. Verifica que las 21 tablas estén ahí:
   - users
   - leads
   - clients
   - coaches
   - nutritionists
   - mindset_coaches
   - workout_plans
   - exercises
   - workouts
   - workout_sessions
   - nutrition_plans
   - meals
   - measurements
   - progress_photos
   - mindset_exercises
   - appointments
   - community_posts
   - chat_messages
   - ai_conversations
   - subscriptions
   - notifications

4. Haz clic en la tabla `leads` (debería estar vacía)

## Paso 2: Probar el Formulario de Leads

1. Abre la aplicación en tu navegador:
   ```
   http://localhost:3000
   ```

2. Navega hacia abajo hasta encontrar el formulario de "Comienza Tu Transformación"

3. Completa el formulario con datos de prueba:
   - **Nombre**: Juan Pérez
   - **Email**: juan.perez@test.com
   - **Teléfono**: +5491112345678
   - **Objetivo**: Perder 10kg y ganar masa muscular
   - **Puntos de dolor**: No tengo tiempo, me desconecto rápido
   - **Nivel de compromiso**: 8 (1-10)

4. Haz clic en **"Obten tu Plan Gratis"**

5. Espera a que aparezca el mensaje de éxito

## Paso 3: Verificar el Lead en Supabase

1. Regresa al Supabase Dashboard → Table Editor → leads

2. Haz clic en **Refresh** (icono de flecha circular)

3. Deberías ver un nuevo registro con los datos que ingresaste

4. Haz clic en el registro para ver todos los campos:
   - id (UUID)
   - name
   - email
   - phone
   - source: "WEBSITE"
   - status: "NEW"
   - goals
   - pain_points
   - commitment
   - created_at
   - updated_at

## Paso 4: Verificar con SQL (Opcional)

En Supabase Dashboard, abre **SQL Editor** y ejecuta:

```sql
-- Ver todos los leads
SELECT * FROM leads ORDER BY created_at DESC;

-- Contar leads por estado
SELECT status, COUNT(*) as count
FROM leads
GROUP BY status;

-- Ver leads de hoy
SELECT * FROM leads
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

## Paso 5: Probar la API Directamente (Opcional)

Puedes probar la API directamente usando curl o Postman:

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "goal": "Test goal",
    "painPoints": "Test pain",
    "commitment": "5"
  }'
```

Deberías recibir una respuesta como:
```json
{
  "success": true,
  "lead": {
    "id": "uuid-here",
    "name": "Test User",
    "email": "test@example.com"
  },
  "message": "Lead creado correctamente"
}
```

## Paso 6: Verificar Políticas de Seguridad

En Supabase SQL Editor, ejecuta:

```sql
-- Ver todas las políticas
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Deberías ver varias políticas por tabla. Por ejemplo:
- leads: "Anyone can create leads" (INSERT)
- leads: "Anyone can read leads" (SELECT)
- users: "Users can read own data" (SELECT)
- users: "Users can update own data" (UPDATE)
- clients: "Clients can read own data" (SELECT)

## ✅ Checklist de Éxito

- [ ] Supabase Dashboard es accesible
- [ ] Las 21 tablas están creadas
- [ ] El formulario de la landing page se muestra
- [ ] El formulario se envía sin errores
- [ ] El lead aparece en Supabase Table Editor
- [ ] Los datos del lead son correctos
- [ ] Las políticas de seguridad están aplicadas

## 🐛 Troubleshooting

### Error al enviar el formulario

1. **Abre la consola del navegador** (F12 → Console)
2. Busca errores en rojo
3. Si dice "Supabase client not initialized":
   - Verifica que el archivo `.env` tenga las variables correctas
   - Reinicia el servidor de desarrollo

### El lead no aparece en Supabase

1. **Verifica la respuesta de la API** en la consola del navegador
2. **Revisa el servidor** (si estás en desarrollo)
3. **Verifica las credenciales** en el archivo `.env`:
   - NEXT_PUBLIC_SUPABASE_URL debe ser correcto
   - NEXT_PUBLIC_SUPABASE_ANON_KEY debe ser correcto

### Error de RLS (Row Level Security)

Si ves errores como "new row violates row-level security policy":

1. **Verifica las políticas** ejecutando el query del Paso 6
2. **Asegúrate de que las políticas permitan** la operación que intentas hacer
3. **Revisa que la política** tenga sentido para el caso de uso

## 📞 Ayuda

Si encuentras algún problema:

1. **Revisa los logs**: Abre la consola del navegador (F12)
2. **Verifica el servidor**: Asegúrate de que el servidor esté corriendo
3. **Revisa las credenciales**: Verifica que `.env` tenga los valores correctos
4. **Prueba la API**: Usa el comando curl del Paso 5 para probar directamente

## 🎉 ¡Felicidades!

Si todo funciona correctamente, ya tienes:
- ✅ Base de datos Supabase configurada
- ✅ 21 tablas con seguridad RLS
- ✅ API de leads funcional
- ✅ Formulario de landing page conectado
- ✅ Sistema listo para escalar

¡El siguiente paso sería implementar la autenticación de usuarios!
