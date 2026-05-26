import { FC } from 'react';
import { FormStep } from '@/types';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: FormStep;
  onStepClick?: (step: FormStep) => void;
}

const STEPS: Array<{ id: FormStep; label: string; number: number }> = [
  { id: 'personal', label: 'Personal Info', number: 1 },
  { id: 'contact', label: 'Contact Details', number: 2 },
  { id: 'review', label: 'Review', number: 3 },
];

export const StepIndicator: FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);
  const progressWidth = currentIndex <= 0 ? '0%' : currentIndex === 1 ? '50%' : '100%';

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute left-5 right-5 top-5 h-1 rounded-full bg-gray-200" />
        <motion.div
          className="absolute left-5 top-5 h-1 rounded-full bg-green-600"
          initial={false}
          animate={{ width: progressWidth }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative flex items-start justify-between gap-4">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = step.id === currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <div key={step.id} className="relative flex flex-1 flex-col items-center text-center">
                <motion.button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={`z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                    isCurrent
                      ? 'bg-green-600 text-white ring-4 ring-green-100'
                      : isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                  whileHover={isClickable ? { scale: 1.1 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                >
                  {isCompleted ? <CheckCircle2 size={24} /> : step.number}
                </motion.button>

                <p className="mt-4 text-sm font-medium text-gray-700">{step.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
