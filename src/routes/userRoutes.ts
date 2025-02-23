import express, { Router, RequestHandler } from 'express';
import { register, login, getProfile } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

// Public routes
router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);

// Protected routes
router.get('/profile', auth as RequestHandler, getProfile as RequestHandler);

export default router; 