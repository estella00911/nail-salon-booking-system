import { Router } from "express";
import { validateServiceFilterQuery } from "./service.middleware.js";
import { getServiceByIdController, getAllServicesController } from "./service.controller.js";
import { validateIdParams, validatePaginationQuery } from '../../middleware/validate.middleware.js';

const router = Router();

router.get('/', validatePaginationQuery, validateServiceFilterQuery, getAllServicesController);
router.get('/:id', validateIdParams, validateServiceFilterQuery, getServiceByIdController);

export default router;