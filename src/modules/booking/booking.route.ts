import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { cancelBookingByIdController, createBookingController, getBookingByIdController, getMyBookingsController } from './booking.controller.js';
import { validateIdParams } from '../../middleware/validate.middleware.js';

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     description: Create a new booking via service, artist, and time
 *     tags: 
 *       - Bookings
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingRequest'
 *           examples:
 *             withMemo:
 *               summary: Booking with memo
 *               value:
 *                 serviceId: 1
 *                 artistId: 4
 *                 startTime: '2026-04-20T10:00:00.000Z'
 *                 endTime: '2026-04-20T11:00:00.000Z'
 *                 memo: 'Please help me keep the design simple and elegant.'
 * 
 *             withoutMemo:
 *               summary: Booking without memo
 *               value:
 *                 serviceId: 1
 *                 artistId: 4
 *                 startTime: '2026-04-20T10:00:00.000Z'
 *                 endTime: '2026-04-20T11:00:00.000Z'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/CreateBookingSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/CurrentUserUnauthorizedResponse'
 *       400:
 *         $ref: '#/components/responses/BookingInvalidParamsResponse'
 *       404:
 *         $ref: '#/components/responses/BookingDependencyNotFoundResponse'
 *       409:
 *         $ref: '#/components/responses/BookingTimeOverlap'
 */
router.post('/', createBookingController);

/**
 * @openapi
 * /api/bookings/me:
 *   get:
 *     summary: Get list of my bookings.
 *     description: Get current user's booking list.
 *     tags:
 *       - Bookings
 *     security:
 *       - BearerAuth: []
 *     responses:
 *      200:
 *        $ref: '#/components/responses/GetMyBookingSuccessResponse'
 *      401:
 *        $ref: '#/components/responses/CurrentUserUnauthorizedResponse' 
 */
router.get('/me', getMyBookingsController);

/**
 * @openapi
 * /api/bookings/:id:
 *   get:
 *     summary: Get booking detail
 *     description: Get booking detail by booking ID
 *     tags:
 *       - Bookings
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetBookingByIdSuccessResponse'
 *       404:
 *         $ref: '#/components/responses/BookingNotFound'
 *       400:
 *         $ref: '#/components/responses/InvalidIdParamsResponse'
 *       403:
 *         $ref: '#/components/responses/BookingAccessForbidden'
 */
router.get('/:id', validateIdParams, getBookingByIdController);

/**
 * @openapi
 * /api/bookings/:id/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     description: Cancel a booking by booking ID
 *     tags:
 *       - Bookings
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CancelBookingByISuccessResponse'
 *       403:
 *         $ref: '#/components/responses/BookingAccessForbidden'
 *       404:
 *         $ref: '#/components/responses/BookingNotFound'
 *       400:
 *         $ref: '#/components/responses/CancelBookingBadRequestResponse'
*/
router.patch('/:id/cancel', validateIdParams, cancelBookingByIdController);

export default router;