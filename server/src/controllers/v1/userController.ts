import { Request, Response } from "express";
import * as userService from "../../services/v1/userService";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating user', error })
    }
}