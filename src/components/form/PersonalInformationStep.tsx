import { FC } from 'react';
import { Controller, Control } from 'react-hook-form';
import { ApplicationFormSchema } from '@/schemas/application';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { AddressFields } from './AddressFields';
import {
  DEGREE_PROGRAMS,
  FACULTIES,
  DEPARTMENTS,
  MARITAL_STATUS,
  ENGLISH_PROFICIENCY,
} from '@/lib/constants';

interface PersonalInformationStepProps {
  control: Control<ApplicationFormSchema>;
  errors: any;
  watch: any;
}

export const PersonalInformationStep: FC<PersonalInformationStepProps> = ({
  control,
  errors,
  watch,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="degree_sought"
          control={control}
          render={({ field }) => (
            <FormSelect
              {...field}
              label="Degree Sought"
              error={errors.degree_sought}
              options={DEGREE_PROGRAMS}
              required
            />
          )}
        />
        <Controller
          name="faculty"
          control={control}
          render={({ field }) => (
            <FormSelect
              {...field}
              label="Faculty"
              error={errors.faculty}
              options={FACULTIES}
              required
            />
          )}
        />
      </div>

      <Controller
        name="department"
        control={control}
        render={({ field }) => (
          <FormSelect
            {...field}
            label="Department"
            error={errors.department}
            options={DEPARTMENTS}
            required
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="full_name"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.full_name}
              required
            />
          )}
        />
        <Controller
          name="name_with_initials"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              type="text"
              label="Name with Initials"
              placeholder="e.g., W. A. D. Silva"
              error={errors.name_with_initials}
              required
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="nic"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              type="text"
              label="NIC Number"
              placeholder="e.g., 123456789V"
              error={errors.nic}
              required
            />
          )}
        />
        <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              type="date"
              label="Date of Birth"
              error={errors.date_of_birth}
              required
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="marital_status"
          control={control}
          render={({ field }) => (
            <FormSelect
              {...field}
              label="Marital Status"
              error={errors.marital_status}
              options={MARITAL_STATUS}
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              type="email"
              label="Email Address"
              placeholder="your.email@example.com"
              error={errors.email}
              required
            />
          )}
        />
      </div>

      <Controller
        name="english_proficiency"
        control={control}
        render={({ field }) => (
          <FormSelect
            {...field}
            label="English Proficiency"
            error={errors.english_proficiency}
            options={ENGLISH_PROFICIENCY}
            required
          />
        )}
      />

      <AddressFields
        control={control}
        errors={errors}
        prefix="residential_address"
        label="Residential Address"
        helperText="Use the address where you currently live."
      />

      <AddressFields
        control={control}
        errors={errors}
        prefix="official_address"
        label="Official Address"
        helperText="Use the address that appears in your institutional or official records."
      />
    </div>
  );
};
