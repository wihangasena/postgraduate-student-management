'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { applicationFormSchema } from '@/schemas/application';
import { FormStep, ApplicationFormData } from '@/types';
import {
  StepIndicator,
  PersonalInformationStep,
  ContactDetailsStep,
  ReviewStep,
  useToast,
} from '@/components/form';
import { Loader } from 'lucide-react';

interface MultiStepFormProps {
  onSubmitSuccess?: (data: ApplicationFormData) => void;
}

export const MultiStepForm: FC<MultiStepFormProps> = ({ onSubmitSuccess }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast, ToastContainer } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    mode: 'onBlur',
    defaultValues: {
      degree_sought: '',
      faculty: '',
      department: '',
      full_name: '',
      name_with_initials: '',
      nic: '',
      date_of_birth: '',
      marital_status: 'Single',
      email: '',
      english_proficiency: 'Good',
      residential_address_line1: '',
      residential_address_line2: '',
      residential_city: '',
      residential_state: '',
      residential_city_code: '',
      official_address_line1: '',
      official_address_line2: '',
      official_city: '',
      official_state: '',
      official_city_code: '',
      contact_details: [{ type: 'Mobile Personal', phone_number: '' }],
    },
  });

  const watchedData = watch();

  const handleNext = async () => {
    const fieldsToValidate =
      currentStep === 'personal'
        ? [
            'degree_sought',
            'faculty',
            'department',
            'full_name',
            'name_with_initials',
            'nic',
            'date_of_birth',
            'marital_status',
            'email',
            'english_proficiency',
            'residential_address_line1',
            'residential_address_line2',
            'residential_city',
            'residential_state',
            'residential_city_code',
            'official_address_line1',
            'official_address_line2',
            'official_city',
            'official_state',
            'official_city_code',
          ]
        : ['contact_details'];

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep(currentStep === 'personal' ? 'contact' : 'review');
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep === 'contact' ? 'personal' : 'contact');
  };

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Form submitted:', data);
      addToast('success', 'Application submitted successfully! Check your email for confirmation.');

      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }

      // Reset form or redirect
      setTimeout(() => {
        window.location.href = '/success';
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      addToast('error', 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-amber-600 px-6 md:px-8 py-8 md:py-12 rounded-t-2xl text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Postgraduate Application Form
            </h1>
            <p className="text-green-50 text-lg">
              Wayamba University of Sri Lanka
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="bg-white border-b border-gray-200 px-6 md:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <StepIndicator currentStep={currentStep} />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 'personal' && (
                  <PersonalInformationStep
                    control={control}
                    errors={errors}
                    watch={watch}
                  />
                )}

                {currentStep === 'contact' && (
                  <ContactDetailsStep control={control} errors={errors} />
                )}

                {currentStep === 'review' && (
                  <ReviewStep data={watchedData} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-12 flex gap-4 sticky bottom-0 bg-white pt-6 border-t border-gray-200">
              {currentStep !== 'personal' && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Previous
                </button>
              )}

              {currentStep === 'personal' && (
                <div className="flex-1" />
              )}

              {currentStep !== 'review' && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex-1 md:flex-initial px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Next
                </button>
              )}

              {currentStep === 'review' && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 md:flex-initial px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-6 md:px-8 py-6 border-t border-gray-200 rounded-b-2xl">
          <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
            <p>
              For assistance, contact the Admissions Office at{' '}
              <a
                href="mailto:admissions@wyb.ac.lk"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                admissions@wyb.ac.lk
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};
