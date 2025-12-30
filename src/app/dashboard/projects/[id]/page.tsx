import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProject, getUsers } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, Avatar, Skeleton } from '@/components/ui';
import { IconChevronRight } from '@/components/icons';
import { getStatusColor, formatRelativeTime } from '@/lib/utils';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

async function ProjectDetailContent({ id }: { id: string }) {
  const [project, users] = await Promise.all([getProject(id), getUsers()]);

  if (!project) {
    notFound();
  }

  // Get random subset of users as project members
  const projectMembers = users.slice(0, project.memberCount);

  return (
    <>
      {/* Project header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
            <Link
              href="/dashboard/projects"
              className="hover:text-text-secondary transition-colors"
            >
              Projects
            </Link>
            <IconChevronRight className="h-4 w-4" />
            <span className="text-text-primary">{project.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">{project.name}</h1>
          <p className="text-text-secondary mt-1">{project.description}</p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
      </div>

      {/* Project stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <Card>
          <p className="text-sm text-text-muted">Progress</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 h-2 bg-surface-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <span className="text-lg font-semibold text-text-primary">
              {project.progress}%
            </span>
          </div>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Team Members</p>
          <p className="text-2xl font-semibold text-text-primary mt-2">
            {project.memberCount}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Last Updated</p>
          <p className="text-lg font-semibold text-text-primary mt-2">
            {formatRelativeTime(project.updatedAt)}
          </p>
        </Card>
      </div>

      {/* Team members */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectMembers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-surface-muted transition-colors"
              >
                <Avatar src={user.avatar} alt={user.name} size="md" />
                <div className="min-w-0">
                  <p className="font-medium text-text-primary truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-text-secondary capitalize">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ProjectDetailSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16" />
          </Card>
        ))}
      </div>
    </>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailContent id={id} />
      </Suspense>
    </div>
  );
}
