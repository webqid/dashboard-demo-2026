import type { Metadata } from 'next';
import { DashboardShell } from '@/components/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your analytics, projects, and team activity.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
