import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db';
import corsOptions from './config/cors';
import AuthRoutes from './routes/auth.routes';

const app = express();

connectDB();

app.use(cors(corsOptions));

// Leer datos de formulario
app.use(json());

// Routing
app.use('/api', AuthRoutes);

export default app;
