import { z } from 'zod';

const MAX_RECEIPT_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_PROPOSAL_BYTES = 10 * 1024 * 1024; // 10MB

export const supervisorSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  email: z.string().email(),
});

export const researchProposalSchema = z.object({
  projectTitle: z.string().min(3, 'Project title is required'),
  objective: z.string().min(10, 'Research objective is required'),
  proposedDate: z.string().min(1, 'Proposed date is required'),
  degreeType: z.enum(['MSc', 'MPhil', 'MBA', 'PhD']),
  paymentMethod: z.enum(['Cash Deposit', 'Bank Transfer', 'Online Payment']),
  paymentReceipt: z
    .any()
    .refine((file) => !file || (file instanceof File && ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)), {
      message: 'Payment receipt must be PDF, JPG or PNG',
    })
    .refine((file) => !file || (file instanceof File && file.size <= MAX_RECEIPT_BYTES), {
      message: 'Payment receipt max size is 5MB',
    })
    .optional(),
  proposalDocument: z
    .any()
    .refine((file) => file instanceof File, { message: 'Proposal document is required' })
    .refine((file) => file && file.type === 'application/pdf', { message: 'Proposal must be a PDF' })
    .refine((file) => file && file.size <= MAX_PROPOSAL_BYTES, { message: 'Proposal max size is 10MB' }),
  supervisors: z.array(supervisorSchema).min(1, 'At least one supervisor is required'),
});

export type ResearchProposalForm = z.infer<typeof researchProposalSchema>;
