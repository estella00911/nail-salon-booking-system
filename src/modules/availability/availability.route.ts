import { Router } from "express";
import { validateAvailableSlot } from "./availability.middleware.js";
import { getAvailableSlotController } from "./availability.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";


const router = Router();
router.use(requireAuth);

/**
 * @openapi
 * /api/availability/slots:
 *   get:
 *     summary: Get free slots
 *     description: Get free slots from given serviceId, artistId, date
 *     tags: 
 *       - Availability
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: serviceId
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Service Id
 *       - in: query
 *         name: artistId
 *         schema:
 *           type: integer
 *           example: 4
 *         description: User Id whose role is ARTIST
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2026-05-17
 *         description: selected date
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AvailabilitySlotsSuccessResponse'
 *       400:
 *         $ref: '#/components/responses/InvalidIdParamsResponse'
 *       404:
 *         $ref: '#/components/responses/ServiceNotFoundResponse'
 */
router.get('/slots', validateAvailableSlot, getAvailableSlotController);

export default router;