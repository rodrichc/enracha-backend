import { Router } from "express";

export const router = Router();

router.get('/hi', (req, res) => {
    res.send('Hi World!');
});