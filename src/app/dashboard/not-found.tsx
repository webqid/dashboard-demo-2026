import Link from 'next/link';
import { Button } from '@/components/ui';
import { IconEmpty } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-surface-muted p-4 mb-4">
        <IconEmpty className="h-8 w-8 text-text-muted" />
      </div>
      <h2 className="text-lg font-medium text-text-primary">page not found</h2>
      <p className="mt-1 text-sm text-text-secondary max-w-sm">
        the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/dashboard">
        <Button variant="secondary" className="mt-4">
          back to dashboard
        </Button>
      </Link>
    </div>
  );
}
