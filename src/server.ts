import express from 'express';
import 'dotenv/config';
import { authRouter } from './routes/authRoutes';
import { connectDB } from './config/db';


connectDB();


export const app = express();

app.use(express.json())

app.use('/', authRouter);
