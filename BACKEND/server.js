import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'


// Carga de variables de entorno
dotenv.config();

// Conexion a la base de datos
connectDB();

const app = express();

// CORS - permite el frontend de producción y localhost en desarrollo
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', 
  'http://localhost:5175',
  'http://localhost:3000',
  process.env.FRONTEND_URL // URL de Vercel en producción
].filter(Boolean);

const corsOptions = {
  origin: function(origin, callback) {
    // Permitir requests sin origen (como Postman) o si está en la lista permitida
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

//Ruta de prueba inicial
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

//Definicion del puerto
const PORT = process.env.PORT || 8000;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`);
})