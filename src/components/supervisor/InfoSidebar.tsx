'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, ClipboardList, Mail, PhoneCall, ShieldCheck } from 'lucide-react';
import { SUPERVISOR_GUIDELINES, SUPERVISOR_SUBMISSION_STEPS, SUPERVISOR_SUPPORT } from '@/lib/supervisor';

export const InfoSidebar: FC = () => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-8">
      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Supervisor Guidelines</h3>
            <p className="text-sm text-slate-500">Please review before submitting</p>
          </div>
        </div>

        <ul className="space-y-3 text-sm text-slate-600">
          {SUPERVISOR_GUIDELINES.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <BadgeCheck size={18} className="mt-0.5 flex-shrink-0 text-emerald-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <ClipboardList size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Submission Steps</h3>
            <p className="text-sm text-slate-500">Front-end workflow preview</p>
          </div>
        </div>

        <ol className="space-y-3 text-sm text-slate-600">
          {SUPERVISOR_SUBMISSION_STEPS.map((item, index) => (
            <li key={item} className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
            <PhoneCall size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Support</h3>
            <p className="text-sm text-slate-300">University research office</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-200">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-emerald-300" />
            <a href={`mailto:${SUPERVISOR_SUPPORT.email}`} className="hover:text-white">
              {SUPERVISOR_SUPPORT.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <PhoneCall size={16} className="text-emerald-300" />
            <span>{SUPERVISOR_SUPPORT.phone}</span>
          </div>
          <p className="pt-2 text-slate-300">{SUPERVISOR_SUPPORT.office}</p>
        </div>
      </motion.div>
    </aside>
  );
};
