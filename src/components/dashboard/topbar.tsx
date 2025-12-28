import { getServerSession } from '@/lib/auth';
import { Avatar, ThemeToggle } from '@/components/ui';
import { IconBell, IconSearch } from '@/components/icons';
import { TopbarClient } from './topbar-client';

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const user = getServerSession();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-surface px-4 sm:px-6">
      <TopbarClient onMenuClick={onMenuClick} />

      {/* Search */}
      <div className="flex-1 max-w-sm hidden sm:block">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="search"
            placeholder="search..."
            className="w-full h-8 rounded-md border border-border bg-surface-muted pl-9 pr-3 text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 focus:bg-surface transition-colors duration-150"
          />
        </div>
      </div>

      <div className="flex-1 sm:hidden" />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        
        <button
          type="button"
          className="relative rounded-md p-1.5 text-text-muted hover:bg-surface-muted hover:text-text-secondary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="View notifications"
        >
          <IconBell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-brand" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="sm"
          />
          <div className="hidden md:block">
            <p className="text-sm text-text-primary">{user.name}</p>
            <p className="text-xs text-text-muted">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
