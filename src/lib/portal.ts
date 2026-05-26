export type PortalRole = 'student' | 'supervisor' | 'admin';

export interface PortalSession {
  role: PortalRole;
  name: string;
  email: string;
  issuedAt: string;
}

export const portalRoleMeta: Record<PortalRole, { label: string; route: string; tone: string; description: string }> = {
  student: {
    label: 'Student',
    route: '/dashboard/student',
    tone: 'emerald',
    description: 'Apply, track progress, and manage meetings.',
  },
  supervisor: {
    label: 'Supervisor',
    route: '/dashboard/supervisor',
    tone: 'amber',
    description: 'Review students, approve proposals, and plan meetings.',
  },
  admin: {
    label: 'Admin',
    route: '/dashboard/admin',
    tone: 'slate',
    description: 'Oversee portal activity and manage assignments.',
  },
};

const SESSION_KEY = 'wayamba-portal-session';

export const getDashboardRoute = (role: PortalRole) => portalRoleMeta[role].route;

export const getPortalSession = (): PortalSession | null => {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as PortalSession) : null;
  } catch {
    return null;
  }
};

export const setPortalSession = (session: PortalSession) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const clearPortalSession = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SESSION_KEY);
};
