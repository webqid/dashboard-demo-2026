import { Suspense } from 'react';
import { getDashboardData } from '@/lib/data';
import { KPIGrid, BarChart, ActivityList } from '@/components/dashboard';
import { SkeletonCard } from '@/components/ui';

export const dynamic = 'force-dynamic';

async function DashboardContent() {
  const { kpis, chartData, recentActivity } = await getDashboardData();

  return (
    <>
      <KPIGrid kpis={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <BarChart data={chartData} title="Weekly Revenue" />
        <ActivityList activities={recentActivity} />
      </div>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-text-primary">overview</h1>
        <p className="text-text-secondary mt-1">
          welcome back. here&apos;s what&apos;s happening with your projects.
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
