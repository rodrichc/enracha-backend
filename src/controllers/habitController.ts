import type { Request, Response } from 'express';
import { Habit, IHabit } from '../models/Habit';

export const getAllHabits = async (req: Request, res: Response) => {
    try {
        const habits = await Habit.find({ userId: req.user!._id });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los hábitos' });
    }
   
}

export const createHabit = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        const newHabit: IHabit = new Habit({
            userId: req.user!._id, 
            name,
            description
        });

        const savedHabit = await newHabit.save();

        res.status(201).json(savedHabit);
    } 
    
    catch (error) {
        res.status(500).json({ error: 'Hubo un error al crear el hábito' });
    }
}