import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: '*', // En producción, reemplaza '*' por el dominio exacto de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta raíz: Mensaje de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '¡Bienvenido a la REST API de Tienda!',
    status: 'Online',
    version: '1.0.0',
    endpoints: {
      products: '/api/products'
    }
  });
});

// Rutas de módulos
app.use('/api/products', productRoutes);

export default app;