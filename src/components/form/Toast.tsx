import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
}

interface ToastProps {
  toast: Toast;
  onClose: () => void;
}

const SingleToast: FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = toast.type === 'success';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
        isSuccess
          ? 'bg-green-50 border border-green-200'
          : 'bg-red-50 border border-red-200'
      }`}
    >
      {isSuccess ? (
        <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
      ) : (
        <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
      )}
      <p className={`text-sm font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
        {toast.message}
      </p>
      <button
        onClick={onClose}
        className={`ml-auto flex-shrink-0 ${
          isSuccess ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'
        }`}
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer: FC = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <SingleToast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return { addToast, ToastContainer };
};
