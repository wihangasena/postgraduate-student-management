'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, BellRing, CalendarDays, FileText, MessageSquare, Send, User, Users2, ArrowRight, Shield, GraduationCap } from 'lucide-react';
import { DashboardShell, MetricCard, SectionCard } from '@/components/dashboard';
import { getPortalSession, type PortalSession } from '@/lib/portal';

export default function StudentDashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<PortalSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSession(getPortalSession());
      setIsLoading(false);
    }, 550);

    return () => window.clearTimeout(timer);
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Proposal Stage', value: 'Draft', hint: 'Ready for review', icon: <FileText className="h-5 w-5" />, tone: 'emerald' as const },
      { label: 'Completed Milestones', value: '4/6', hint: '67% progress', icon: <Shield className="h-5 w-5" />, tone: 'blue' as const },
      { label: 'Next Meeting', value: 'Thu 2:00 PM', hint: 'Supervisor review slot', icon: <CalendarDays className="h-5 w-5" />, tone: 'amber' as const },
      { label: 'Unread Notifications', value: '3', hint: 'Updated this morning', icon: <BellRing className="h-5 w-5" />, tone: 'slate' as const },
    ],
    [],
  );

  if (isLoading) {
    return <DashboardSkeleton role="student" />;
  }

  if (!session || session.role !== 'student') {
    return (
      <AccessPrompt
        title="Student dashboard access"
        description="Login as a student to view the dashboard. The page uses mock session state only."
        action={<Link href="/login" className="inline-flex rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500">Go to login</Link>}
      />
    );
  }

  return (
    <DashboardShell
      role="student"
      title="Student Dashboard"
      subtitle="Postgraduate research overview"
      navItems={[
        { label: 'Overview', href: '#overview', icon: <GraduationCap className="h-4 w-4" /> },
        { label: 'Profile', href: '#profile', icon: <User className="h-4 w-4" /> },
        { label: 'Supervisor', href: '#supervisor', icon: <Users2 className="h-4 w-4" /> },
        { label: 'Meetings', href: '#meetings', icon: <CalendarDays className="h-4 w-4" /> },
      ]}
      userName={session.name}
    >
      <div id="overview" className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-900 p-6 text-white shadow-lg sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/70">Welcome back</p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight">{session.name}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                  Your postgraduate application is in progress. Use the quick actions to submit documents, request a meeting, and keep track of your research milestones.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                <QuickActionButton label="Submit Proposal" href="/student-registration" icon={<Send className="h-4 w-4" />} />
                <QuickActionButton label="View Documents" href="#documents" icon={<BookOpen className="h-4 w-4" />} />
                <QuickActionButton label="Request Meeting" href="#meetings" icon={<MessageSquare className="h-4 w-4" />} />
                <QuickActionButton label="Notifications" href="#notifications" icon={<BellRing className="h-4 w-4" />} />
              </div>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <MetricCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Research Progress" description="Your proposal workflow and milestone completion.">
              <div className="space-y-4">
                <div className="flex items-end justify-between text-sm text-slate-600">
                  <span>Overall completion</span>
                  <span className="font-semibold text-slate-900">67%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 w-[67%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {['Proposal Draft', 'Supervisor Review', 'Document Upload'].map((item, index) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Upcoming Meetings" description="Mock meeting schedule and reminders.">
              <div id="meetings" className="space-y-3">
                {[
                  { day: 'Tue', title: 'Supervisor review', time: '10:30 AM' },
                  { day: 'Thu', title: 'Progress check-in', time: '02:00 PM' },
                  { day: 'Mon', title: 'Document feedback', time: '11:15 AM' },
                ].map((meeting) => (
                  <div key={meeting.title} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{meeting.title}</p>
                      <p className="text-sm text-slate-500">{meeting.day}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{meeting.time}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="space-y-6">
          <SectionCard id="profile" title="Student Profile" description="Snapshot of your current postgraduate details.">
            <div className="space-y-4">
              {[
                ['Programme', 'MSc in Computer Science'],
                ['Faculty', 'Faculty of Applied Sciences'],
                ['Batch', '2026 Intake'],
                ['Email', session.email],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-semibold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard id="supervisor" title="Assigned Supervisor" description="Mock assigned academic supervisor.">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-lg font-bold text-slate-900">Dr. N. Perera</p>
              <p className="mt-1 text-sm text-slate-600">Senior Lecturer, Faculty of Computing</p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>Research area: Intelligent Systems</p>
                <p>Office hours: Wed 1:00 PM - 3:00 PM</p>
                <p>Status: Available for consultation</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard id="documents" title="Quick Actions" description="Fast access to common student tasks.">
            <div className="grid gap-3">
              {[
                ['Submit Proposal', '/student-registration'],
                ['View Documents', '#documents'],
                ['Request Meeting', '#meetings'],
                ['Notifications', '#notifications'],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                  <span>{label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardShell>
  );
}

function DashboardSkeleton({ role }: { role: 'student' | 'supervisor' | 'admin' }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[80vh] max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-12 rounded-2xl bg-slate-200/80 animate-pulse" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-10 rounded-2xl bg-slate-200/70 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-40 rounded-[2rem] bg-slate-200/80 animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-32 rounded-3xl bg-slate-200/70 animate-pulse" />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
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
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <User className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}

function QuickActionButton({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
