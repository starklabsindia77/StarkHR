import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/me', authenticate, userController.getCurrentUser);

router.get('/',
  authenticate,
  authorize(['super_admin', 'tenant_admin']),
  userController.getUsers
);

router.get('/:id',
  authenticate,
  authorize(['super_admin', 'tenant_admin']),
  userController.getUserById
);

router.put('/:id',
  authenticate,
  authorize(['super_admin', 'tenant_admin']),
  userController.updateUser
);

router.delete('/:id',
  authenticate,
  authorize(['super_admin', 'tenant_admin']),
  userController.deleteUser
);

export default router;