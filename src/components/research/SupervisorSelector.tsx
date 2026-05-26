'use client';

import React, { useMemo, useState } from 'react';
import { Supervisor } from '@/types/research';
import { motion } from 'framer-motion';

const DUMMY_SUPERVISORS: Supervisor[] = [
  { id: '1', name: 'Prof. Nimal Perera', title: 'Professor', email: 'nimal.perera@wyb.ac.lk' },
  { id: '2', name: 'Dr. Kasuni Silva', title: 'Senior Lecturer', email: 'kasuni.silva@wyb.ac.lk' },
  { id: '3', name: 'Prof. Chamara Jayasinghe', title: 'Professor', email: 'chamara.jayasinghe@wyb.ac.lk' },
  { id: '4', name: 'Dr. Dilani Fernando', title: 'Senior Lecturer', email: 'dilani.fernando@wyb.ac.lk' },
];

interface Props {
  onAdd: (sup: Supervisor) => void;
  existing: Supervisor[];
}

export const SupervisorSelector: React.FC<Props> = ({ onAdd, existing }) => {
  const [query, setQuery] = useState('');

  const options = useMemo(() => DUMMY_SUPERVISORS.filter(s => s.name.toLowerCase().includes(query.toLowerCase())), [query]);

  const handleAdd = (s: Supervisor) => {
    const found = existing.find((e) => e.id === s.id);
    if (found) return;
    onAdd(s);
    setQuery('');
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
      <p className="text-sm font-medium text-gray-700 mb-2">Select Supervisor</p>
      <div className="flex gap-2 items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search supervisors..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        <div className="w-44">
          <button type="button" onClick={() => { if (options[0]) handleAdd(options[0]); }} className="w-full px-3 py-2 bg-amber-500 text-white rounded-lg shadow-sm hover:bg-amber-600 transition">Add Supervisor</button>
        </div>
      </div>

      {query && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-2">
          {options.length ? options.map(o => (
            <div key={o.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg border border-transparent">
              <div>
                <p className="font-medium text-gray-800">{o.name}</p>
                <p className="text-xs text-gray-500">{o.title} • {o.email}</p>
              </div>
              <button onClick={() => handleAdd(o)} className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded">Add</button>
            </div>
          )) : <p className="text-xs text-gray-500">No matches</p>}
        </motion.div>
      )}
    </div>
  );
};

export default SupervisorSelector;
