# Wayamba University Postgraduate Application Portal

## Project Overview

A modern, professional multi-step postgraduate application form built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **React Hook Form**, **Zod**, and **Framer Motion** for Wayamba University of Sri Lanka.

## ✨ Features

### Multi-Step Form Workflow
- **Step 1**: Personal Information (educational details, biographical data)
- **Step 2**: Contact Details (add/remove multiple phone numbers)
- **Step 3**: Review & Submit (confirmation with all entered data)

### Professional UI/UX
- Green and gold color scheme (university branding)
- Smooth animations with Framer Motion
- Responsive design (mobile-first)
- Progress indicator with step navigation
- Loading states and toast notifications

### Form Validation
- Real-time validation with Zod
- Sri Lankan phone number format validation
- Email validation
- Required field checking
- Detailed error messages

### Developer Experience
- TypeScript for type safety
- Reusable form components
- Organized project structure
- Easy to customize and extend

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, or bun

### Installation

```bash
cd pg-project
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page with form
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   └── success/page.tsx            # Success confirmation
├── components/
│   └── form/
│       ├── MultiStepForm.tsx       # Main form orchestrator
│       ├── PersonalInformationStep.tsx
│       ├── ContactDetailsStep.tsx
│       ├── ReviewStep.tsx
│       ├── StepIndicator.tsx       # Progress bar
│       ├── FormInput.tsx           # Reusable input
│       ├── FormSelect.tsx          # Reusable select
│       ├── FormTextarea.tsx        # Reusable textarea
│       ├── Toast.tsx               # Notifications
│       └── index.ts                # Exports
├── schemas/
│   └── application.ts              # Zod validation schemas
├── types/
│   └── index.ts                    # TypeScript interfaces
└── lib/
    └── constants.ts                # Dummy dropdown data
```

## 📋 Form Fields

### Step 1: Personal Information

| Field | Type | Validation |
|-------|------|-----------|
| Degree Sought | Select | Required |
| Faculty | Select | Required |
| Department | Select | Required |
| Full Name | Text | Required, 2-100 chars |
| Name with Initials | Text | Required, 2-100 chars |
| NIC Number | Text | Required, 10-12 chars |
| Date of Birth | Date | Required, valid date |
| Marital Status | Select | Required (Single/Married/Other) |
| Email | Email | Required, valid email |
| English Proficiency | Select | Required (Excellent/Good/Average/Basic) |
| Residential Address | Textarea | Required, 10-500 chars |
| Official Address | Textarea | Required, 10-500 chars |

### Step 2: Contact Details

| Field | Type | Validation |
|-------|------|-----------|
| Contact Type | Select | Required (Residential/Mobile Office/Mobile Personal) |
| Phone Number | Tel | Required, Sri Lankan format (+94/0 + 9 digits) |

**Requirements**: Minimum 1 contact, maximum unlimited

### Step 3: Review & Submit

- Display all entered information
- Final confirmation before submission
- Previous button to edit
- Submit button for final submission

## 🎨 Styling & Colors

### Color Palette
- **Primary Green**: `#16a34a` (University primary)
- **Gold/Amber**: `#d97706` (Accent)
- **Background**: `#ffffff` (Clean white)
- **Text**: `#1f2937` (Dark gray)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Customization Guide

### Changing Dropdown Options

Edit `src/lib/constants.ts`:

```typescript
export const FACULTIES = [
  { value: 'engineering', label: 'Faculty of Engineering' },
  { value: 'computing', label: 'Faculty of Computing' },
  // Add more faculties
];
```

### Adding New Form Fields

1. Update `ApplicationFormData` type in `src/types/index.ts`
2. Add Zod validation in `src/schemas/application.ts`
3. Update step component to include field
4. Update `ReviewStep.tsx` to display field

### Integrating with Backend

Update `onSubmit` in `src/components/form/MultiStepForm.tsx`:

```typescript
const onSubmit = async (data: ApplicationFormData) => {
  try {
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      addToast('success', 'Application submitted successfully!');
      window.location.href = '/success';
    } else {
      addToast('error', 'Failed to submit application');
    }
  } catch (error) {
    addToast('error', 'An error occurred');
  }
};
```

## 📦 Dependencies

### Core
- `next`: 14.2.3 - React framework
- `react`: 18.3.1 - UI library
- `react-dom`: 18.3.1 - DOM rendering

### Form & Validation
- `react-hook-form`: ^7.51.0 - Form state management
- `zod`: ^3.22.4 - Schema validation
- `@hookform/resolvers`: ^3.3.4 - Zod resolver

### Styling & Animation
- `tailwindcss`: 4.0.0 - Utility CSS
- `framer-motion`: ^10.16.16 - Animations
- `lucide-react`: ^0.292.0 - Icons

### Development
- `typescript`: ^5 - Type safety
- `eslint`: ^8.56.0 - Code linting
- `@tailwindcss/postcss`: 4.0.0 - Tailwind CSS plugin

## 🧪 Testing the Form

1. **Fill Personal Information**
   - Select all dropdowns
   - Enter text fields
   - Verify validation on empty fields

2. **Add Contact Details**
   - Add multiple contacts
   - Test phone validation (must be Sri Lankan format)
   - Remove contacts

3. **Review Data**
   - Navigate back to edit
   - Verify all data persists
   - Check review display

4. **Submit**
   - Verify loading state
   - Check success page redirect
   - Review success message

## 🔐 Security Notes

⚠️ **Important**: This is a frontend form only. For production:

- ✅ Add server-side validation
- ✅ Implement authentication
- ✅ Add CSRF protection
- ✅ Sanitize all inputs
- ✅ Add rate limiting
- ✅ Use HTTPS
- ✅ Implement API authentication

## 📧 Integration Points

### Email Notifications
Connect email service (SendGrid, Mailgun, AWS SES) in backend API:

```typescript
// Backend example
await sendConfirmationEmail({
  email: data.email,
  fullName: data.full_name,
  applicationId: newApplication.id,
});
```

### Database
Connect MongoDB, PostgreSQL, or Firebase:

```typescript
// Example: Save to database
await db.applications.create({
  ...data,
  createdAt: new Date(),
  status: 'submitted',
});
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
npm run start
```

Push to GitHub and deploy on Vercel dashboard.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### AWS / DigitalOcean

Follow Next.js deployment guides for your platform.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Support

For issues or questions:
- **Email**: admissions@wyb.ac.lk
- **Phone**: +94 (0) 701 395 571
- **Office Hours**: Monday - Friday, 9:00 AM - 4:00 PM

## 📄 License

Created for Wayamba University of Sri Lanka, 2026.

---

**Last Updated**: May 11, 2026
