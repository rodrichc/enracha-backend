import { Router } from 'express';
import { body } from 'express-validator';
import { createHabit, getAllHabits } from '../controllers/habitController';
import { authenticate } from '../middleware/auth';
import { checkInputErrors } from '../middleware/validation';

export const habitRouter = Router();

habitRouter.get('/', authenticate, getAllHabits);

habitRouter.post('/create', authenticate, 
    body('name')
        .notEmpty()
        .withMessage('El nombre del hábito no puede ir vacio'),
    checkInputErrors,
    createHabit
);