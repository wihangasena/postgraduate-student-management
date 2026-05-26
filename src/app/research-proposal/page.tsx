'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { researchProposalSchema, ResearchProposalForm } from '@/schemas/researchProposal';
import { ProposalFormValues, Supervisor } from '@/types/research';
import FileUploadCard from '@/components/research/FileUploadCard';
import SupervisorSelector from '@/components/research/SupervisorSelector';
import SupervisorTable from '@/components/research/SupervisorTable';
import ReviewCard from '@/components/research/ReviewCard';
import StickyActionBar from '@/components/research/StickyActionBar';
import { FormInput, FormTextarea, FormSelect } from '@/components/form';

export default function ResearchProposalPage() {
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<ResearchProposalForm>({ resolver: zodResolver(researchProposalSchema), defaultValues: { projectTitle: '', objective: '', proposedDate: '', degreeType: 'MSc', paymentMethod: 'Cash Deposit', supervisors: [] } as any });

  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const values = watch();

  const addSupervisor = (s: Supervisor) => {
    if (supervisors.find(x => x.id === s.id)) return;
    setSupervisors((p) => [...p, s]);
    // update form
    setValue('supervisors', [...supervisors, s] as any);
  };

  const removeSupervisor = (id: string) => {
    const next = supervisors.filter(s => s.id !== id);
    setSupervisors(next);
    setValue('supervisors', next as any);
  };

  const onSubmit = (data: ResearchProposalForm) => {
    setSubmitting(true);
    // attach files
    const payload = { ...data, paymentReceipt: paymentFile, proposalDocument: proposalFile } as any;
    console.log('Submitting (mock):', payload);
    setTimeout(() => { setSubmitting(false); alert('Proposal submitted (mock)'); }, 1500);
  };

  const onSaveDraft = () => {
    const draft = { ...values, paymentReceipt: paymentFile?.name, proposalDocument: proposalFile?.name, supervisors };
    console.log('Draft saved (mock):', draft);
    alert('Draft saved (mock)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-6">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-amber-600 px-6 md:px-8 py-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-12 w-12 bg-white/20 rounded-lg mb-2" />
                <h1 className="text-2xl font-bold">Research Project Proposal Submission</h1>
                <p className="text-sm text-green-50">Wayamba University of Sri Lanka — Postgraduate Research Portal</p>
              </div>

              <aside className="w-80 hidden md:block">
                <div className="border border-white/20 rounded-2xl p-4 bg-white/5 shadow-sm mb-4">
                  <h4 className="font-semibold text-white">Submission Guidelines</h4>
                  <p className="text-xs text-white/80 mt-2">Upload proposal as PDF. Payment receipts accepted as PDF/JPG/PNG. Keep files within size limits.</p>
                </div>

                <div className="border border-white/20 rounded-2xl p-4 bg-white/5 shadow-sm">
                  <h4 className="font-semibold text-white">Support</h4>
                  <p className="text-xs text-white/80 mt-2">Contact admissions@wyb.ac.lk for help.</p>
                </div>
              </aside>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <main className="md:col-span-2 space-y-6">
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Proposal Information</h3>
              <FormInput label="Project Title" {...register('projectTitle')} error={errors.projectTitle?.message as any} />
              <div className="mt-4"><FormTextarea label="Research Objective" {...register('objective')} error={errors.objective?.message as any} /></div>
              <div className="mt-4"><FormInput label="Proposed Date" type="date" {...register('proposedDate')} error={errors.proposedDate?.message as any} /></div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Degree & Payment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect label="Degree Type" {...register('degreeType')} options={[{label:'MSc',value:'MSc'},{label:'MPhil',value:'MPhil'},{label:'MBA',value:'MBA'},{label:'PhD',value:'PhD'}]} error={errors.degreeType?.message as any} />
                <FormSelect label="Payment Method" {...register('paymentMethod')} options={[{label:'Cash Deposit',value:'Cash Deposit'},{label:'Bank Transfer',value:'Bank Transfer'},{label:'Online Payment',value:'Online Payment'}]} error={errors.paymentMethod?.message as any} />
              </div>

              <div className="mt-4">
                <FileUploadCard label="Payment Receipt" accept={["application/pdf","image/jpeg","image/png"]} maxSizeBytes={5*1024*1024} onFileChange={(f)=>setPaymentFile(f)} currentFile={paymentFile} />
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Supervisor Selection</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SupervisorSelector onAdd={addSupervisor} existing={supervisors} />
                <SupervisorTable supervisors={supervisors} onRemove={removeSupervisor} />
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Proposal Document</h3>
              <FileUploadCard label="Research Proposal (PDF only)" accept={["application/pdf"]} maxSizeBytes={10*1024*1024} onFileChange={(f)=>setProposalFile(f)} currentFile={proposalFile} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
              <ReviewCard values={{ projectTitle: values.projectTitle, objective: values.objective, proposedDate: values.proposedDate, degreeType: values.degreeType as any, paymentMethod: values.paymentMethod as any, supervisors, proposalDocument: proposalFile as any, paymentReceipt: paymentFile as any }} />
            </motion.section>
          </main>

          <aside className="md:col-span-1 space-y-6">
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <h4 className="font-semibold mb-2">Quick Summary</h4>
              <p className="text-xs text-gray-600">Project: {values.projectTitle || '—'}</p>
              <p className="text-xs text-gray-600">Degree: {values.degreeType || '—'}</p>
              <p className="text-xs text-gray-600">Supervisors: {supervisors.length}</p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <h4 className="font-semibold">Accepted Formats</h4>
              <p className="text-xs text-gray-600 mt-2">Proposal: PDF • Receipt: PDF/JPG/PNG</p>
            </div>
          </aside>

          <div className="md:col-span-3">
            <StickyActionBar onSaveDraft={onSaveDraft} onSubmit={() => handleSubmit(onSubmit)()} submitting={submitting} />
          </div>
        </form>
      </div>
    </div>
  );
}
