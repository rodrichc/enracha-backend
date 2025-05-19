import jwt from 'jsonwebtoken';

export const generateJWT = (payload: object): string => {

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d'
    });
    
    return token;
}