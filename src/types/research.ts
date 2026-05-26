export interface Supervisor {
  id: string;
  name: string;
  title: string;
  email: string;
}

export interface ProposalFormValues {
  projectTitle: string;
  objective: string;
  proposedDate: string;
  degreeType: 'MSc' | 'MPhil' | 'MBA' | 'PhD' | '';
  paymentMethod: 'Cash Deposit' | 'Bank Transfer' | 'Online Payment' | '';
  paymentReceipt?: File | null;
  proposalDocument?: File | null;
  supervisors: Supervisor[];
}
