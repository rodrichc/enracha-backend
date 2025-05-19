import type { Request, Response } from 'express';
import slug from 'slug';
import { User } from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'


export const createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error('Email no disponible');
        return res.status(409).json({ error: error.message });
    }

    const username = slug(req.body.username, '');
    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
        const error = new Error('Nombre de usuario no disponible');
        return res.status(409).json({ error: error.message });
    }

    const user = new User(req.body)
    user.password = await hashPassword(password);
    user.username = username;

    await user.save()
    res.status(201).send('Registro Creado Correctamente')
}


export const login = async (req: Request, res: Response) => {
    return;
}
