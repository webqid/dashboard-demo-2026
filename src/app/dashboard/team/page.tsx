import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getUsers } from '@/lib/data';
import { TeamTable } from '@/components/dashboard';
import { SkeletonTable } from '@/components/ui';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Manage your team members and permissions.',
};

async function TeamContent() {
  const users = await getUsers();

  return <TeamTable users={users} />;
}

export default function TeamPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-medium text-text-primary">team</h1>
          <p className="text-text-secondary mt-1">
            manage team members and their access levels.
          </p>
        </div>
        <Button>invite member</Button>
      </div>

      <Suspense
        fallback={
          <div className="bg-surface rounded-lg border border-border p-6">
            <SkeletonTable rows={5} />
          </div>
        }
      >
        <TeamContent />
      </Suspense>
    </div>
  );
}
