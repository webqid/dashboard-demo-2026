import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getUserSettings } from '@/lib/data';
import { SettingsForm } from './settings-form';
import { Skeleton } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences.',
};

async function SettingsContent() {
  const settings = await getUserSettings();

  return <SettingsForm initialSettings={settings} />;
}

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-surface rounded-lg border border-border p-6"
        >
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-text-primary">settings</h1>
        <p className="text-text-secondary mt-1">
          manage your account settings and preferences.
        </p>
      </div>

      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
