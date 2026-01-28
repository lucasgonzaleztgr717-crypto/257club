# 📋 GUÍA PASO A PASO - Configuración de Supabase

## 🎯 RESUMEN
Esta guía te explica cómo configurar Supabase para que tu aplicación funcione correctamente.

---

## PASO 1: CREAR TABLAS EN SUPABASE (Obligatorio)

### ¿Qué hacer?
1. Entra a tu Supabase Dashboard: https://supabase.com/dashboard
2. Selecciona tu proyecto (el que tiene la URL que configuramos)
3. En el menú lateral, haz clic en **SQL Editor** (icono de terminal)
4. Abre el archivo: `/home/z/my-project/supabase-migration.sql`
5. Copia TODO el contenido de ese archivo (Ctrl+A, Ctrl+C)
6. En el SQL Editor de Supabase, pega el código (Ctrl+V)
7. Haz clic en el botón **RUN** (o presiona Ctrl+Enter)
8. Espera a que veas el mensaje: `✅ Migración completada con éxito!`

### ¿Qué hace este paso?
- Crea todas las tablas necesarias para tu aplicación
- Crea los tipos ENUM (status, roles, etc.)
- Crea índices para mejor rendimiento
- Configura triggers para actualizar automáticamente la fecha `updated_at`
- Configura Row Level Security (RLS) básico

### ✅ Cómo saber que funcionó:
Verás una lista de tablas al final del resultado:
```
| table_name        |
|-------------------|
| ai_conversations  |
| appointments      |
| clients           |
| ... y más         |
```

---

## PASO 2: OBTENER CONTRASEÑA DE BASE DE DATOS (Obligatorio)

### ¿Qué hacer?
1. En tu Supabase Dashboard, sigue en tu proyecto
2. En el menú lateral, haz clic en **Settings** (icono de engranaje) → **Database**
3. Busca la sección **Connection string** o **Database Password**
4. Haz clic en **Generate new password** (o copia la existente)
5. **IMPORTANTE:** Guarda esta contraseña en lugar seguro, la necesitarás

### ¿Qué necesitas anotar?
- La **contraseña** de la base de datos
- Esa contraseña tiene un formato como: `Aa1Bb2Cc3Dd4Ee5Ff6...`

---

## PASO 3: ACTUALIZAR ARCHIVO .env.local (Obligatorio)

### ¿Qué hacer?
1. Abre el archivo: `/home/z/my-project/.env.local`
2. Busca esta línea:
   ```
   DATABASE_URL=postgresql://postgres:your_database_password@db.lwvwvqghpuxxxlmwbvwuawxkqwz.supabase.co:5432/postgres
   ```
3. Reemplaza `your_database_password` con la contraseña que obtuviste en el PASO 2

### Ejemplo:
Si tu contraseña es `MiContraseñaSegura123`, quedaría así:
```
DATABASE_URL=postgresql://postgres:MiContraseñaSegura123@db.lwvwvqghpuxxxlmwbvwuawxkqwz.supabase.co:5432/postgres
```

### Guarda el archivo (Ctrl+S)

---

## PASO 4: VERIFICAR CONFIGURACIÓN

### ¿Qué hacer?
1. Abre tu aplicación en el navegador: `http://localhost:3000`
2. Ve a la landing page
3. Prueba el formulario de leads:
   - Nombre: `Test User`
   - Email: `test@test.com`
   - Teléfono: `123456789`
   - Objetivo: `Perder peso`
4. Haz clic en "Enviar"

### ✅ Cómo saber que funcionó:
- Deberías ver un mensaje de éxito
- No debería haber error de conexión

---

## PASO 5: VERIFICAR EN SUPABASE

### ¿Qué hacer?
1. En Supabase Dashboard, ve a **Table Editor**
2. Haz clic en la tabla **leads**
3. Deberías ver el lead que acabas de crear
4. También puedes ir a **ai_conversations** después de probar el chat

---

## RESUMEN RÁPIDO

| Paso | Acción | Dónde | Dificultad |
|------|---------|-------|------------|
| 1 | Copiar y pegar SQL en SQL Editor | Supabase Dashboard | 🟢 Fácil |
| 2 | Obtener contraseña de DB | Supabase Dashboard → Settings | 🟢 Fácil |
| 3 | Actualizar .env.local | Archivo en tu proyecto | 🟢 Fácil |
| 4 | Probar formulario | http://localhost:3000 | 🟢 Fácil |
| 5 | Verificar datos en Supabase | Supabase Dashboard → Table Editor | 🟢 Fácil |

---

## 📁 ARCHIVOS QUE NECESITAS

1. **Para ejecutar en Supabase:**
   - `/home/z/my-project/supabase-migration.sql` → Copiar y pegar en SQL Editor

2. **Para actualizar en tu proyecto:**
   - `/home/z/my-project/.env.local` → Actualizar con contraseña real

---

## ❓ PREGUNTAS FRECUENTES

### P: ¿Puedo ejecutar el SQL varias veces?
R: No, te dará error porque las tablas ya existen. Solo ejecuta una vez.

### P: ¿Qué pasa si me sale error al ejecutar el SQL?
R:
1. Verifica que copiaste TODO el código
2. Verifica que tienes permisos en el proyecto de Supabase
3. Si el error dice que algo ya existe, es normal si ya habías ejecutado antes

### P: ¿Es seguro poner la contraseña en .env.local?
R: Sí, es el archivo correcto para variables de entorno. .env.local está en .gitignore, así que no se sube a GitHub.

### P: ¿Qué URL debo usar en producción?
R:
- Usa la URL que ya está en .env.local: `https://lwvwvqghpuxxxlmwbvwuawxkqwz.supabase.co`
- Si esa no es la correcta, ve a Supabase Dashboard → Settings → API y copia el "Project URL"

---

## 🚀 LISTO PARA PRODUCCIÓN

Una vez que completas estos 5 pasos, tu aplicación está lista:

✅ Landing page capturando leads
✅ AI Chat funcionando con respuestas reales
✅ Todos los datos guardados en Supabase
✅ Aplicación lista para conectar clientes

---

## 📞 ¿NECESITAS AYUDA?

Si tienes problemas, verifica:

1. **Error de conexión:**
   - Verifica que DATABASE_URL tiene la contraseña correcta
   - Verifica que la URL de Supabase es correcta

2. **Error en SQL Editor:**
   - Verifica que copiaste TODO el código del archivo SQL
   - Revisa si ya ejecutaste el SQL antes (las tablas ya existen)

3. **Formulario no funciona:**
   - Revisa la consola del navegador (F12) por errores
   - Verifica el log de desarrollo: `/home/z/my-project/dev.log`

---

**¡Listo! Sigue estos pasos y tu aplicación funcionará correctamente con Supabase.** 🎉
