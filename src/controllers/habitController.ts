import type { Request, Response } from 'express';
import { Habit } from '../models/Habit';

export const getAllHabits = async (req: Request, res: Response) => {
    return;
}

export const createHabit = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        const newHabit = new Habit({
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