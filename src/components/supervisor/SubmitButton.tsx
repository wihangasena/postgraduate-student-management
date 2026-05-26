'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ loading }) => {
  return (
    <motion.button
      type="submit"
      whileHover={{ scale: loading ? 1 : 1.01 }}
      whileTap={{ scale: loading ? 1 : 0.99 }}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:from-emerald-700 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <Send size={18} />
          Submit Supervisor Details
        </>
      )}
    </motion.button>
  );
};
