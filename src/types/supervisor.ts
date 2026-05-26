export interface SupervisorFormData {
  name: string;
  name_with_initials: string;
  title: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  city_code: string;
  email: string;
  telephone: string;
  cv_file: File;
}

export interface SupervisorTitleOption {
  value: string;
  label: string;
}
