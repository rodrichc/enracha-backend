import { Router } from 'express';
import { body } from 'express-validator';
import { checkInputErrors } from '../middleware/validation';
import { createAccount, login } from '../controllers/authController';

export const authRouter = Router();


authRouter.post('/register',
    body('username')
        .notEmpty()
        .withMessage('El nombre de usuario no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener mínimo 8 caracteres'),
    checkInputErrors,
    createAccount
);

authRouter.post('/login',
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .notEmpty()
        .withMessage('El Password es obligatorio'),
    checkInputErrors,
    login
);
