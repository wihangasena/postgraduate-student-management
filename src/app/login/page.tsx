'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Eye, EyeOff, Loader2, ShieldCheck, GraduationCap, Users2, BadgeCheck, AlertCircle, LogIn } from 'lucide-react';
import { getDashboardRoute, portalRoleMeta, setPortalSession, type PortalRole } from '@/lib/portal';

const roleCards: Array<{ role: PortalRole; label: string; description: string; icon: React.ReactNode }> = [
  { role: 'student', label: 'Student', description: 'Access proposals, meetings, and progress tracking.', icon: <GraduationCap className="h-5 w-5" /> },
  { role: 'supervisor', label: 'Supervisor', description: 'Review students and manage approvals.', icon: <Users2 className="h-5 w-5" /> },
  { role: 'admin', label: 'Admin', description: 'Monitor activity and allocate supervision.', icon: <ShieldCheck className="h-5 w-5" /> },
];

type LoginErrors = Partial<Record<'email' | 'password' | 'role' | 'form', string>>;

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<PortalRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const selectedRoleMeta = useMemo(() => portalRoleMeta[role], [role]);

  const validate = () => {
    const nextErrors: LoginErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!emailPattern.test(email)) nextErrors.email = 'Enter a valid university email address.';

    if (!password) nextErrors.password = 'Password is required.';
    else if (password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';

    if (!role) nextErrors.role = 'Please select a role.';

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    const displayName = `${selectedRoleMeta.label} User`;
    setPortalSession({
      role,
      name: displayName,
      email,
      issuedAt: new Date().toISOString(),
    });

    router.push(getDashboardRoute(role));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.18),_transparent_34%),linear-gradient(180deg,_#0f172a,_#111827_60%,_#0f172a)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />

        <div className="relative mx-auto flex h-full max-w-2xl flex-col justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
              <BadgeCheck className="h-4 w-4" />
              Wayamba University Postgraduate Portal
            </div>

            <h1 className="mt-8 max-w-xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Secure access for students, supervisors, and administrators.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              A clean university portal for postgraduate workflows, role-based entry, and future dashboards. This frontend uses mock authentication only.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {roleCards.map((item) => (
              <div key={item.role} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-emerald-200">
                  {item.icon}
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">{item.label}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Portal help</p>
            <p className="mt-2 text-sm text-slate-300">
              Student registration: <Link href="/student-registration" className="font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-4">open form</Link> · Supervisor registration: <Link href="/supervisor-registration" className="font-semibold text-amber-300 underline decoration-amber-300/40 underline-offset-4">open form</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Login</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Sign in to continue</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Select your role and use mock credentials to enter the matching dashboard.</p>
            </div>
            <div className="hidden rounded-2xl bg-emerald-50 p-3 text-emerald-700 sm:block">
              <LogIn className="h-6 w-6" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Role selector</label>
              <select
                aria-label="Role selector"
                title="Role selector"
                value={role}
                onChange={(event) => setRole(event.target.value as PortalRole)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                <option value="student">Student</option>
                <option value="supervisor">Supervisor</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role}</p>}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {roleCards.map((item) => {
                const active = role === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setRole(item.role)}
                    className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${active ? 'border-emerald-300 bg-emerald-50 ring-4 ring-emerald-100' : 'border-slate-200 bg-white'}`}
                  >
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      {item.icon}
                    </div>
                    <p className="mt-3 font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                  </button>
                );
              })}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">University email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@wyb.ac.lk"
                className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 ${errors.email ? 'border-red-300' : 'border-slate-200'}`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 ${errors.password ? 'border-red-300' : 'border-slate-200'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 inline-flex items-center justify-center px-4 text-slate-500 transition hover:text-slate-800"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            {errors.form && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <p>{errors.form}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
              {isLoading ? 'Signing in...' : `Sign in as ${selectedRoleMeta.label}`}
            </button>

            <div className="grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
              <Link href="/student-registration" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">
                Register as Student
              </Link>
              <Link href="/supervisor-registration" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-800 transition hover:bg-amber-100">
                Register as Supervisor
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
