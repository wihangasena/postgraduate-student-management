'use client';

import React from 'react';
import { ProposalFormValues } from '@/types/research';

interface Props {
  values: Partial<ProposalFormValues>;
}

export const ReviewCard: React.FC<Props> = ({ values }) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Review</h3>

      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <p className="font-medium">Project Title</p>
          <p className="text-gray-600">{values.projectTitle || '-'}</p>
        </div>

        <div>
          <p className="font-medium">Objective</p>
          <p className="text-gray-600">{values.objective || '-'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Proposed Date</p>
            <p className="text-gray-600">{values.proposedDate || '-'}</p>
          </div>
          <div>
            <p className="font-medium">Degree</p>
            <p className="text-gray-600">{values.degreeType || '-'}</p>
          </div>
        </div>

        <div>
          <p className="font-medium">Payment</p>
          <p className="text-gray-600">{values.paymentMethod || '-'}</p>
        </div>

        <div>
          <p className="font-medium">Supervisors</p>
          {values.supervisors && values.supervisors.length ? (
            <ul className="list-disc pl-5">
              {values.supervisors.map(s => (
                <li key={s.id} className="text-gray-700">{s.name} — {s.title} — {s.email}</li>
              ))}
            </ul>
          ) : <p className="text-gray-500">No supervisors</p>}
        </div>

        <div>
          <p className="font-medium">Files</p>
          <p className="text-gray-600">{values.proposalDocument ? (values.proposalDocument as any).name : '-'} / {values.paymentReceipt ? (values.paymentReceipt as any).name : '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
