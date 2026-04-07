import { Router } from "express";
import { validateServiceFilterQuery } from "./service.middleware.js";
import { getServiceByIdController, getAllServicesController } from "./service.controller.js";
import { validateIdParams, validatePaginationQuery } from '../../middleware/validate.middleware.js';

const router = Router();

/**
 * @openapi
 * /api/services:
 *   get:
 *     summary: Get all services
 *     description: Retrieve a list of available services with optional filters and pagination
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *           example: "jp-cute"
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Filter services by featured status
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetAllServicesSuccessResponse'
 *       400:
 *         $ref: '#/components/responses/InvalidIdParamsResponse'
 */
router.get('/', validatePaginationQuery, validateServiceFilterQuery, getAllServicesController);


/**
 * @openapi
 * /api/services/:id:
 *   get:
 *     summary: Get a service by ID
 *     description: Retrieve a service by service ID
 *     tags:
 *       - Services
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Service ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetServiceByIdSuccessResponse'
 *       400:
 *         $ref: '#/components/responses/InvalidIdParamsResponse'
 *       404:
 *         $ref: '#/components/responses/ServiceNotFoundResponse'
 */
router.get('/:id', validateIdParams, getServiceByIdController);

export default router;