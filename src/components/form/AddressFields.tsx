import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { FormInput } from './FormInput';

interface AddressFieldsProps {
  control: any;
  errors: any;
  prefix: string;
  label: string;
  line1Placeholder?: string;
  line2Placeholder?: string;
  cityPlaceholder?: string;
  statePlaceholder?: string;
  cityCodePlaceholder?: string;
  helperText?: string;
}

export const AddressFields: FC<AddressFieldsProps> = ({
  control,
  errors,
  prefix,
  label,
  line1Placeholder = 'House number, street, building',
  line2Placeholder = 'Apartment, suite, or additional details',
  cityPlaceholder = 'City',
  statePlaceholder = 'State / Province',
  cityCodePlaceholder = 'City code / postal code',
  helperText,
}) => {
  const fieldName = (suffix: string) => `${prefix}_${suffix}`;

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{label}</h3>
        {helperText && <p className="mt-1 text-sm text-slate-500">{helperText}</p>}
      </div>

      <Controller
        control={control}
        name={fieldName('line1') as any}
        render={({ field }) => (
          <FormInput
            {...field}
            label="Address Line 1"
            placeholder={line1Placeholder}
            required
            error={errors?.[fieldName('line1')] as any}
          />
        )}
      />

      <Controller
        control={control}
        name={fieldName('line2') as any}
        render={({ field }) => (
          <FormInput
            {...field}
            label="Address Line 2"
            placeholder={line2Placeholder}
            error={errors?.[fieldName('line2')] as any}
          />
        )}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Controller
          control={control}
          name={fieldName('city') as any}
          render={({ field }) => (
            <FormInput
              {...field}
              label="City"
              placeholder={cityPlaceholder}
              required
              error={errors?.[fieldName('city')] as any}
            />
          )}
        />

        <Controller
          control={control}
          name={fieldName('state') as any}
          render={({ field }) => (
            <FormInput
              {...field}
              label="State"
              placeholder={statePlaceholder}
              required
              error={errors?.[fieldName('state')] as any}
            />
          )}
        />

        <Controller
          control={control}
          name={fieldName('city_code') as any}
          render={({ field }) => (
            <FormInput
              {...field}
              label="City Code"
              placeholder={cityCodePlaceholder}
              required
              error={errors?.[fieldName('city_code')] as any}
            />
          )}
        />
      </div>
    </div>
  );
};
