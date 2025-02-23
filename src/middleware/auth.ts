import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Udvid Request typen med user property
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            };
        }
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Ingen token fundet' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as { userId: string };
        req.user = { id: decoded.userId };
        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Ugyldig token' });
    }
}; 