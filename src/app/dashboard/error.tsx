'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';
import { IconError } from '@/components/icons';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-surface-muted p-4 mb-4">
        <IconError className="h-8 w-8 text-text-muted" />
      </div>
      <h2 className="text-lg font-medium text-text-primary">
        something went wrong
      </h2>
      <p className="mt-1 text-sm text-text-secondary max-w-sm">
        we encountered an error while loading this page. please try again.
      </p>
      <Button onClick={reset} variant="secondary" className="mt-4">
        try again
      </Button>
    </div>
  );
}
