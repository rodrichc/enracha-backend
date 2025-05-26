import type { Request, Response } from 'express';
import { Habit, IHabit } from '../models/Habit';
import { HabitLog } from '../models/HabitLog';

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
            description,
            createdAt: Date.now(),
        });

        const savedHabit = await newHabit.save();

        res.status(201).json(savedHabit);
    } 
    
    catch (error) {
        res.status(500).json({ error: 'Hubo un error al crear el hábito' });
    }
}

export const getHabit = async (req: Request, res: Response) => {
    try {
        const { habitId } = req.params;

        const habit = await Habit.findOne({ _id: habitId, userId: req.user!._id });
        if (!habit) {
        return res.status(404).json({ error: 'Hábito no encontrado' });
        }

        res.json( habit );

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la información del hábito' });
    }
}

export const updateHabit = async (req: Request, res: Response) => {
    return;
}

export const deleteHabit = async (req: Request, res: Response) => {
    return;
}