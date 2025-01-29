import * as z from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Address is required'),
});

export const organizationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  size: z.string().min(1, 'Company size is required'),
  website: z.string().url().optional(),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  logo: z.any().optional(),
  subscriptionPlan: z.string().min(1, 'Please select a subscription plan'),
});

export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

export const verificationSchema = z.object({
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  updates: z.boolean(),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type OrganizationInfo = z.infer<typeof organizationSchema>;
export type AddressInfo = z.infer<typeof addressSchema>;
export type VerificationInfo = z.infer<typeof verificationSchema>;