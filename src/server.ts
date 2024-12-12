import express, { json } from 'express';
import 'dotenv/config';
import { connectDB } from './config/db';
import AuthRoutes from './routes/auth.routes';

const app = express();

connectDB();

// Leer datos de formulario
app.use(json());

// Routing
app.use('/api', AuthRoutes);

export default app;
