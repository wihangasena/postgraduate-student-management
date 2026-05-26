import { Metadata } from 'next';
import { SupervisorRegistrationForm } from '@/components/supervisor';

export const metadata: Metadata = {
  title: 'Supervisor Registration Portal - Wayamba University',
  description: 'Professional supervisor details submission form for postgraduate research portal.',
};

export default function SupervisorRegistrationPage() {
  return <SupervisorRegistrationForm />;
}
