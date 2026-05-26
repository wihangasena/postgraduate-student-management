'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { clearPortalSession, portalRoleMeta, type PortalRole } from '@/lib/portal';
import { LogOut, GraduationCap, Menu } from 'lucide-react';

export interface DashboardNavItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface DashboardShellProps {
  role: PortalRole;
  title: string;
  subtitle: string;
  navItems: DashboardNavItem[];
  userName: string;
  children: ReactNode;
}

export function DashboardShell({ role, title, subtitle, navItems, userName, children }: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const roleMeta = portalRoleMeta[role];

  const handleSignOut = () => {
    clearPortalSession();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white/90 backdrop-blur lg:border-b-0 lg:border-r lg:border-slate-200">
          <div className={`px-6 py-6 bg-gradient-to-br ${role === 'student' ? 'from-emerald-600 to-teal-600' : role === 'supervisor' ? 'from-amber-500 to-orange-500' : 'from-slate-900 to-slate-700'} text-white`}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/75">Wayamba University</p>
                <h1 className="text-lg font-bold">Postgraduate Portal</h1>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium">{roleMeta.label} Dashboard</p>
              <p className="mt-1 text-sm text-white/80">{roleMeta.description}</p>
            </div>
          </div>

          <nav className="space-y-2 px-4 py-5">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname === `${item.href}/`;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${active ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Signed in as</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{userName}</p>
            <p className="text-sm text-slate-600">{roleMeta.label}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button title="Open navigation menu" aria-label="Open navigation menu" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                  <p className="text-sm text-slate-500">{subtitle}</p>
                </div>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">{userName}</div>
                <div className={`rounded-full px-4 py-2 text-sm font-medium ${role === 'student' ? 'bg-emerald-50 text-emerald-700' : role === 'supervisor' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{roleMeta.label}</div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
