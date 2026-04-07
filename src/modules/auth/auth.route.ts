import { Router } from 'express';
import { validateRegister, validateLogin } from './auth.validation.js';
import { createUserController, getCurrentUserController, loginUserController } from './auth.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/register', validateRegister, createUserController);
router.post('/login', validateLogin, loginUserController);
router.get('/me',  requireAuth, getCurrentUserController);

export default router;