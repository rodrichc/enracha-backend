import { Router } from 'express';
import { checkLogHabit, getLogHabit } from '../controllers/habitLogsController';
import { authenticate } from '../middleware/auth';

export const habitLogRouter = Router();


habitLogRouter.post('/:habitId/check', authenticate, checkLogHabit);

habitLogRouter.get('/:habitId', authenticate, getLogHabit);
