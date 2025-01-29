// organization.routes.js
import express from 'express';
import * as organizationController from '../controllers/organization.controller.js';

const router = express.Router();

router.post('/', organizationController.createOrganization);
router.get('/', organizationController.getOrganizations);
router.get('/:id', organizationController.getOrganizationById);
router.get('/slug/:slug', organizationController.getOrganizationBySlug);
router.get('/subdomain/:subdomain', organizationController.getOrganizationBySubdomain);
router.put('/:id', organizationController.updateOrganization);
router.delete('/:id', organizationController.deleteOrganization);

export default router;