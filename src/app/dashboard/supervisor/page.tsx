'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, ClipboardCheck, Users2, FileCheck2, MessageSquare, ArrowRight, User, GraduationCap, Shield } from 'lucide-react';
import { DashboardShell, MetricCard, SectionCard } from '@/components/dashboard';
import { getPortalSession, type PortalSession } from '@/lib/portal';

type StudentRow = { name: string; programme: string; stage: string; progress: string; status: string };

export default function SupervisorDashboardPage() {
  const [session, setSession] = useState<PortalSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSession(getPortalSession());
      setIsLoading(false);
    }, 550);

    return () => window.clearTimeout(timer);
  }, []);

  const students: StudentRow[] = useMemo(
    () => [
      { name: 'Ayesha Peris', programme: 'MSc Data Science', stage: 'Proposal review', progress: '72%', status: 'Needs approval' },
      { name: 'Malith Jayasena', programme: 'MPhil Management', stage: 'Literature review', progress: '48%', status: 'In progress' },
      { name: 'Nimasha Silva', programme: 'PhD Education', stage: 'Chapter outline', progress: '85%', status: 'Ready for meeting' },
    ],
    [],
  );

  if (isLoading) return <DashboardSkeleton />;

  if (!session || session.role !== 'supervisor') {
    return (
      <AccessPrompt
        title="Supervisor dashboard access"
        description="Login as a supervisor to view the dashboard. This is mock frontend-only state."
        action={<Link href="/login" className="inline-flex rounded-2xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-500">Go to login</Link>}
      />
    );
  }

  return (
    <DashboardShell
      role="supervisor"
      title="Supervisor Dashboard"
      subtitle="Student supervision and approvals"
      navItems={[
        { label: 'Overview', href: '#overview', icon: <Shield className="h-4 w-4" /> },
        { label: 'Students', href: '#students', icon: <Users2 className="h-4 w-4" /> },
        { label: 'Approvals', href: '#approvals', icon: <FileCheck2 className="h-4 w-4" /> },
        { label: 'Meetings', href: '#meetings', icon: <CalendarDays className="h-4 w-4" /> },
      ]}
      userName={session.name}
    >
      <div id="overview" className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">Welcome back</p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{session.name}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">Review assigned students, approve proposals, and coordinate meetings using the mock supervision dashboard.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
              <ActionChip label="View Student" href="#students" icon={<User className="h-4 w-4" />} />
              <ActionChip label="Approve Proposal" href="#approvals" icon={<FileCheck2 className="h-4 w-4" />} />
              <ActionChip label="Schedule Meeting" href="#meetings" icon={<MessageSquare className="h-4 w-4" />} />
              <ActionChip label="Documents" href="#students" icon={<GraduationCap className="h-4 w-4" />} />
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Assigned Students" value="12" hint="3 needing review" icon={<Users2 className="h-5 w-5" />} tone="amber" />
          <MetricCard label="Pending Approvals" value="4" hint="Proposal decisions" icon={<ClipboardCheck className="h-5 w-5" />} tone="emerald" />
          <MetricCard label="Meeting Requests" value="7" hint="This week" icon={<CalendarDays className="h-5 w-5" />} tone="blue" />
          <MetricCard label="Research Progress" value="81%" hint="Average cohort status" icon={<Shield className="h-5 w-5" />} tone="slate" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <SectionCard id="students" title="Assigned Students" description="Mock student supervision table.">
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {['Student', 'Programme', 'Stage', 'Progress', 'Status', 'Actions'].map((head) => (
                      <th key={head} className="px-4 py-3 text-left font-semibold text-slate-600">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {students.map((student) => (
                    <tr key={student.name} className="transition hover:bg-slate-50">
                      <td className="px-4 py-4 font-semibold text-slate-900">{student.name}</td>
                      <td className="px-4 py-4 text-slate-600">{student.programme}</td>
                      <td className="px-4 py-4 text-slate-600">{student.stage}</td>
                      <td className="px-4 py-4 text-slate-600">{student.progress}</td>
                      <td className="px-4 py-4 text-slate-600">{student.status}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <MiniAction>View Student</MiniAction>
                          <MiniAction>Approve Proposal</MiniAction>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard id="approvals" title="Pending Approvals" description="Actions waiting for supervisor review.">
              <div className="space-y-3">
                {[
                  'Proposal from Ayesha Peris ready for approval',
                  'Extension request from Malith Jayasena',
                  'Chapter outline review for Nimasha Silva',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item}</p>
                    <div className="mt-3 flex gap-2">
                      <MiniAction>Approve</MiniAction>
                      <MiniAction>Review</MiniAction>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard id="meetings" title="Meeting Requests" description="Upcoming consultation requests.">
              <div className="space-y-3">
                {[
                  { name: 'Ayesha Peris', time: 'Today, 3:00 PM' },
                  { name: 'Malith Jayasena', time: 'Tomorrow, 10:00 AM' },
                  { name: 'Nimasha Silva', time: 'Friday, 1:30 PM' },
                ].map((meeting) => (
                  <div key={meeting.name} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{meeting.name}</p>
                      <p className="text-sm text-slate-500">{meeting.time}</p>
                    </div>
                    <MiniAction>Schedule</MiniAction>
                  </div>
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
          <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="h-96 rounded-3xl bg-slate-200/70 animate-pulse" />
            <div className="h-96 rounded-3xl bg-slate-200/70 animate-pulse" />
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
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <Shield className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}

function ActionChip({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700">
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function MiniAction({ children }: { children: React.ReactNode }) {
  return <button className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800">{children}</button>;
}
