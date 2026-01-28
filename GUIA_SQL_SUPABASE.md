# 📋 GUÍA PASO A PASO - Copiar SQL en Supabase

## 🎯 Objetivo
Copiar y ejecutar los 4 archivos SQL en tu proyecto nuevo de Supabase para crear todas las tablas y configurar la seguridad.

---

## 📍 Paso 1: Abrir el SQL Editor en Supabase

1. Ve a: https://supabase.com/dashboard/project/xdjgjzwbvkkugxhzwkkg
2. En el menú lateral izquierdo, haz clic en **SQL Editor**
3. Verás una pantalla con un área grande de texto blanca

---

## 📝 Paso 2: Ejecutar los 4 archivos SQL (EN ORDEN IMPORTANTE)

Debes ejecutarlos en este orden exacto: 1 → 2 → 3 → 4

### 📄 PARTE 1: supabase-parte1.sql

1. **Abrir el archivo**: `/home/z/my-project/supabase-parte1.sql`
2. **Copiar TODO el contenido**:
   - Abre el archivo en tu editor de texto
   - Presiona `Ctrl + A` (o `Cmd + A` en Mac) para seleccionar todo
   - Presiona `Ctrl + C` (o `Cmd + C`) para copiar
3. **Pegar en SQL Editor**:
   - Regresa a la ventana del SQL Editor de Supabase
   - Presiona `Ctrl + V` (o `Cmd + V`) para pegar
4. **Ejecutar**:
   - Haz clic en el botón **RUN** (arriba a la derecha)
   - O presiona `Ctrl + Enter` (o `Cmd + Enter`)
5. **Verificar resultado**:
   - Deberías ver un mensaje verde: `Success. No rows returned`
   - O una salida que dice: `✅ Migración completada con éxito!`
6. **Limpiar el editor**:
   - Borra todo el contenido del SQL Editor
   - Haz clic en "New query" para crear uno limpio

### 📄 PARTE 2: supabase-parte2.sql

1. **Abrir el archivo**: `/home/z/my-project/supabase-parte2.sql`
2. **Copiar TODO el contenido**:
   - `Ctrl + A` para seleccionar todo
   - `Ctrl + C` para copiar
3. **Pegar en SQL Editor**
4. **Ejecutar**: Haz clic en **RUN**
5. **Verificar resultado**:
   - Deberías ver: `Success. No rows returned`
6. **Limpiar el editor**

### 📄 PARTE 3: supabase-parte3.sql

1. **Abrir el archivo**: `/home/z/my-project/supabase-parte3.sql`
2. **Copiar TODO el contenido**:
   - `Ctrl + A` para seleccionar todo
   - `Ctrl + C` para copiar
3. **Pegar en SQL Editor**
4. **Ejecutar**: Haz clic en **RUN**
5. **Verificar resultado**:
   - Deberías ver: `Success. No rows returned`
6. **Limpiar el editor**

### 📄 PARTE 4: supabase-parte4.sql

1. **Abrir el archivo**: `/home/z/my-project/supabase-parte4.sql`
2. **Copiar TODO el contenido**:
   - `Ctrl + A` para seleccionar todo
   - `Ctrl + C` para copiar
3. **Pegar en SQL Editor**
4. **Ejecutar**: Haz clic en **RUN**
5. **Verificar resultado**:
   - Deberías ver: `Success. No rows returned`
   - Y los resultados de las consultas de verificación

---

## ✅ Paso 3: Verificar que las tablas se crearon

### 3.1 Ir al Table Editor
1. En el menú lateral, haz clic en **Table Editor**
2. Deberías ver todas estas tablas en la lista:
   - ✅ users
   - ✅ leads
   - ✅ clients
   - ✅ coaches
   - ✅ nutritionists
   - ✅ mindset_coaches
   - ✅ workout_plans
   - ✅ exercises
   - ✅ workouts
   - ✅ workout_sessions
   - ✅ nutrition_plans
   - ✅ meals
   - ✅ measurements
   - ✅ progress_photos
   - ✅ mindset_exercises
   - ✅ appointments
   - ✅ community_posts
   - ✅ chat_messages
   - ✅ ai_conversations
   - ✅ subscriptions
   - ✅ notifications

### 3.2 Verificar políticas de seguridad
1. Entra a la tabla **leads**
2. Haz clic en **Protection** (o "Policies") en la parte superior
3. Deberías ver varias políticas como:
   - "Anyone can create leads"
   - "Anyone can read leads"

### 3.3 Probar con una consulta simple
1. Vuelve al **SQL Editor**
2. Escribe y ejecuta:
   ```sql
   SELECT COUNT(*) FROM leads;
   ```
3. Deberías ver: `0` (porque la tabla está vacía)

---

## 🚨 IMPORTANTE: El orden SI importa

El orden es CRUCIAL porque:
- **Parte 1** crea los tipos ENUM (tipos de datos personalizados)
- **Parte 2** crea tablas que dependen de los ENUM
- **Parte 3** crea más tablas
- **Parte 4** crea las últimas tablas y los triggers

Si ejecutas en el orden incorrecto, obtendrás errores como:
```
ERROR: type "user_role" does not exist
```

---

## 📊 Qué crea cada parte:

### Parte 1 (supabase-parte1.sql)
- ✅ 11 tipos ENUM (user_role, lead_source, etc.)
- ✅ 3 tablas: users, leads, clients
- ✅ Políticas de seguridad RLS para estas tablas

### Parte 2 (supabase-parte2.sql)
- ✅ 6 tablas: coaches, nutritionists, mindset_coaches, workout_plans, exercises, workouts
- ✅ Políticas de seguridad RLS

### Parte 3 (supabase-parte3.sql)
- ✅ 4 tablas: workout_sessions, nutrition_plans, meals, measurements
- ✅ Políticas de seguridad RLS

### Parte 4 (supabase-parte4.sql)
- ✅ 8 tablas: progress_photos, mindset_exercises, appointments, community_posts, chat_messages, ai_conversations, subscriptions, notifications
- ✅ Función trigger para actualizar `updated_at` automáticamente
- ✅ 21 triggers (uno por cada tabla)
- ✅ Consultas de verificación

---

## 🎉 ¡Listo!

Una vez que hayas ejecutado las 4 partes, tu base de datos de Supabase estará lista con:
- ✅ 21 tablas creadas
- ✅ 11 tipos ENUM creados
- ✅ RLS habilitado en TODAS las tablas
- ✅ Políticas de seguridad configuradas
- ✅ Triggers para actualización automática de `updated_at`

---

## ⚡ Atajos útiles

| Acción | Windows/Linux | Mac |
|--------|---------------|-----|
| Seleccionar todo | `Ctrl + A` | `Cmd + A` |
| Copiar | `Ctrl + C` | `Cmd + C` |
| Pegar | `Ctrl + V` | `Cmd + V` |
| Ejecutar SQL | `Ctrl + Enter` | `Cmd + Enter` |

---

## 🐛 Si tienes errores

### Error: "relation already exists"
**Solución**: Las tablas ya existen. No es un error grave. Continúa con la siguiente parte.

### Error: "type does not exist"
**Solución**: Verifica que hayas ejecutado la Parte 1 primero. Los ENUM se crean en la Parte 1.

### Error: "relation does not exist"
**Solución**: Verifica el orden. La Parte 2 depende de la Parte 1, etc.

### Error: "column does not exist"
**Solución**: Asegúrate de haber ejecutado todas las partes en orden.

---

## 📞 ¿Necesitas ayuda?

Si encuentras algún error:
1. Copia el mensaje de error completo
2. Revísalo con esta guía
3. Vuelve a ejecutar la parte que falló

¡Buena suerte! 🚀
