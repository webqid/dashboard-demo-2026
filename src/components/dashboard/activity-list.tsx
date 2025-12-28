import type { Activity } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, Avatar } from '@/components/ui';
import { formatRelativeTime } from '@/lib/utils';

interface ActivityListProps {
  activities: Activity[];
}

function getActivityIcon(type: Activity['type']): string {
  switch (type) {
    case 'project_created':
      return '📁';
    case 'user_joined':
      return '👋';
    case 'task_completed':
      return '✓';
    case 'comment_added':
      return '💬';
    case 'status_changed':
      return '🔄';
    default:
      return '•';
  }
}

export function ActivityList({ activities }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-text-secondary">no recent activity</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <div className="p-6 pb-0">
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide">recent activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-4 px-6 hover:bg-surface-muted transition-colors duration-150"
          >
            <Avatar
              src={activity.userAvatar}
              alt={activity.userName}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary">
                <span className="font-medium">{activity.userName}</span>{' '}
                <span className="text-text-secondary">{activity.message}</span>
              </p>
              {activity.projectName && (
                <p className="text-sm text-text-secondary mt-0.5">
                  in {activity.projectName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm" aria-hidden="true">
                {getActivityIcon(activity.type)}
              </span>
              <time
                dateTime={activity.createdAt}
                className="text-xs text-text-muted"
              >
                {formatRelativeTime(activity.createdAt)}
              </time>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
