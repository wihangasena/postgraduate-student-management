'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  hint: string;
  icon?: ReactNode;
  tone?: 'emerald' | 'amber' | 'slate' | 'blue';
}

export function MetricCard({ label, value, hint, icon, tone = 'slate' }: MetricCardProps) {
  const toneMap = {
    emerald: 'from-emerald-50 to-emerald-100 text-emerald-700',
    amber: 'from-amber-50 to-amber-100 text-amber-700',
    slate: 'from-slate-50 to-slate-100 text-slate-700',
    blue: 'from-blue-50 to-blue-100 text-blue-700',
  };

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.18 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          <p className="mt-2 text-sm text-slate-500">{hint}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${toneMap[tone]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
