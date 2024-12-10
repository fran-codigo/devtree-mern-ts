import express, { json } from 'express';
import AuthRoutes from './routes/auth.routes';

const app = express();

// Leer datos de formulario
app.use(json())

// Routing
app.use('/api', AuthRoutes);

export default app;
