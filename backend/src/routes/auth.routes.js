import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Registration validation
const registerValidation = [
  // Personal Info
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('dateOfBirth').optional().isISO8601().withMessage('Invalid date format'),
  body('address').optional().trim(),

  // Organization Info
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('industry').trim().notEmpty().withMessage('Industry is required'),
  body('size').trim().notEmpty().withMessage('Company size is required'),
  body('website').optional().isURL().withMessage('Invalid website URL'),
  body('gstNumber').optional().trim(),
  body('panNumber').optional().trim(),

  // Address Info
  body('street').trim().notEmpty().withMessage('Street address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('postalCode').trim().notEmpty().withMessage('Postal code is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),

  // Verification
  body('terms').isBoolean().equals('true').withMessage('You must accept the terms and conditions'),
  body('updates').optional().isBoolean()
];

router.post('/register', registerValidation, authController.register);

export default router;