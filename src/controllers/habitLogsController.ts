import type { Request, Response } from 'express';
import { HabitLog } from '../models/HabitLog';
import { Habit } from '../models/Habit';


export const checkLogHabit = async (req: Request, res: Response) => {

  try {
    const { habitId } = req.params;
    const { completed } = req.body;


    const habit = await Habit.findOne({ _id: habitId, userId: req.user!._id });
    if (!habit) {
      return res.status(404).json({ error: 'Hábito no encontrado' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const log = await HabitLog.findOneAndUpdate(
      { habitId, date: today }, 
      { completed }, 
      { new: true, upsert: true } 
    );

    res.json(log);
    
  } catch (error) {
    res.status(500).json({ error: 'Error al crear o actualizar log' });
  }
}

export const getLogHabit = async (req: Request, res: Response) => {

    try {
        const { habitId } = req.params;

        const logs = await HabitLog.find({ habitId }).sort({ date: -1 });

        res.json( logs );

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los logs del hábito' });
    }

}
