import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // Check om bruger allerede eksisterer
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email er allerede registreret' });
        }

        // Opret ny bruger
        const user = new User({
            email,
            password,
            name
        });

        await user.save();

        // Generer JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Bruger oprettet succesfuldt',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Der skete en fejl ved registrering', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find bruger
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Ugyldig email eller password' });
        }

        // Verificer password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Ugyldig email eller password' });
        }

        // Generer JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login succesfuldt',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Der skete en fejl ved login', error });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Bruger ikke fundet' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Der skete en fejl ved hentning af profil', error });
    }
}; 