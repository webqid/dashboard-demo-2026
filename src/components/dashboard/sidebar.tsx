'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  IconDashboard,
  IconProjects,
  IconUsers,
  IconSettings,
} from '@/components/icons';

const navigation = [
  { name: 'overview', href: '/dashboard', icon: IconDashboard },
  { name: 'projects', href: '/dashboard/projects', icon: IconProjects },
  { name: 'team', href: '/dashboard/team', icon: IconUsers },
  { name: 'settings', href: '/dashboard/settings', icon: IconSettings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-text-primary/10 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-56 bg-surface border-r border-border transition-transform duration-200 ease-out lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-14 items-center px-5 border-b border-border">
          <Link href="/" className="flex items-center gap-1.5 text-text-primary">
            <span className="text-[15px] font-medium tracking-tight">webqid.</span>
          </Link>
        </div>

        <nav className="flex flex-col gap-0.5 p-3" aria-label="Sidebar navigation">
          {navigation.map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-surface-muted text-text-primary'
                    : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors duration-150"
          >
            ← back to site
          </Link>
        </div>
      </aside>
    </>
  );
}
