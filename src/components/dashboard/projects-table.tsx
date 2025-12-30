import Link from 'next/link';
import type { Project } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { IconChevronRight } from '@/components/icons';
import { getStatusColor } from '@/lib/utils';

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-text-secondary">no projects found</p>
            <p className="text-sm text-text-muted mt-1">
              create your first project to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <div className="p-6 pb-0">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide">projects</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wide px-6 py-3">
                name
              </th>
              <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wide px-6 py-3 hidden sm:table-cell">
                status
              </th>
              <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wide px-6 py-3 hidden md:table-cell">
                progress
              </th>
              <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wide px-6 py-3 hidden lg:table-cell">
                members
              </th>
              <th className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-surface-muted transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-text-primary">{project.name}</p>
                    <p className="text-sm text-text-secondary line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-surface-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand rounded-full transition-all duration-150"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-text-secondary">
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm text-text-secondary">
                    {project.memberCount} members
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-brand transition-colors duration-150"
                  >
                    view
                    <IconChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
