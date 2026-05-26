'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative blobs */}
      <div className="absolute -right-20 -top-24 w-96 h-96 bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300 rounded-full blur-3xl opacity-30 transform rotate-12" />
      <div className="absolute -left-28 -bottom-24 w-80 h-80 bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-300 rounded-full blur-3xl opacity-25 transform -rotate-12" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-sm border border-emerald-100">Wayamba University</div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">Postgraduate Research Portal</h1>

            <p className="text-slate-600 max-w-xl text-lg leading-8">Welcome to the postgraduate portal for Wayamba University. Students can apply and submit proposal documents, while supervisors can register and manage supervision in one place.</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-white/85 backdrop-blur p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Login</p>
                <h2 className="mt-2 text-lg font-bold text-slate-900">Access your account</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Choose your role and continue to the matching portal.</p>
                <div className="mt-4 space-y-3">
                  <button onClick={() => router.push('/login')} className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-left font-semibold text-white shadow-sm transition hover:bg-emerald-500">Login as a Student</button>
                  <button onClick={() => router.push('/login')} className="w-full rounded-xl bg-slate-900 px-4 py-3 text-left font-semibold text-white shadow-sm transition hover:bg-slate-800">Login as a Supervisor</button>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-white/85 backdrop-blur p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Register</p>
                <h2 className="mt-2 text-lg font-bold text-slate-900">Create a new account</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Start as a student or supervisor using the existing forms.</p>
                <div className="mt-4 space-y-3">
                  <Link href="/student-registration" className="block rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-100">Register as a Student</Link>
                  <Link href="/supervisor-registration" className="block rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-semibold text-amber-800 transition hover:bg-amber-100">Register as a Supervisor</Link>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-600">Need help? Contact <a href="mailto:admissions@wyb.ac.lk" className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4">admissions@wyb.ac.lk</a></div>
          </motion.section>

          <motion.aside initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/70">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Portal note</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Student proposal form</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The proposal submission form will be available after the login flow and later dashboard work.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
