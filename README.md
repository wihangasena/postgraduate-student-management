# Wayamba University Postgraduate Application Portal

A modern, professional multi-step postgraduate application form for Wayamba University of Sri Lanka. Built with Next.js 15, TypeScript, Tailwind CSS, React Hook Form, and Zod validation.

## Features

- **Multi-Step Form** with smooth animations and transitions
- **Step 1**: Personal Information (degree, faculty, department, contact info)
- **Step 2**: Contact Details (add multiple contact numbers)
- **Step 3**: Review & Submit (review all entered data before submission)
- **Professional UI** with green and gold color scheme (university branding)
- **Form Validation** using Zod with real-time feedback
- **Responsive Design** for mobile and desktop
- **Loading States** and toast notifications
- **Progress Indicator** with step navigation
- **Smooth Animations** using Framer Motion

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page with form
│   ├── globals.css          # Global styles
│   └── success/
│       └── page.tsx         # Success page after submission
├── components/
│   ├── form/
│   │   ├── FormInput.tsx
│   │   ├── FormSelect.tsx
│   │   ├── FormTextarea.tsx
│   │   ├── PersonalInformationStep.tsx
│   │   ├── ContactDetailsStep.tsx
│   │   ├── ReviewStep.tsx
│   │   ├── StepIndicator.tsx
│   │   ├── Toast.tsx
│   │   ├── MultiStepForm.tsx
│   │   └── index.ts
│   └── ui/
├── schemas/
│   └── application.ts       # Zod validation schemas
├── types/
│   └── index.ts             # TypeScript type definitions
└── lib/
    └── constants.ts         # Dummy data for dropdowns
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone or extract the project:
```bash
cd pg-project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Form Fields

### Step 1: Personal Information

- Degree Sought (select dropdown)
- Faculty (select dropdown)
- Department (select dropdown)
- Full Name (text input)
- Name with Initials (text input)
- NIC Number (text input)
- Date of Birth (date picker)
- Marital Status (select dropdown)
- Email Address (email input)
- English Proficiency (select dropdown)
- Residential Address (textarea)
- Official Address (textarea)

### Step 2: Contact Details

- Contact Type (Residential, Mobile Office, Mobile Personal)
- Phone Number (Sri Lankan format validation)
- Add/Remove multiple contacts

### Step 3: Review & Submit

- Review all entered information
- Submit application
- Success confirmation with next steps

## Validation Rules

- Full Name: Required, 2-100 characters
- NIC: Required, 10-12 characters
- Email: Required, valid email format
- Date of Birth: Required, valid date
- Contact Details: At least one contact required
- Phone Numbers: Valid Sri Lankan format (+94 or 0 followed by 9 digits)
- Addresses: Required, 10-500 characters

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Customization

### Dummy Data

Dropdown options are stored in `src/lib/constants.ts`:

```typescript
DEGREE_PROGRAMS
FACULTIES
DEPARTMENTS
MARITAL_STATUS
ENGLISH_PROFICIENCY
CONTACT_TYPES
```

Update these constants to match your actual data or connect to a backend API.

### Styling

- Primary Color: Green (`#16a34a`)
- Accent Color: Amber/Gold (`#d97706`)
- Uses Tailwind CSS utility classes
- Custom animations in `globals.css`

### Form Submission

Currently, the form simulates submission with a 2-second delay. To integrate with a backend:

1. Update the `onSubmit` function in `MultiStepForm.tsx`
2. Replace the simulated API call with your actual API endpoint
3. Handle errors appropriately

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized with Next.js 15 features
- Code splitting for faster page loads
- Image optimization ready
- Font optimization included

## Accessibility

- ARIA labels on form fields
- Keyboard navigation support
- Error message associations
- Semantic HTML structure

## Future Enhancements

- Backend API integration
- Database persistence
- Email confirmation
- Document upload capability
- Auto-save draft functionality
- Multi-language support

## License

This project is created for Wayamba University of Sri Lanka.

## Support

For issues or questions, contact:
- Email: admissions@wyb.ac.lk
- Phone: +94 (0) 701 395 571

