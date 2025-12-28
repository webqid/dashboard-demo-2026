'use client';

import { IconMenu } from '@/components/icons';

interface TopbarClientProps {
  onMenuClick?: () => void;
}

export function TopbarClient({ onMenuClick }: TopbarClientProps) {
  return (
    <button
      type="button"
      onClick={onMenuClick}
      className="lg:hidden rounded-md p-1.5 text-text-muted hover:bg-surface-muted hover:text-text-secondary transition-colors duration-150"
      aria-label="Open sidebar menu"
    >
      <IconMenu className="h-5 w-5" />
    </button>
  );
}
