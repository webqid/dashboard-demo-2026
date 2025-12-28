// Core domain types

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  createdAt: string;
  lastActiveAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  progress: number;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: 'project_created' | 'user_joined' | 'task_completed' | 'comment_added' | 'status_changed';
  message: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  projectId?: string;
  projectName?: string;
  createdAt: string;
}

export interface KPI {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  format: 'number' | 'currency' | 'percentage';
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface DashboardData {
  kpis: KPI[];
  chartData: ChartDataPoint[];
  recentActivity: Activity[];
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
}

// Settings types
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    weekly: boolean;
  };
  timezone: string;
  language: string;
}
