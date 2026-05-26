import { z } from 'zod';

const sriLankanPhoneRegex = /^(\+94|0)?[1-9]\d{8}$/;

const maxCvSizeInBytes = 5 * 1024 * 1024;

export const supervisorFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(120, 'Full name must not exceed 120 characters'),
  name_with_initials: z
    .string()
    .min(2, 'Name with initials is required')
    .max(120, 'Name with initials must not exceed 120 characters'),
  title: z.string().min(1, 'Academic title is required'),
  address_line1: z
    .string()
    .min(2, 'Address line 1 is required')
    .max(100, 'Address line 1 must not exceed 100 characters'),
  address_line2: z.string().max(100, 'Address line 2 must not exceed 100 characters').optional().or(z.literal('')),
  city: z.string().min(2, 'City is required').max(60, 'City must not exceed 60 characters'),
  state: z.string().min(2, 'State is required').max(60, 'State must not exceed 60 characters'),
  city_code: z
    .string()
    .min(1, 'City code is required')
    .max(20, 'City code must not exceed 20 characters'),
  email: z.string().email('Please enter a valid email address'),
  telephone: z
    .string()
    .min(1, 'Telephone number is required')
    .regex(sriLankanPhoneRegex, 'Please enter a valid Sri Lankan phone number'),
  cv_file: z
    .instanceof(File, { message: 'Curriculum Vitae is required' })
    .refine((file) => file.type === 'application/pdf', 'Only PDF files are allowed')
    .refine((file) => file.size <= maxCvSizeInBytes, 'PDF must be 5 MB or smaller'),
});

export type SupervisorFormValues = z.infer<typeof supervisorFormSchema>;
