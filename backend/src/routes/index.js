// router index.js
import express from 'express';
import organizationRoutes from './organization.routes.js';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

router.use('/organizations', organizationRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;