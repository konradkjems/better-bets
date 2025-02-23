import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Valider input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Alle felter skal udfyldes' });
        }

        // Tjek om bruger allerede eksisterer
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email er allerede i brug' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Opret ny bruger
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generer JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'default-secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Bruger oprettet',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Fejl ved registrering:', error);
        res.status(500).json({ message: 'Der opstod en fejl ved registrering' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Valider input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email og password skal udfyldes' });
        }

        // Find bruger
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Ugyldig email eller password' });
        }

        // Valider password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Ugyldig email eller password' });
        }

        // Generer JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'default-secret',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login succesfuldt',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Fejl ved login:', error);
        res.status(500).json({ message: 'Der opstod en fejl ved login' });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        // Bruger ID kommer fra auth middleware
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Ikke autoriseret' });
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Bruger ikke fundet' });
        }

        res.json(user);
    } catch (error) {
        console.error('Fejl ved hentning af profil:', error);
        res.status(500).json({ message: 'Der opstod en fejl ved hentning af profil' });
    }
}; 