# 🚀 GUÍA DE DESPLIEGUE - E-COMMERCE TECHINSUMOS

## Opciones de Hosting Gratuito

### Opción 1: Render (Recomendado)
- **Backend**: https://render.com
- **Frontend**: Integrado o Vercel

### Opción 2: Railway + Vercel
- **Backend**: https://railway.app
- **Frontend**: https://vercel.com

---

## 📋 PRE-REQUISITOS

Antes de desplegar, necesitas:

1. **Cuenta en MongoDB Atlas** (gratuito):
   - Ve a https://www.mongodb.com/cloud/atlas
   - Crea una cuenta gratuita
   - Crea un cluster gratuito
   - Crea un usuario de base de datos
   - Obtén la cadena de conexión

2. **Cuenta en Cloudinary** (gratuito):
   - Ve a https://cloudinary.com
   - Crea una cuenta gratuita
   - Obtén tus credenciales (Cloud Name, API Key, API Secret)

3. **Cuenta en GitHub** (para conectar con Render)

---

## 🔧 DESPLIEGUE DEL BACKEND EN RENDER

### Paso 1: Preparar el Backend

1. Sube tu código a GitHub:
   ```bash
   cd BACKEND
   git init
   git add .
   git commit -m "Preparado para producción"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

### Paso 2: Crear Web Service en Render

1. Ve a https://dashboard.render.com
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: techinsumos-backend
   - **Root Directory**: BACKEND
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start

### Paso 3: Configurar Variables de Entorno

En la sección "Environment Variables" de Render, agrega:

```
PORT=8000
MONGO_URI=tu_cadena_mongodb_atlas
JWT_SECRET=una_clave_secreta_larga_y_segura
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### Paso 4: Desplegar

1. Click en "Create Web Service"
2. Espera a que compile (puede tomar 3-5 minutos)
3. Tu backend estará en: `https://techinsumos-backend.onrender.com`

---

## 🎨 DESPLIEGUE DEL FRONTEND EN VERCEL

### Paso 1: Preparar el Frontend

1. Ve a https://vercel.com
2. Importa tu repositorio de GitHub
3. Configura:
   - **Framework Preset**: Vite
   - **Root Directory**: FRONTEND
   - **Build Command**: npm run build
   - **Output Directory**: dist

### Paso 2: Configurar Variables de Entorno

En Vercel, agrega:

```
VITE_API_URL=https://tu-backend.onrender.com/api
```

### Paso 3: Desplegar

1. Click en "Deploy"
2. Tu frontend estará en: `https://tu-proyecto.vercel.app`

---

## ⚠️ IMPORTANTE: Actualizar el Frontend

Después de desplegar el backend, actualiza el archivo `.env` del frontend:

```
VITE_API_URL=https://tu-backend.onrender.com/api
```

Y vuelve a desplegar el frontend.

---

## 🔍 VERIFICACIÓN

### Probar el Backend:
```bash
curl https://tu-backend.onrender.com/api/products
```

### Probar el Frontend:
1. Ve a tu URL de Vercel
2. Verifica que el catálogo cargue
3. Prueba crear un usuario
4. Prueba crear un producto

---

## 💰 Costos

- **Render**: Gratis (750 horas/mes, asleep después de 15 min)
- **Vercel**: Gratis (100GB bandwidth/mes)
- **MongoDB Atlas**: Gratis (512MB storage)
- **Cloudinary**: Gratis (25GB bandwidth/mes)

---

## 🔒 Notas de Seguridad

1. **JWT_SECRET**: Usa una clave larga y aleatoria
2. **No expongas** tus credenciales de MongoDB
3. **CORS**: Configurado para localhost en desarrollo
4. **Variables de entorno**: Nunca las cometas en Git

---

## 🆘 Solución de Problemas

### Error de conexión MongoDB:
- Verifica que la URI sea correcta
- Asegúrate de que tu IP esté whitelist en Atlas

### Error de Cloudinary:
- Verifica las credenciales
- Asegúrate de que el API Secret sea correcto

### Error de CORS:
- En backend/server.js, cambia:
```javascript
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
```
Por:
```javascript
app.use(cors({ origin: true })); // Permite todos en producción
```

O especifica tu dominio de Vercel:
```javascript
app.use(cors({ origin: ['https://tu-proyecto.vercel.app'] }));
```

---

## ✅ Checklist de Despliegue

- [ ] Cuenta en MongoDB Atlas creada
- [ ] Cluster gratuito creado
- [ ] Usuario de base de datos creado
- [ ] Credenciales de Cloudinary obtenidas
- [ ] Código subido a GitHub
- [ ] Backend desplegado en Render
- [ ] Frontend desplegado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Prueba de funcionalidad completada

---

¡Listo! Tu e-commerce estará disponible en línea 🚀