import { Router } from 'express';
import { validateRegister, validateLogin } from './auth.validation.js';
import { createUserController, getCurrentUserController, loginUserController } from './auth.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: User register
 *     description: Create a new user with email, password, and name
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/RegisterSuccessResponse'
 *       400:
 *         $ref: '#/components/responses/RegisterInvalidInputResponse'

 *       409:
 *         $ref: '#/components/responses/EmailConflictResponse'
 */
router.post('/register', validateRegister, createUserController);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password, and return JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/LoginSuccessResponse'
 *       400:
 *         $ref: '#/components/responses/LoginInvalidInputResponse'
 *       401:
 *         $ref: '#/components/responses/LoginIncorrectInputResponse'
 */
router.post('/login', validateLogin, loginUserController);

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     description: Retrieve the currently authenticated user's profile
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMeSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/CurrentUserUnauthorizedResponse'
 */
router.get('/me',  requireAuth, getCurrentUserController);

export default router;