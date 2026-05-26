'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { School, Sparkles } from 'lucide-react';
import { useToast } from '@/components/form/Toast';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FileUploadCard } from './FileUploadCard';
import { SubmitButton } from './SubmitButton';
import { InfoSidebar } from './InfoSidebar';
import { AddressFields } from '@/components/form/AddressFields';
import { supervisorFormSchema, SupervisorFormValues } from '@/schemas/supervisor';
import { SUPERVISOR_TITLES } from '@/lib/supervisor';

export const SupervisorRegistrationForm: FC = () => {
  const { addToast, ToastContainer } = useToast();
  const uploadTimerRef = useRef<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<SupervisorFormValues>({
    resolver: zodResolver(supervisorFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      name_with_initials: '',
      title: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      city_code: '',
      email: '',
      telephone: '',
    },
  });

  const selectedFile = watch('cv_file');

  useEffect(() => {
    return () => {
      if (uploadTimerRef.current) {
        window.clearInterval(uploadTimerRef.current);
      }
    };
  }, []);

  const runUploadPreview = () => {
    if (uploadTimerRef.current) {
      window.clearInterval(uploadTimerRef.current);
    }

    setUploadProgress(0);
    setIsUploading(true);

    uploadTimerRef.current = window.setInterval(() => {
      setUploadProgress((current) => {
        if (current >= 100) {
          if (uploadTimerRef.current) {
            window.clearInterval(uploadTimerRef.current);
            uploadTimerRef.current = null;
          }
          setIsUploading(false);
          return 100;
        }

        return current + 20;
      });
    }, 120);
  };

  const handleFileSelect = (file: File) => {
    clearErrors('cv_file');

    if (file.type !== 'application/pdf') {
      setValue('cv_file', undefined as unknown as File, { shouldDirty: true, shouldValidate: true });
      setError('cv_file', { type: 'manual', message: 'Only PDF files are allowed.' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValue('cv_file', undefined as unknown as File, { shouldDirty: true, shouldValidate: true });
      setError('cv_file', { type: 'manual', message: 'PDF must be 5 MB or smaller.' });
      return;
    }

    setValue('cv_file', file, { shouldDirty: true, shouldValidate: true });
    runUploadPreview();
  };

  const handleFileClear = () => {
    if (uploadTimerRef.current) {
      window.clearInterval(uploadTimerRef.current);
      uploadTimerRef.current = null;
    }

    setUploadProgress(0);
    setIsUploading(false);
    clearErrors('cv_file');
    setValue('cv_file', undefined as unknown as File, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = async (data: SupervisorFormValues) => {
    try {
      setIsSubmitting(true);

      await new Promise((resolve) => window.setTimeout(resolve, 1400));

      console.log('Supervisor registration submitted:', data);
      addToast('success', 'Supervisor details submitted successfully.');
      reset({
        name: '',
        name_with_initials: '',
        title: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        city_code: '',
        email: '',
        telephone: '',
      });
      handleFileClear();
    } catch (error) {
      console.error('Supervisor submission failed:', error);
      addToast('error', 'Unable to submit supervisor details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50"
      >
        <section className="border-b border-white/70 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 p-6 text-white shadow-2xl shadow-emerald-900/10 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold backdrop-blur">
                    WU
                  </div>
                  <div>
                    <p className="mb-1 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50">
                      <Sparkles size={14} />
                      Supervisor Registration Portal
                    </p>
                    <h1 className="text-3xl font-bold md:text-5xl">Supervisor Details Form</h1>
                    <p className="mt-3 max-w-2xl text-sm text-emerald-50 md:text-base">
                      Submit your academic profile, contact details, and curriculum vitae to be listed as a postgraduate research supervisor.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur">
                  <div className="flex items-center gap-2 font-semibold">
                    <School size={16} />
                    Wayamba University of Sri Lanka
                  </div>
                  <p className="mt-1 text-emerald-50">Academic portal submission for supervisor onboarding</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <motion.section
              whileHover={{ y: -2 }}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
            >
              <div className="border-b border-slate-100 px-6 py-5 md:px-8">
                <h2 className="text-2xl font-semibold text-slate-900">Supervisor Details</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Complete the form carefully. Required fields are marked with an asterisk.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="relative bg-white">
                <div className="space-y-8 px-6 py-8 md:px-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Full Name"
                          placeholder="Enter full name"
                          required
                          error={errors.name}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="name_with_initials"
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          label="Name with Initials"
                          placeholder="e.g., W. A. D. Silva"
                          required
                          error={errors.name_with_initials}
                        />
                      )}
                    />
                  </div>

                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <FormSelect
                        {...field}
                        label="Academic Title"
                        required
                        error={errors.title}
                        options={SUPERVISOR_TITLES}
                        placeholder="Select academic title"
                      />
                    )}
                  />

                  <AddressFields
                    control={control}
                    errors={errors}
                    prefix="address"
                    label="Address"
                    helperText="Use the structured institutional address in the same template as the student portal."
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          type="email"
                          label="Email Address"
                          placeholder="name@university.edu"
                          required
                          error={errors.email}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="telephone"
                      render={({ field }) => (
                        <FormInput
                          {...field}
                          type="tel"
                          label="Telephone Number"
                          placeholder="07XXXXXXXX or +94XXXXXXXXX"
                          required
                          error={errors.telephone}
                        />
                      )}
                    />
                  </div>

                  <Controller
                    control={control}
                    name="cv_file"
                    render={() => (
                      <FileUploadCard
                        label="Curriculum Vitae (CV Upload)"
                        file={selectedFile}
                        progress={uploadProgress}
                        error={errors.cv_file}
                        onFileSelect={handleFileSelect}
                        onClear={handleFileClear}
                      />
                    )}
                  />

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-900">
                    <p className="font-semibold">Upload policy</p>
                    <p className="mt-1 text-emerald-800">
                      Only PDF files are accepted. Maximum file size is 5 MB. The upload preview below is a frontend-only indicator.
                    </p>
                  </div>
                </div>

                <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white/95 px-6 py-5 shadow-[0_-10px_30px_rgba(15,23,42,0.05)] backdrop-blur md:px-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      Your details will be reviewed by the postgraduate research office.
                    </p>
                    <SubmitButton loading={isSubmitting || isUploading} />
                  </div>
                </div>
              </form>
            </motion.section>

            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
              <InfoSidebar />
            </motion.div>
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
            University footer placeholder · Wayamba University of Sri Lanka
          </div>
        </footer>
      </motion.div>
    </>
  );
};
