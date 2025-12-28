import { Suspense } from 'react';
import { getDashboardData } from '@/lib/data';
import { 
  KPIGrid, 
  RechartsLineChart, 
  RechartsBarChart,
  DonutChart,
  ActivityList,
  monthlyTrendData,
  projectStatusData,
  trafficSourceData,
} from '@/components/dashboard';
import { SkeletonCard } from '@/components/ui';

export const dynamic = 'force-dynamic';

async function DashboardContent() {
  const { kpis, chartData, recentActivity } = await getDashboardData();

  return (
    <>
      <KPIGrid kpis={kpis} />

      {/* Charts Row 1: Line/Area Chart and Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RechartsLineChart 
          data={monthlyTrendData} 
          title="Revenue Trend" 
          showArea 
        />
        <RechartsBarChart 
          data={chartData} 
          title="Weekly Revenue" 
        />
      </div>

      {/* Charts Row 2: Donut Charts and Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <DonutChart 
          data={projectStatusData} 
          title="Project Status"
          centerValue="25"
          centerLabel="Total Projects"
        />
        <DonutChart 
          data={trafficSourceData} 
          title="Traffic Sources"
          centerValue="11.2k"
          centerLabel="Total Visitors"
        />
        <div className="md:col-span-2 lg:col-span-1">
          <ActivityList activities={recentActivity} />
        </div>
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
        <SkeletonCard className="h-72" />
        <SkeletonCard className="h-72" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <SkeletonCard className="h-72" />
        <SkeletonCard className="h-72" />
        <SkeletonCard className="h-72 md:col-span-2 lg:col-span-1" />
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
