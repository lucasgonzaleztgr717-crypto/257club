# 🚀 INSTRUCCIONES RÁPIDAS - Haz esto ahora

---

## ✅ PASO 1 - Copiar SQL y pegar en Supabase

**Dónde está el código:**
```
/home/z/my-project/supabase-migration.sql
```

**Qué hacer:**
1. Abre ese archivo en tu editor
2. Copia TODO (Ctrl+A, Ctrl+C)
3. Ve a https://supabase.com/dashboard
4. Entra a tu proyecto
5. Ve a **SQL Editor** (en el menú lateral)
6. Pega el código (Ctrl+V)
7. Haz clic en **RUN**
8. Espera a que termine y veas: `✅ Migración completada con éxito!`

---

## ✅ PASO 2 - Obtener contraseña de base de datos

**Qué hacer:**
1. En Supabase Dashboard → **Settings** → **Database**
2. Busca "Database Password"
3. Copia la contraseña

---

## ✅ PASO 3 - Actualizar archivo .env.local

**Dónde está el archivo:**
```
/home/z/my-project/.env.local
```

**Qué cambiar:**
Busca esta línea:
```
DATABASE_URL=postgresql://postgres:your_database_password@db.lwvwvqghpuxxxlmwbvwuawxkqwz.supabase.co:5432/postgres
```

Cámbiala por (reemplaza `your_database_password` con la contraseña real):
```
DATABASE_URL=postgresql://postgres:TU_CONTRASEÑA_REAL@db.lwvwvqghpuxxxlmwbvwuawxkqwz.supabase.co:5432/postgres
```

---

## ✅ PASO 4 - Probar

**Qué hacer:**
1. Abre tu navegador: `http://localhost:3000`
2. Prueba el formulario de leads en la landing page
3. Ve a Supabase Dashboard → **Table Editor** → **leads**
4. Deberías ver el lead que creaste

---

## 📝 RESUMEN

- **Archivo SQL para ejecutar:** `/home/z/my-project/supabase-migration.sql`
- **Archivo para actualizar:** `/home/z/my-project/.env.local`
- **Pegar SQL en:** Supabase Dashboard → SQL Editor → RUN
- **Obtener contraseña en:** Supabase Dashboard → Settings → Database

---

**¿Preguntas?** Revisa el archivo detallado: `/home/z/my-project/GUIA_CONFIGURACION_SUPABASE.md`
