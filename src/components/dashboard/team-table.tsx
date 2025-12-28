import Link from 'next/link';
import type { User } from '@/types';
import { Card, Avatar } from '@/components/ui';
import { IconChevronRight } from '@/components/icons';
import { getRoleColor, formatRelativeTime } from '@/lib/utils';

interface TeamTableProps {
  users: User[];
}

export function TeamTable({ users }: TeamTableProps) {
  if (users.length === 0) {
    return (
      <Card>
        <div className="p-6">
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide">team members</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-text-secondary">no team members found</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <div className="p-6 pb-0">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide">team members</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wide px-6 py-3">
                member
              </th>
              <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wide px-6 py-3 hidden sm:table-cell">
                role
              </th>
              <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wide px-6 py-3 hidden md:table-cell">
                last active
              </th>
              <th className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-surface-muted transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      size="md"
                    />
                    <div>
                      <p className="font-medium text-text-primary">{user.name}</p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-text-secondary">
                    {formatRelativeTime(user.lastActiveAt)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/dashboard/team/${user.id}`}
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
