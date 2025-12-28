import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/data';
import { ProjectsTable } from '@/components/dashboard';
import { SkeletonTable } from '@/components/ui';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Manage your projects and track progress.',
};

async function ProjectsContent() {
  const projects = await getProjects();

  return <ProjectsTable projects={projects} />;
}

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-medium text-text-primary">projects</h1>
          <p className="text-text-secondary mt-1">
            manage and monitor all your active projects.
          </p>
        </div>
        <Button>new project</Button>
      </div>

      <Suspense
        fallback={
          <div className="bg-surface rounded-lg border border-border p-6">
            <SkeletonTable rows={5} />
          </div>
        }
      >
        <ProjectsContent />
      </Suspense>
    </div>
  );
}
