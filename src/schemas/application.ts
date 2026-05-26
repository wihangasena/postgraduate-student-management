import { z } from 'zod';

// Sri Lankan phone number validation (10 digits)
const sriLankanPhoneRegex = /^(\+94|0)?[1-9]\d{8}$/;
const optionalAddressLine = z.string().max(100, 'Address line 2 must not exceed 100 characters').optional().or(z.literal(''));

export const contactDetailSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['Residential', 'Mobile Office', 'Mobile Personal']),
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .regex(sriLankanPhoneRegex, 'Please enter a valid Sri Lankan phone number'),
});

export const personalInformationSchema = z.object({
  degree_sought: z.string().min(1, 'Degree sought is required'),
  faculty: z.string().min(1, 'Faculty is required'),
  department: z.string().min(1, 'Department is required'),
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  name_with_initials: z
    .string()
    .min(2, 'Name with initials is required')
    .max(100, 'Name with initials must not exceed 100 characters'),
  nic: z
    .string()
    .min(10, 'NIC must be at least 10 characters')
    .max(12, 'NIC must not exceed 12 characters'),
  date_of_birth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  marital_status: z.enum(['Single', 'Married', 'Other']),
  email: z
    .string()
    .email('Please enter a valid email address'),
  english_proficiency: z.enum(['Excellent', 'Good', 'Average', 'Basic']),
  residential_address_line1: z
    .string()
    .min(2, 'Residential address line 1 is required')
    .max(100, 'Residential address line 1 must not exceed 100 characters'),
  residential_address_line2: optionalAddressLine,
  residential_city: z
    .string()
    .min(2, 'Residential city is required')
    .max(60, 'Residential city must not exceed 60 characters'),
  residential_state: z
    .string()
    .min(2, 'Residential state is required')
    .max(60, 'Residential state must not exceed 60 characters'),
  residential_city_code: z
    .string()
    .min(1, 'Residential city code is required')
    .max(20, 'Residential city code must not exceed 20 characters'),
  official_address_line1: z
    .string()
    .min(2, 'Official address line 1 is required')
    .max(100, 'Official address line 1 must not exceed 100 characters'),
  official_address_line2: optionalAddressLine,
  official_city: z
    .string()
    .min(2, 'Official city is required')
    .max(60, 'Official city must not exceed 60 characters'),
  official_state: z
    .string()
    .min(2, 'Official state is required')
    .max(60, 'Official state must not exceed 60 characters'),
  official_city_code: z
    .string()
    .min(1, 'Official city code is required')
    .max(20, 'Official city code must not exceed 20 characters'),
});

export const contactDetailsSchema = z.object({
  contact_details: z
    .array(contactDetailSchema)
    .min(1, 'At least one contact number is required'),
});

export const applicationFormSchema = personalInformationSchema.merge(contactDetailsSchema);

export type PersonalInformationFormData = z.infer<typeof personalInformationSchema>;
export type ContactDetailFormData = z.infer<typeof contactDetailSchema>;
export type ApplicationFormSchema = z.infer<typeof applicationFormSchema>;
