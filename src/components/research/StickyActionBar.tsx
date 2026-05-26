'use client';

import React from 'react';

interface Props {
  onSaveDraft: () => void;
  onSubmit: () => void;
  submitting?: boolean;
}

export const StickyActionBar: React.FC<Props> = ({ onSaveDraft, onSubmit, submitting }) => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-4">
      <div className="max-w-6xl mx-auto flex gap-3 items-center">
        <button onClick={onSaveDraft} className="px-4 py-2 bg-amber-100 border border-amber-200 text-amber-800 rounded-lg shadow-sm">Save Draft</button>
        <div className="flex-1" />
        <button onClick={onSubmit} disabled={submitting} className="px-6 py-2 bg-green-700 text-white rounded-lg shadow">{submitting ? 'Submitting...' : 'Submit Proposal'}</button>
      </div>
    </div>
  );
};

export default StickyActionBar;
