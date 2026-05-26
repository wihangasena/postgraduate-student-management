'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Shield, Users2, GraduationCap, ClipboardList, FileBarChart2, UserCog2, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { DashboardShell, MetricCard, SectionCard } from '@/components/dashboard';
import { getPortalSession, type PortalSession } from '@/lib/portal';

export default function AdminDashboardPage() {
  const [session, setSession] = useState<PortalSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSession(getPortalSession());
      setIsLoading(false);
    }, 550);

    return () => window.clearTimeout(timer);
  }, []);

  const recentActivities = useMemo(
    () => [
      'Supervisor Dr. Perera verified a proposal.',
      '3 new student profiles created today.',
      '2 supervision slots were allocated.',
      'Annual report export completed successfully.',
    ],
    [],
  );

  if (isLoading) return <DashboardSkeleton />;

  if (!session || session.role !== 'admin') {
    return (
      <AccessPrompt
        title="Admin dashboard access"
        description="Login as an admin to view the portal administration area. This mock app does not use backend authentication."
        action={<Link href="/login" className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">Go to login</Link>}
      />
    );
  }

  return (
    <DashboardShell
      role="admin"
      title="Admin Dashboard"
      subtitle="Portal administration overview"
      navItems={[
        { label: 'Overview', href: '#overview', icon: <ShieldAlert className="h-4 w-4" /> },
        { label: 'Students', href: '#students', icon: <GraduationCap className="h-4 w-4" /> },
        { label: 'Supervisors', href: '#supervisors', icon: <Users2 className="h-4 w-4" /> },
        { label: 'Reports', href: '#reports', icon: <FileBarChart2 className="h-4 w-4" /> },
      ]}
      userName={session.name}
    >
      <div id="overview" className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Administration</p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight">Welcome, {session.name}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">A minimal administration dashboard for managing students, supervisors, reports, and approvals using mock data only.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
              <AdminAction label="Manage Students" href="#students" icon={<GraduationCap className="h-4 w-4" />} />
              <AdminAction label="Manage Supervisors" href="#supervisors" icon={<Users2 className="h-4 w-4" />} />
              <AdminAction label="Allocate Supervisors" href="#supervisors" icon={<UserCog2 className="h-4 w-4" />} />
              <AdminAction label="View Reports" href="#reports" icon={<FileBarChart2 className="h-4 w-4" />} />
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total Students" value="248" hint="18 added this week" icon={<GraduationCap className="h-5 w-5" />} tone="emerald" />
          <MetricCard label="Total Supervisors" value="46" hint="4 new assignments" icon={<Users2 className="h-5 w-5" />} tone="amber" />
          <MetricCard label="Pending Approvals" value="11" hint="Awaiting review" icon={<ClipboardList className="h-5 w-5" />} tone="blue" />
          <MetricCard label="Open Reports" value="5" hint="Portal activity logs" icon={<FileBarChart2 className="h-5 w-5" />} tone="slate" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SectionCard id="students" title="Student Management" description="High-level student operations.">
            <div className="grid gap-3 sm:grid-cols-2">
              {['Add student profile', 'Review registrations', 'Export student list', 'Track proposal submissions'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">{item}</p>
                  <p className="mt-1 text-sm text-slate-500">Mock admin action</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard id="supervisors" title="Supervisor Management" description="Simple allocation and role management.">
              <div className="space-y-3">
                {['Add supervisor', 'Allocate student', 'Review workload'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                    <span className="text-sm font-semibold text-slate-900">{item}</span>
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard id="reports" title="Recent Activities" description="Current portal activity feed.">
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">{activity}</div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[80vh] max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-12 rounded-2xl bg-slate-200/80 animate-pulse" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-10 rounded-2xl bg-slate-200/70 animate-pulse" />)}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-40 rounded-[2rem] bg-slate-200/80 animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-32 rounded-3xl bg-slate-200/70 animate-pulse" />)}
          </div>
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="h-72 rounded-3xl bg-slate-200/70 animate-pulse" />
            <div className="h-72 rounded-3xl bg-slate-200/70 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AccessPrompt({ title, description, action }: { title: string; description: string; action: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Shield className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}

function AdminAction({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
