# 🚀 CÓMO DESPLEGAR EN VERCEL - GUIA PASO A PASO

## 📋 CONTENIDO
1. [Crear Repositorio en GitHub](#1-crear-repositorio-en-github)
2. [Conectar Git con el Repositorio](#2-conectar-git-con-el-repositorio)
3. [Subir el Código](#3-subir-el-código)
4. [Crear Cuenta en Vercel](#4-crear-cuenta-en-vercel)
5. [Importar Proyecto en Vercel](#5-importar-proyecto-en-vercel)
6. [Configurar Variables de Entorno](#6-configurar-variables-de-entorno)
7. [Desplegar](#7-desplegar)
8. [Verificar Deployment](#8-verification-deployment)
9. [Dominio Personal (Opcional)](#9-dominio-personal-opcional)

---

## 1️⃣ CREAR REPOSITORIO EN GITHUB

### 1.1 Entra a GitHub
Ve a: https://github.com/new

### 1.2 Crea el Repositorio

**Nombre del repositorio:**
- Puedes llamarlo: `257club-fitness-app`
- O el nombre que prefieras

**Configuración:**
- ☑️ Public (o Private si prefieres)
- ☐ NO marques "Add a README file"
- ☐ NO marques "Add .gitignore"
- ☐ NO marques "Choose a license"

### 1.3 Haz clic en "Create repository"

**IMPORTANTE:** GitHub te mostrará una página con instrucciones para subir código. **Copia la URL del repositorio**, será algo como:
```
https://github.com/TU_USUARIO/257club-fitness-app.git
```

---

## 2️⃣ CONECTAR GIT CON EL REPOSITORIO

El proyecto ya está inicializado con Git. Ahora necesitas conectarlo con tu repositorio de GitHub.

**Opción A: Si estás en la misma máquina donde está el código:**

```bash
cd /home/z/my-project

# Reemplaza con tu URL de GitHub
git remote add origin https://github.com/TU_USUARIO/257club-fitness-app.git

# Verifica el remoto
git remote -v
```

**Opción B: Si necesitas copiar el código a tu computadora:**

El proyecto ya está listo con:
- ✅ Código completo
- ✅ Git inicializado
- ✅ Commit hecho
- ✅ .gitignore configurado
- ✅ vercel.json configurado

Solo necesitas copiar estos archivos a tu computadora y luego ejecutar:
```bash
cd /ruta/del/proyecto
git remote add origin https://github.com/TU_USUARIO/257club-fitness-app.git
git branch -M main
git push -u origin main
```

---

## 3️⃣ SUBIR EL CÓDIGO

### 3.1 Verificar el estado de Git
```bash
git status
```

Deberías ver algo como:
```
On branch master
nothing to commit, working tree clean
```

### 3.2 Cambiar nombre de rama a "main"
```bash
git branch -M main
```

### 3.3 Subir a GitHub
```bash
git push -u origin main
```

Si te pide usuario y contraseña de GitHub:
- Usuario: Tu usuario de GitHub
- Contraseña: NO uses tu contraseña normal
- Usa un **Personal Access Token**:

**Cómo crear Personal Access Token:**
1. Ve a: https://github.com/settings/tokens
2. Haz clic en "Generate new token"
3. Selecciona: "repo" (todos los scopes de repo)
4. Genera el token y CÓPIALO (solo se muestra una vez)
5. Usa el token como contraseña cuando Git te la pida

### 3.4 Verificar que se haya subido
Ve a tu repositorio en GitHub y deberías ver todos los archivos.

---

## 4️⃣ CREAR CUENTA EN VERCEL

### 4.1 Entra a Vercel
Ve a: https://vercel.com

### 4.2 Regístrate
Haz clic en "Sign Up" y elige:
- ✅ **"Continue with GitHub"** (RECOMENDADO)
  - Es más fácil
  - Se conecta automáticamente con tu GitHub
  - Vercel puede leer tus repositorios automáticamente

O puedes registrarte con email si prefieres.

### 4.3 Verificar email
Vercel te enviará un email para verificar tu cuenta.
- Ve a tu email
- Haz clic en el enlace de verificación
- Regresa a Vercel

---

## 5️⃣ IMPORTAR PROYECTO EN VERCEL

### 5.1 Crear nuevo proyecto
1. En el Dashboard de Vercel, haz clic en **"Add New..."**
2. Selecciona **"Project"**

### 5.2 Importar desde GitHub
Vercel te mostrará tus repositorios de GitHub.

**Si el repositorio aparece:**
1. Busca `257club-fitness-app` (o el nombre que le diste)
2. Haz clic en **"Import"** junto al repositorio

**Si NO aparece:**
1. Haz clic en **"Adjust GitHub App Permissions"**
2. Asegúrate de que Vercel tenga acceso a todos tus repositorios
3. Haz clic en **"Save and Install"**
4. El repositorio debería aparecer ahora

### 5.3 Configurar el proyecto en Vercel

Vercel detectará automáticamente que es un proyecto Next.js.

**Configura estos valores:**

**Project Name:**
- Puedes dejar el que sugiere Vercel
- O cambiarlo: `257club-fitness`
- Este nombre será parte de tu URL: `257club-fitness.vercel.app`

**Framework Preset:**
- **Next.js** (debería estar seleccionado automáticamente)

**Root Directory:**
- Dejar vacío (`./`)

**Build Command:**
- `npm run build`

**Output Directory:**
- `.next`

**Install Command:**
- `npm install`

### 5.4 Haz clic en "Deploy"

No te preocupes, aún falta configurar las variables de entorno, lo haremos en el siguiente paso.

---

## 6️⃣ CONFIGURAR VARIABLES DE ENTORNO

### 6.1 Ir a Settings del Proyecto
En el proyecto de Vercel:
1. Haz clic en la pestaña **"Settings"**
2. En el menú lateral, haz clic en **"Environment Variables"**

### 6.2 Agregar Variables de Entorno

Haz clic en **"Add New"** para cada variable:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://xdjgjzwbvkkugxhzwkkg.supabase.co`
- **Environments:** Selecciona **Production**, **Preview**, **Development** (los tres)
- Haz clic en **"Save"**

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_SYzCqTsDZzEa-r5_NpXPEg_NFqlhND0`
- **Environments:** Selecciona **Production**, **Preview**, **Development** (los tres)
- Haz clic en **"Save"**

#### Variable 3: OPENAI_API_KEY
- **Name:** `OPENAI_API_KEY`
- **Value:** `[SET_IN_ENV_VARIABLE]`
- **Environments:** Selecciona **Production**, **Preview**, **Development** (los tres)
- Haz clic en **"Save"**

### 6.3 Verificar que las variables estén agregadas
Deberías ver las tres variables en la lista de Environment Variables.

---

## 7️⃣ DESPLEGAR

### 7.1 Ir a Deployments
En el proyecto de Vercel:
1. Haz clic en la pestaña **"Deployments"**
2. Haz clic en **"Redeploy"** (o espera a que el deployment actual termine si ya está corriendo)

### 7.2 Esperar al deployment
Vercel construirá y desplegará tu proyecto:
- ⏳ **Building** - Compilando el código
- ⏳ **Uploading** - Subiendo archivos
- ⏳ **Deploying** - Desplegando a los servidores
- ✅ **Ready** - ¡Despliegue completado!

Esto suele tomar **2-5 minutos** la primera vez.

### 7.3 Verificar estado
Deberías ver:
- ✅ Icono verde junto al deployment
- Status: **"Ready"**
- URL del proyecto (ej: `https://257club-fitness.vercel.app`)

---

## 8️⃣ VERIFICACIÓN DEPLOYMENT

### 8.1 Visitar la URL
Haz clic en la URL del deployment (o cópiala y pégala en tu navegador):
```
https://257club-fitness.vercel.app
```

O la que Vercel te asigne.

### 8.2 Verificar que la página cargue
Deberías ver la landing page de **"Transformación Consciente - by Lucas Gonzalez"**

### 8.3 Probar el formulario de leads
1. Completa el formulario con:
   - Nombre
   - Email
   - Teléfono
   - Objetivo
   - Puntos de dolor
   - Nivel de compromiso
2. Haz clic en **"Obtener mi Plan Gratis + Llamada"**
3. Deberías ver el mensaje de éxito

### 8.4 Verificar en Supabase
1. Ve a: https://supabase.com/dashboard/project/xdjgjzwbvkkugxhzwkkg
2. Entra a **SQL Editor**
3. Ejecuta:
   ```sql
   SELECT * FROM leads ORDER BY created_at DESC;
   ```
4. Deberías ver el lead que acabas de crear

---

## 9️⃣ DOMINIO PERSONAL (OPCIONAL)

Si quieres usar tu propio dominio (ej: `257club.com`):

### 9.1 Comprar dominio
- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Google Domains: https://domains.google.com

### 9.2 Configurar en Vercel
1. En tu proyecto de Vercel, ve a **Settings** → **Domains**
2. Haz clic en **"Add Domain"**
3. Escribe tu dominio: `257club.com` (o el que compraste)
4. Haz clic en **"Add"**

### 9.3 Configurar DNS
Vercel te mostrará los registros DNS que necesitas agregar:

**Si estás usando Namecheap:**
1. Entra a tu cuenta de Namecheap
2. Busca el dominio y haz clic en **"Manage"**
3. Ve a **"Advanced DNS"**
4. Agrega los registros que Vercel te indica:
   - **Tipo A**: `@` → `76.76.21.21` (o la IP que Vercel te indique)
   - **Tipo CNAME**: `www` → `cname.vercel-dns.com`

### 9.4 Esperar propagación DNS
La propagación puede tomar **desde 10 minutos hasta 48 horas**, pero usualmente es rápido (10-30 minutos).

### 9.5 Verificar
Una vez propagado, tu sitio estará en:
```
https://257club.com
```

---

## 🔄 ACTUALIZAR EL PROYECTO

Cada vez que hagas cambios:

### 1. Hacer commit local
```bash
git add .
git commit -m "Descripción del cambio"
```

### 2. Push a GitHub
```bash
git push
```

### 3. Vercel detecta cambios automáticamente
- Vercel hará un nuevo deployment automáticamente
- No necesitas hacer nada más

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema: "Build failed"
**Solución:**
1. Ve a **Deployments** en Vercel
2. Haz clic en el deployment fallido
3. Mira los logs para ver qué error hay
4. Corrige el código y haz push de nuevo

### Problema: "Environment variables not found"
**Solución:**
1. Ve a **Settings** → **Environment Variables**
2. Verifica que las 3 variables estén agregadas
3. Verifica que estén en Production, Preview y Development
4. Haz re-deploy

### Problema: "Supabase connection failed"
**Solución:**
1. Verifica que la URL de Supabase sea correcta
2. Verifica que la clave anon sea correcta
3. Revisa las políticas RLS en Supabase

### Problema: "Lead no se guarda en Supabase"
**Solución:**
1. Abre la consola del navegador (F12)
2. Mira si hay errores en rojo
3. Verifica que el email no exista ya en Supabase
4. Ejecuta SQL query para verificar leads

---

## 📞 AYUDA

Si encuentras algún problema:

### Revisa los logs
1. En Vercel, ve a **Deployments**
2. Haz clic en el deployment
3. Haz clic en **"View Logs"**

### Mira la consola del navegador
1. Presiona F12
2. Ve a la pestaña **Console**
3. Mira si hay errores

### Documentación
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase with Next.js](https://supabase.com/docs/guides/with-nextjs)

---

## ✅ CHECKLIST DE DEPLOYMENT

- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub
- [ ] Cuenta creada en Vercel
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas (3 variables)
- [ ] Deployment completado exitosamente
- [ ] Aplicación accesible en URL de Vercel
- [ ] Formulario de leads funcionando
- [ ] Leads apareciendo en Supabase
- [ ] Dominio personal configurado (opcional)

---

## 🎉 ¡FELICIDADES!

Tu aplicación **257Club Transformación Consciente** está ahora desplegada y accesible para todo el mundo en:

**URL de Vercel (gratis):**
```
https://257club-fitness.vercel.app
```

**O con tu dominio personal:**
```
https://257club.com
```

¡Ahora Lucas Gonzalez puede compartir el enlace con sus clientes y empezar a recibir leads!
