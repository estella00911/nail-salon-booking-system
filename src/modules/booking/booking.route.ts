import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { createBookingController, getBookingByIdController, getMyBookingsController } from './booking.controller.js';
import { validateIdParams } from '../../middleware/validate.middleware.js';

const router = Router();

router.use(requireAuth);

router.post('/', createBookingController);
router.get('/me', getMyBookingsController);
router.get('/:id', validateIdParams, getBookingByIdController);

export default router;