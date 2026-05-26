import { FC } from 'react';
import { ApplicationFormSchema } from '@/schemas/application';
import {
  DEGREE_PROGRAMS,
  FACULTIES,
  DEPARTMENTS,
  MARITAL_STATUS,
  ENGLISH_PROFICIENCY,
  CONTACT_TYPES,
} from '@/lib/constants';
import { CheckCircle } from 'lucide-react';

interface ReviewStepProps {
  data: ApplicationFormSchema;
}

interface OptionValue {
  value: string;
  label: string;
}

const formatAddress = (
  line1: string,
  line2: string | undefined,
  city: string,
  state: string,
  cityCode: string,
) => {
  return [line1, line2, `${city}, ${state}`, cityCode].filter(Boolean).join('\n');
};

const getLabel = (value: string | null | undefined, options: OptionValue[]): string => {
  if (!value) return 'N/A';
  const found = options.find((opt) => opt.value === value);
  return found ? found.label : value;
};

export const ReviewStep: FC<ReviewStepProps> = ({ data }) => {
  const formatDate = (dateStr: string | Date) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return String(dateStr);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
        <CheckCircle className="text-green-600" size={24} />
        <p className="text-sm text-green-800">
          Please review your information carefully before submitting.
        </p>
      </div>

      {/* Personal Information Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Personal Information</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Degree Sought
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {getLabel(data.degree_sought, DEGREE_PROGRAMS)}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Faculty
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {getLabel(data.faculty, FACULTIES)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Department
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {getLabel(data.department, DEPARTMENTS)}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Marital Status
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {getLabel(data.marital_status, MARITAL_STATUS)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Full Name
              </label>
              <p className="text-gray-900 font-medium mt-1">{data.full_name}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Name with Initials
              </label>
              <p className="text-gray-900 font-medium mt-1">{data.name_with_initials}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                NIC Number
              </label>
              <p className="text-gray-900 font-medium mt-1">{data.nic}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Date of Birth
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {formatDate(data.date_of_birth)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email Address
              </label>
              <p className="text-gray-900 font-medium mt-1">{data.email}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                English Proficiency
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {getLabel(data.english_proficiency, ENGLISH_PROFICIENCY)}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Residential Address
            </label>
            <p className="text-gray-900 mt-1 whitespace-pre-wrap">
              {formatAddress(
                data.residential_address_line1,
                data.residential_address_line2,
                data.residential_city,
                data.residential_state,
                data.residential_city_code,
              )}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Official Address
            </label>
            <p className="text-gray-900 mt-1 whitespace-pre-wrap">
              {formatAddress(
                data.official_address_line1,
                data.official_address_line2,
                data.official_city,
                data.official_state,
                data.official_city_code,
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Contact Details</h3>
        </div>
        <div className="p-6 space-y-4">
          {data.contact_details.map((contact, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Contact Type #{index + 1}
                  </label>
                  <p className="text-gray-900 font-medium mt-1">
                    {getLabel(contact.type, CONTACT_TYPES)}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <p className="text-gray-900 font-medium mt-1">{contact.phone_number}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> Once you submit this application, you will receive a confirmation email.
          Please check your spam folder if you don't see it.
        </p>
      </div>
    </div>
  );
};
