import express from 'express';
import 'dotenv/config';
import { authRouter } from './routes/authRoutes';
import { connectDB } from './config/db';
import { habitRouter } from './routes/habitRoutes';


connectDB();


export const app = express();

app.use(express.json())

app.use('/auth', authRouter);
app.use('/habit', habitRouter);
