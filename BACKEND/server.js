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

//Middlewares
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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