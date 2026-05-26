// Application form types

export interface ContactDetail {
  id?: string;
  type: 'Residential' | 'Mobile Office' | 'Mobile Personal';
  phone_number: string;
}

export interface ApplicationFormData {
  // Step 1: Personal Information
  degree_sought: string;
  faculty: string;
  department: string;
  full_name: string;
  name_with_initials: string;
  nic: string;
  date_of_birth: string;
  marital_status: 'Single' | 'Married' | 'Other';
  email: string;
  english_proficiency: 'Excellent' | 'Good' | 'Average' | 'Basic';
  residential_address_line1: string;
  residential_address_line2?: string;
  residential_city: string;
  residential_state: string;
  residential_city_code: string;
  official_address_line1: string;
  official_address_line2?: string;
  official_city: string;
  official_state: string;
  official_city_code: string;

  // Step 2: Contact Details
  contact_details: ContactDetail[];
}

export type FormStep = 'personal' | 'contact' | 'review';
