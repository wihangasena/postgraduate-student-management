import { FC } from 'react';
import { Controller, Control, useFieldArray } from 'react-hook-form';
import { ApplicationFormSchema } from '@/schemas/application';
import { FormSelect } from './FormSelect';
import { FormInput } from './FormInput';
import { CONTACT_TYPES } from '@/lib/constants';
import { X, Plus } from 'lucide-react';

interface ContactDetailsStepProps {
  control: Control<ApplicationFormSchema>;
  errors: any;
}

export const ContactDetailsStep: FC<ContactDetailsStepProps> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact_details',
  });

  const handleAddContact = () => {
    append({ type: 'Residential', phone_number: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          Add at least one contact number. You can add multiple contact numbers for different types.
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors animate-in fade-in duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Contact #{index + 1}</h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600 hover:text-red-700"
                  title="Remove this contact"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name={`contact_details.${index}.type`}
                control={control}
                render={({ field }) => (
                  <FormSelect
                    {...field}
                    label="Contact Type"
                    error={errors.contact_details?.[index]?.type}
                    options={CONTACT_TYPES}
                    required
                  />
                )}
              />
              <Controller
                name={`contact_details.${index}.phone_number`}
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    type="tel"
                    label="Phone Number"
                    placeholder="+94 (or 0) followed by 9 digits"
                    error={errors.contact_details?.[index]?.phone_number}
                    required
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {errors.contact_details && !Array.isArray(errors.contact_details) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{errors.contact_details.message}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddContact}
        className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 group"
      >
        <Plus size={20} className="group-hover:scale-110 transition-transform" />
        Add Another Contact
      </button>
    </div>
  );
};
