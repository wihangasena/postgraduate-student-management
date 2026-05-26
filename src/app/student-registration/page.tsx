import { Metadata } from 'next';
import { MultiStepForm } from '@/components/form/MultiStepForm';

export const metadata: Metadata = {
  title: 'Student Registration - Wayamba University',
  description: 'Postgraduate application form for student registration.',
};

export default function StudentRegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="w-full max-w-5xl mx-auto px-4">
        <MultiStepForm />
      </div>
    </div>
  );
}