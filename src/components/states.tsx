import { IconEmpty, IconError } from '@/components/icons';
import { Button } from '@/components/ui';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-surface-muted p-4 mb-4">
        <IconEmpty className="h-8 w-8 text-text-muted" />
      </div>
      <h3 className="text-base font-medium text-text-primary">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-text-secondary max-w-sm">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} className="mt-4" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'something went wrong',
  message = 'we encountered an error while loading this content. please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-surface-muted p-4 mb-4">
        <IconError className="h-8 w-8 text-text-muted" />
      </div>
      <h3 className="text-base font-medium text-text-primary">{title}</h3>
      <p className="mt-1 text-sm text-text-secondary max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" className="mt-4" size="sm">
          try again
        </Button>
      )}
    </div>
  );
}

export function LoadingState({ message = 'loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
      <p className="mt-4 text-sm text-text-secondary">{message}</p>
    </div>
  );
}
