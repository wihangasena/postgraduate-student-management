'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  id?: string;
  className?: string;
}

export function SectionCard({ title, description, children, action, id, className }: SectionCardProps) {
  return (
    <motion.section id={id} whileHover={{ y: -1 }} transition={{ duration: 0.18 }} className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className ?? ''}`}>
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {action}
      </div>
      <div className="px-5 py-5 sm:px-6">{children}</div>
    </motion.section>
  );
}
