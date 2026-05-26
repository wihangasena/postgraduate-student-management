'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 md:px-8 py-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-300 rounded-full animate-pulse opacity-75" />
                <CheckCircle size={80} className="relative" />
              </div>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Application Submitted Successfully!
            </h1>
            <p className="text-green-50 text-lg">
              Thank you for applying to Wayamba University of Sri Lanka
            </p>
          </div>

          {/* Content */}
          <div className="px-6 md:px-8 py-8 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-6"
            >
              {/* Confirmation Email */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex gap-4">
                <Mail className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Check Your Email
                  </h3>
                  <p className="text-blue-800 text-sm">
                    A confirmation email has been sent to your registered email address.
                    Please check your inbox and spam folder.
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-4">
                  What's Next?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Your application has been received and is under review',
                    'You will receive updates via email regarding your application status',
                    'The admissions team will contact you if additional information is needed',
                    'Decisions will be communicated within 4-6 weeks',
                  ].map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 font-semibold text-sm flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Important Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold text-amber-900 mb-2">Important Notice</h4>
                <p className="text-amber-800 text-sm">
                  Please keep your application reference number and confirmation email for your records.
                  You may need these for future correspondence.
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Need Help?
                </h4>
                <p className="text-gray-700 mb-2">
                  Contact the Admissions Office:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:admissions@wyb.ac.lk"
                      className="text-green-600 hover:text-green-700"
                    >
                      admissions@wyb.ac.lk
                    </a>
                  </li>
                  <li>
                    <strong>Phone:</strong> +94 (0) 701 395 571
                  </li>
                  <li>
                    <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 4:00 PM
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 flex gap-4 flex-col sm:flex-row"
            >
              <Link
                href="/"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
              >
                Submit Another Application
              </Link>
              <a
                href="https://www.wyb.ac.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Visit University Website
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
