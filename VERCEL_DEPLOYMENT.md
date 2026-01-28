# 🚀 Cómo Desplegar en Vercel

## 📋 Requisitos Previos

1. **Cuenta de GitHub** con el código subido
2. **Cuenta de Vercel** gratuita
3. **Proyecto Supabase** configurado
4. **Clave de OpenAI** (para la IA)

---

## 🌐 Paso 1: Subir el Código a GitHub

### 1.1 Crear un repositorio en GitHub
1. Ve a https://github.com/new
2. Crea un repositorio nuevo (público o privado)
3. Copia la URL del repositorio

### 1.2 Inicializar Git y subir el código

En tu terminal/local:

```bash
# Navega al directorio del proyecto
cd /ruta/a/tu/proyecto

# Inicializa Git
git init

# Agrega todos los archivos
git add .

# Haz el primer commit
git commit -m "Initial commit - 257Club Fitness App"

# Agrega el remoto (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Sube el código
git branch -M main
git push -u origin main
```

---

## 🚀 Paso 2: Desplegar en Vercel

### 2.1 Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. Inicia sesión con GitHub (más fácil)

### 2.2 Importar el proyecto
1. En Vercel Dashboard, haz clic en **"Add New..."** → **"Project"**
2. Vercel te mostrará tus repositorios de GitHub
3. Busca y selecciona tu repositorio de `257Club`

### 2.3 Configurar el proyecto

Vercel detectará automáticamente que es un proyecto Next.js. Configura:

**Environment Variables:**
1. Haz clic en **"Environment Variables"**
2. Agrega estas variables:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://elrbukxpktwaomecusfv.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_NwX02E1ZuSAE1os2dGKQcA_D_UNIQLb` |
| `OPENAI_API_KEY` | `[SET_IN_ENV_VARIABLE]` |

**Build Settings:**
- Framework Preset: **Next.js**
- Build Command: `bun run build`
- Output Directory: `.next`
- Install Command: `bun install`

### 2.4 Desplegar
1. Haz clic en **"Deploy"**
2. Espera unos minutos mientras Vercel construye la aplicación
3. ¡Listo! Tu aplicación estará en una URL como: `https://tu-proyecto.vercel.app`

---

## 🔧 Paso 3: Configurar Dominio Personal (Opcional)

### 3.1 Comprar un dominio
- Namecheap, GoDaddy, Google Domains, etc.

### 3.2 Configurar en Vercel
1. Ve a tu proyecto en Vercel Dashboard
2. Haz clic en **"Settings"** → **"Domains"**
3. Agrega tu dominio (ej: `257club.com`)
4. Vercel te dará instrucciones para configurar los DNS

### 3.3 Configurar DNS en tu proveedor de dominios
- Agrega los registros DNS que Vercel te indica
- Espera unos minutos a que se propaguen

---

## ✅ Paso 4: Verificar el Despliegue

1. **Visita la URL de Vercel** (ej: `https://tu-proyecto.vercel.app`)
2. **Prueba el formulario de leads**
3. **Verifica los datos en Supabase**:
   - Ve a Supabase Dashboard
   - Abre SQL Editor
   - Ejecuta: `SELECT * FROM leads ORDER BY created_at DESC;`
4. **Deberías ver los leads creados**

---

## 🔄 Actualizar el Despliegue

Cada vez que hagas cambios:

1. **Commit y push a GitHub:**
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```

2. **Vercel detectará los cambios automáticamente**
3. **Vercel hará un nuevo despliegue automáticamente**
4. **En unos minutos, la actualización estará en vivo**

---

## 📊 Monitorear el Despliegue

### Ver logs en Vercel
1. Ve a tu proyecto en Vercel Dashboard
2. Haz clic en **"Deployments"**
3. Selecciona el deployment
4. Haz clic en **"View Logs"**

### Ver métricas
1. Ve a **"Analytics"** en Vercel
2. Podrás ver:
   - Visitas
   - Tiempo de carga
   - Errores
   - Datos demográficos

---

## 🐛 Solución de Problemas

### Error: "Environment variables not found"
**Solución:**
1. Ve a Settings → Environment Variables en Vercel
2. Verifica que todas las variables estén configuradas
3. Re-depliega el proyecto

### Error: "Build failed"
**Solución:**
1. Ve a Deployments en Vercel
2. Haz clic en el deployment fallido
3. Mira los logs para ver qué error hay
4. Corrige el código y vuelve a hacer push

### Error: "Supabase connection failed"
**Solución:**
1. Verifica que la URL y clave de Supabase sean correctas
2. Verifica que RLS no esté bloqueando las conexiones
3. Revisa las políticas de seguridad

---

## 💡 Consejos Adicionales

### 1. Usar diferentes entornos
- **Development**: Local con tu propia base de datos
- **Production**: Vercel con Supabase

### 2. Optimizar para producción
- Comprimir imágenes
- Minificar código
- Usar CDN de Vercel (automático)

### 3. Seguridad
- Nunca commitear archivos `.env` a GitHub
- Usar variables de entorno de Vercel
- Habilitar HTTPS (automático en Vercel)

### 4. Backups
- Vercel guarda automáticamente cada deployment
- Puedes volver a versiones anteriores fácilmente

---

## 📞 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Integration](https://supabase.com/docs/guides/with-nextjs)

---

## 🎉 ¡Felicidades!

Ahora tienes tu aplicación **257Club Transformación Consciente** desplegada y accesible para todos en Internet!

**Tu URL será algo como:**
```
https://tu-proyecto.vercel.app
```

**O con tu propio dominio:**
```
https://257club.com
```

---

## 📝 Checklist de Despliegue

- [ ] Cuenta de GitHub creada
- [ ] Código subido a GitHub
- [ ] Cuenta de Vercel creada
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Deployment exitoso
- [ ] Aplicación accesible en URL de Vercel
- [ ] Formulario de leads funcionando
- [ ] Leads apareciendo en Supabase
- [ ] Dominio personal configurado (opcional)
