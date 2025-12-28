import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-surface-muted text-text-secondary': variant === 'default',
          'bg-brand-soft/30 text-success': variant === 'success',
          'bg-amber-50 text-warning': variant === 'warning',
          'bg-red-50 text-error': variant === 'danger',
          'bg-blue-50 text-info': variant === 'info',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
