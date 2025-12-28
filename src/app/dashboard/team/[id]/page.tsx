import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getUser, getProjects } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, Avatar, Skeleton } from '@/components/ui';
import { IconChevronRight } from '@/components/icons';
import { getRoleColor, formatRelativeTime, getStatusColor } from '@/lib/utils';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return { title: 'User Not Found' };
  }

  return {
    title: user.name,
    description: `${user.name} - ${user.role}`,
  };
}

async function UserDetailContent({ id }: { id: string }) {
  const [user, projects] = await Promise.all([getUser(id), getProjects()]);

  if (!user) {
    notFound();
  }

  // Filter projects (in real app, would filter by user membership)
  const userProjects = projects.slice(0, 3);

  return (
    <>
      {/* User header */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
        <Link
          href="/dashboard/team"
          className="hover:text-text-secondary transition-colors"
        >
          Team
        </Link>
        <IconChevronRight className="h-4 w-4" />
        <span className="text-text-primary">{user.name}</span>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Avatar src={user.avatar} alt={user.name} size="lg" className="h-20 w-20" />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-2xl font-bold text-text-primary">{user.name}</h1>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getRoleColor(
                  user.role
                )}`}
              >
                {user.role}
              </span>
            </div>
            <p className="text-text-secondary mt-1">{user.email}</p>
            <p className="text-sm text-text-muted mt-2">
              Last active {formatRelativeTime(user.lastActiveAt)}
            </p>
          </div>
        </div>
      </Card>

      {/* User stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <Card>
          <p className="text-sm text-text-muted">Projects</p>
          <p className="text-2xl font-semibold text-text-primary mt-2">
            {userProjects.length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Member Since</p>
          <p className="text-lg font-semibold text-text-primary mt-2">
            {new Date(user.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Role</p>
          <p className="text-lg font-semibold text-text-primary mt-2 capitalize">
            {user.role}
          </p>
        </Card>
      </div>

      {/* User projects */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Assigned Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {userProjects.length === 0 ? (
            <p className="text-text-secondary text-center py-8">
              No projects assigned yet.
            </p>
          ) : (
            <div className="space-y-3">
              {userProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-surface-muted transition-colors"
                >
                  <div>
                    <p className="font-medium text-text-primary">{project.name}</p>
                    <p className="text-sm text-text-secondary">{project.description}</p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

function UserDetailSkeleton() {
  return (
    <>
      <Skeleton className="h-4 w-32 mb-4" />
      <Card>
        <div className="flex items-center gap-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </Card>
    </>
  );
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <Suspense fallback={<UserDetailSkeleton />}>
        <UserDetailContent id={id} />
      </Suspense>
    </div>
  );
}
