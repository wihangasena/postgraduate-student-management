# Wayamba University Postgraduate Application Portal
## Complete Implementation Guide

This comprehensive guide covers all aspects of the Wayamba University postgraduate application form system.

## 🎯 Project Summary

A full-stack ready postgraduate application portal using:
- **Frontend**: Next.js 15 App Router, TypeScript, Tailwind CSS
- **Form Management**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **UI Components**: Custom reusable form components
- **Branding**: Green and gold color scheme

## 📂 Complete File Structure

```
pg-project/
├── src/
│   ├── app/
│   │   ├── layout.tsx                      # Root layout, metadata
│   │   ├── page.tsx                        # Home/form page
│   │   ├── globals.css                     # Global styles & animations
│   │   ├── favicon.ico
│   │   └── success/
│   │       └── page.tsx                    # Success confirmation page
│   │
│   ├── components/
│   │   └── form/
│   │       ├── index.ts                    # Component exports
│   │       ├── MultiStepForm.tsx           # Main form wrapper
│   │       ├── PersonalInformationStep.tsx # Step 1
│   │       ├── ContactDetailsStep.tsx      # Step 2
│   │       ├── ReviewStep.tsx              # Step 3
│   │       ├── StepIndicator.tsx           # Progress bar
│   │       ├── FormInput.tsx               # Input component
│   │       ├── FormSelect.tsx              # Select component
│   │       ├── FormTextarea.tsx            # Textarea component
│   │       └── Toast.tsx                   # Toast notifications
│   │
│   ├── schemas/
│   │   └── application.ts                  # Zod validation schemas
│   │
│   ├── types/
│   │   └── index.ts                        # TypeScript interfaces
│   │
│   └── lib/
│       └── constants.ts                    # Dropdown data
│
├── public/
│   └── (static assets)
│
├── .next/                                  # Build output (generated)
├── node_modules/                           # Dependencies (generated)
├── package.json                            # Dependencies & scripts
├── package-lock.json                       # Dependency lock file (generated)
├── tsconfig.json                           # TypeScript config
├── next.config.ts                          # Next.js config
├── tailwind.config.ts                      # Tailwind config
├── postcss.config.mjs                      # PostCSS config
├── eslint.config.mjs                       # ESLint config
├── README.md                               # Project README
├── PROJECT_DOCS.md                         # Extended documentation
└── .gitignore                              # Git ignore rules
```

## 🔑 Key Components Explained

### 1. MultiStepForm.tsx
**Main orchestrator component**

```typescript
- Manages form state with React Hook Form
- Handles step navigation
- Validates each step before proceeding
- Submits data on completion
- Shows loading state during submission
- Displays toast notifications
```

### 2. PersonalInformationStep.tsx
**Step 1: Demographic Data**

```typescript
- 13 form fields for personal info
- Dropdown selects for degree, faculty, department, etc.
- Text inputs for names and NIC
- Date picker for birth date
- Textarea for addresses
- Real-time validation
```

### 3. ContactDetailsStep.tsx
**Step 2: Phone Numbers**

```typescript
- Dynamic contact cards
- Add/remove contacts with buttons
- Phone format validation
- Contact type selection
- Minimum 1 contact required
```

### 4. ReviewStep.tsx
**Step 3: Confirmation**

```typescript
- Display all entered information
- Grouped by section (Personal, Contact)
- Human-readable formatting
- Final submission button
- Back button to edit
```

### 5. Validation System
**src/schemas/application.ts**

```typescript
Zod Schemas:
- personalInformationSchema
- contactDetailSchema
- contactDetailsSchema
- applicationFormSchema (merged)

Validations:
- Required fields
- String lengths
- Email format
- Phone number regex (+94 or 0, 9 digits)
- Date parsing
```

## 🎨 Design System

### Colors
```css
Green Palette:
- green-50: #f0fdf4 (lightest)
- green-600: #16a34a (primary)
- green-700: #15803d (dark)

Amber Palette:
- amber-50: #fffbeb (lightest)
- amber-600: #d97706 (accent)
- amber-700: #b45309 (dark)

Neutral:
- gray-50: #f9fafb (bg light)
- gray-900: #111827 (text dark)
```

### Typography
```css
Font Family: Geist (system fonts fallback)
Sizes:
- h1: 3xl (36px)
- h3: lg (18px)
- body: base (16px)
- label: sm (14px)
- small: xs (12px)

Line Heights:
- Tight: 1 (headings)
- Normal: 1.5 (body)
```

### Spacing
```css
Tailwind Scale:
- 2: 8px (spacing-2)
- 4: 16px (spacing-4)
- 6: 24px (spacing-6)
- 8: 32px (spacing-8)
- 12: 48px (spacing-12)
```

## 🔄 Form Data Flow

```
┌─────────────────────────┐
│  User fills form (UI)   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ React Hook Form tracks  │
│ form state              │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Zod validates on blur   │
│ and before submission   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ ReviewStep displays all │
│ data for confirmation   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Form submitted to       │
│ (Backend API)           │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Toast notification +    │
│ redirect to success     │
└─────────────────────────┘
```

## 🚀 Running the Application

### Development Server
```bash
npm run dev
# Server at http://localhost:3000
# Hot reload enabled
# Console logs visible
```

### Production Build
```bash
npm run build
# Creates optimized build in .next/
# Runs type checking
# Minifies code

npm run start
# Runs production server
```

### Linting
```bash
npm run lint
# Checks code quality
# Identifies issues
```

## 🔐 Security Considerations

### Current Implementation (Frontend)
- ✅ Client-side form validation
- ✅ Type-safe with TypeScript
- ✅ HTML5 input attributes
- ✅ XSS protection via React

### For Production (Backend Required)
- ⚠️ Add server-side validation
- ⚠️ Implement CORS properly
- ⚠️ Add rate limiting (DDoS protection)
- ⚠️ Sanitize inputs (prevent injection)
- ⚠️ Add CSRF tokens
- ⚠️ Use HTTPS only
- ⚠️ Implement authentication
- ⚠️ Add request signing
- ⚠️ Log all submissions
- ⚠️ Monitor for abuse patterns

## 📊 Dummy Data Management

### Location: src/lib/constants.ts

```typescript
DEGREE_PROGRAMS = [
  { value: 'msc-computer-science', label: 'M.Sc. Computer Science' },
  ...
]

FACULTIES = [
  { value: 'engineering', label: 'Faculty of Engineering' },
  ...
]

DEPARTMENTS = [
  { value: 'computer-science', label: 'Department of Computer Science' },
  ...
]

MARITAL_STATUS = [
  { value: 'Single', label: 'Single' },
  ...
]

ENGLISH_PROFICIENCY = [
  { value: 'Excellent', label: 'Excellent' },
  ...
]

CONTACT_TYPES = [
  { value: 'Residential', label: 'Residential' },
  ...
]
```

### To Use Real Data:

1. **From Database**:
```typescript
export async function getFaculties() {
  const faculties = await db.faculties.findAll();
  return faculties.map(f => ({ value: f.id, label: f.name }));
}
```

2. **From API**:
```typescript
const faculties = await fetch('/api/faculties').then(r => r.json());
```

3. **From CMS**:
```typescript
const data = await contentful.getEntries({ content_type: 'faculty' });
```

## 🧪 Testing Workflow

### Unit Test (TDD Pattern)
```typescript
describe('FormInput', () => {
  it('should display error message', () => {
    const error = { message: 'Required' };
    render(<FormInput error={error} />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
```

### Integration Test
```typescript
describe('MultiStepForm', () => {
  it('should progress through all steps', async () => {
    render(<MultiStepForm />);
    // Fill step 1
    // Click next
    // Verify step 2 visible
    // etc.
  });
});
```

### E2E Test (Playwright/Cypress)
```typescript
test('Complete application flow', async ({ page }) => {
  await page.goto('/');
  await page.fill('[name="full_name"]', 'Test User');
  // ... fill all fields
  await page.click('text=Submit');
  await expect(page).toHaveURL('/success');
});
```

## 🔧 Customization Examples

### Change Primary Color to Blue
```css
/* globals.css */
html {
  --color-primary: #3b82f6; /* blue-500 */
}

/* Components */
className="bg-blue-600 text-blue-700 focus:ring-blue-500"
```

### Add New Field
```typescript
// 1. types/index.ts
interface ApplicationFormData {
  // ... existing fields
  scholarship_type?: string; // NEW
}

// 2. schemas/application.ts
const applicationFormSchema = z.object({
  // ... existing fields
  scholarship_type: z.string().optional(),
});

// 3. components/form/PersonalInformationStep.tsx
<Controller
  name="scholarship_type"
  control={control}
  render={({ field }) => (
    <FormSelect
      {...field}
      label="Scholarship Type"
      options={SCHOLARSHIP_TYPES}
    />
  )}
/>

// 4. components/form/ReviewStep.tsx
<div>
  <label>Scholarship Type</label>
  <p>{data.scholarship_type}</p>
</div>
```

### Integrate with API
```typescript
// lib/api.ts
export async function submitApplication(data: ApplicationFormData) {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Submission failed');
  }

  return response.json();
}

// components/form/MultiStepForm.tsx
const onSubmit = async (data: ApplicationFormData) => {
  try {
    const result = await submitApplication(data);
    window.location.href = `/success?ref=${result.id}`;
  } catch (error) {
    addToast('error', 'Submission failed');
  }
};
```

## 📱 Responsive Design Notes

### Mobile Optimization
```css
/* Stack inputs vertically on mobile */
grid-cols-1 md:grid-cols-2

/* Larger touch targets */
py-3 px-4 (vs 2 and 3)

/* Full-width buttons */
w-full md:w-auto
```

### Accessibility (a11y)
```typescript
// ARIA labels
<label htmlFor="full_name" className="sr-only">Full Name</label>

// Error associations
<input aria-describedby="error-full_name" />
<p id="error-full_name">{error}</p>

// Keyboard navigation
[Tab] - next field
[Shift+Tab] - previous field
[Enter] - submit form
```

## 🎓 Learning Resources

- Next.js: https://nextjs.org/learn
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion
- TypeScript: https://www.typescriptlang.org/docs

## 🤝 Support & Maintenance

### Common Issues

**Issue**: Form fields not validating
**Solution**: Check Zod schema matches field names

**Issue**: Dropdown values not showing
**Solution**: Verify constants.ts has correct data

**Issue**: Styles not applied
**Solution**: Ensure Tailwind CSS is compiled (npm run dev)

**Issue**: animations stuttering
**Solution**: Check browser hardware acceleration is enabled

### Deployment Checklist
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Test all form steps
- [ ] Test on mobile devices
- [ ] Add environment variables for production
- [ ] Configure CORS headers
- [ ] Set up error logging
- [ ] Implement rate limiting
- [ ] Add monitoring/analytics

---

**Created**: May 11, 2026  
**Version**: 1.0.0  
**For**: Wayamba University of Sri Lanka
