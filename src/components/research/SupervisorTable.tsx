'use client';

import React from 'react';
import { Supervisor } from '@/types/research';
import { motion } from 'framer-motion';

interface Props {
  supervisors: Supervisor[];
  onRemove: (id: string) => void;
}

export const SupervisorTable: React.FC<Props> = ({ supervisors, onRemove }) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
      <p className="text-sm font-medium text-gray-700 mb-3">Selected Supervisors</p>

      <div className="space-y-2">
        {supervisors.map(s => (
          <motion.div key={s.id} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div>
              <p className="font-medium text-gray-800">{s.name}</p>
              <p className="text-xs text-gray-500">{s.title} • {s.email}</p>
            </div>
            <div>
              <button onClick={() => onRemove(s.id)} className="px-3 py-1 text-sm bg-amber-50 text-amber-700 rounded">Remove</button>
            </div>
          </motion.div>
        ))}
        {supervisors.length === 0 && <p className="text-xs text-gray-500">No supervisors added.</p>}
      </div>
    </div>
  );
};

export default SupervisorTable;
