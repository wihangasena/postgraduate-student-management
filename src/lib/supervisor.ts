import { SupervisorTitleOption } from '@/types/supervisor';

export const SUPERVISOR_TITLES: SupervisorTitleOption[] = [
  { value: 'Professor', label: 'Professor' },
  { value: 'Associate Professor', label: 'Associate Professor' },
  { value: 'Senior Lecturer', label: 'Senior Lecturer' },
  { value: 'Lecturer', label: 'Lecturer' },
  { value: 'Doctor', label: 'Doctor' },
  { value: 'Research Scientist', label: 'Research Scientist' },
  { value: 'Industry Supervisor', label: 'Industry Supervisor' },
];

export const SUPERVISOR_GUIDELINES = [
  'Use your official academic or institutional details exactly as they appear in your records.',
  'Upload a single PDF curriculum vitae that is 5 MB or smaller.',
  'Ensure the telephone number is reachable and formatted for Sri Lanka.',
  'Provide a professional email address that you actively monitor.',
];

export const SUPERVISOR_SUBMISSION_STEPS = [
  'Complete every required field and review the upload preview before submission.',
  'Use the sticky submit button to send the form once all details are accurate.',
  'A confirmation toast will appear after submission is accepted by the frontend.',
];

export const SUPERVISOR_SUPPORT = {
  email: 'supervisors@wyb.ac.lk',
  phone: '+94 37 222 1234',
  office: 'Research Degrees Office, Wayamba University of Sri Lanka',
};
