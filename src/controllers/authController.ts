import type { Request, Response } from 'express';
import slug from 'slug';
import { User } from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt';


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

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.username = username;

    await user.save();
    res.status(201).send('Registro Creado Correctamente');
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user){
        const error = new Error('Email no registrado');
        return res.status(404).json({ error: error.message });
    }

    const isPasswordCorrect = await checkPassword(password, user.password);
    if(!isPasswordCorrect){
        const error = new Error('Contraseña Incorrecta');
        return res.status(401).json({ error: error.message });
    }

    const token = generateJWT({ id: user._id });

    res.send(token);
}
