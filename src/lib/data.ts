import type { User, Project, Activity, KPI, ChartDataPoint, UserSettings } from '@/types';

// Simulated latency to demonstrate loading states
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    role: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
    lastActiveAt: '2025-12-27T14:30:00Z',
  },
  {
    id: '2',
    name: 'Charles Johnson',
    email: 'charles.j@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charles',
    role: 'member',
    createdAt: '2024-03-22T09:00:00Z',
    lastActiveAt: '2025-12-26T16:45:00Z',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    role: 'member',
    createdAt: '2024-05-10T11:30:00Z',
    lastActiveAt: '2025-12-27T09:15:00Z',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.w@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    role: 'viewer',
    createdAt: '2024-07-18T14:00:00Z',
    lastActiveAt: '2025-12-25T11:00:00Z',
  },
  {
    id: '5',
    name: 'Aisha Patel',
    email: 'aisha.p@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aisha',
    role: 'member',
    createdAt: '2024-09-05T08:45:00Z',
    lastActiveAt: '2025-12-27T13:20:00Z',
  },
];

// Mock projects
export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design patterns',
    status: 'active',
    progress: 68,
    memberCount: 5,
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2025-12-26T10:00:00Z',
  },
  {
    id: 'p2',
    name: 'Mobile App v2',
    description: 'Second major version of the mobile application',
    status: 'active',
    progress: 42,
    memberCount: 8,
    createdAt: '2024-11-15T00:00:00Z',
    updatedAt: '2025-12-27T08:30:00Z',
  },
  {
    id: 'p3',
    name: 'API Migration',
    description: 'Migrate legacy APIs to new microservices architecture',
    status: 'completed',
    progress: 100,
    memberCount: 4,
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2025-11-30T16:00:00Z',
  },
  {
    id: 'p4',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard for business metrics',
    status: 'paused',
    progress: 25,
    memberCount: 3,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-12-15T14:00:00Z',
  },
  {
    id: 'p5',
    name: 'Security Audit',
    description: 'Comprehensive security review and vulnerability assessment',
    status: 'active',
    progress: 85,
    memberCount: 2,
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-12-27T11:00:00Z',
  },
];

// Mock activities
export const mockActivities: Activity[] = [
  {
    id: 'a1',
    type: 'task_completed',
    message: 'Completed "Implement user authentication flow"',
    userId: '1',
    userName: 'Sarah Chen',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    projectId: 'p1',
    projectName: 'Website Redesign',
    createdAt: '2025-12-27T14:30:00Z',
  },
  {
    id: 'a2',
    type: 'comment_added',
    message: 'Added a comment on "API endpoint optimization"',
    userId: '2',
    userName: 'Charles Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charles',
    projectId: 'p2',
    projectName: 'Mobile App v2',
    createdAt: '2025-12-27T12:15:00Z',
  },
  {
    id: 'a3',
    type: 'user_joined',
    message: 'Joined the team',
    userId: '5',
    userName: 'Aisha Patel',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aisha',
    createdAt: '2025-12-27T10:00:00Z',
  },
  {
    id: 'a4',
    type: 'status_changed',
    message: 'Changed project status to "Paused"',
    userId: '3',
    userName: 'Elena Rodriguez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    projectId: 'p4',
    projectName: 'Analytics Dashboard',
    createdAt: '2025-12-26T16:45:00Z',
  },
  {
    id: 'a5',
    type: 'project_created',
    message: 'Created new project',
    userId: '1',
    userName: 'Sarah Chen',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    projectId: 'p5',
    projectName: 'Security Audit',
    createdAt: '2025-12-25T09:00:00Z',
  },
];

// Mock KPIs
export const mockKPIs: KPI[] = [
  {
    id: 'kpi1',
    label: 'Total Revenue',
    value: 284500,
    previousValue: 256200,
    format: 'currency',
    trend: 'up',
  },
  {
    id: 'kpi2',
    label: 'Active Users',
    value: 12847,
    previousValue: 11234,
    format: 'number',
    trend: 'up',
  },
  {
    id: 'kpi3',
    label: 'Conversion Rate',
    value: 3.24,
    previousValue: 3.45,
    format: 'percentage',
    trend: 'down',
  },
  {
    id: 'kpi4',
    label: 'Avg. Session',
    value: 4.2,
    previousValue: 3.8,
    format: 'number',
    trend: 'up',
  },
];

// Mock chart data (last 7 days)
export const mockChartData: ChartDataPoint[] = [
  { label: 'Mon', value: 4200, secondaryValue: 2400 },
  { label: 'Tue', value: 3800, secondaryValue: 2210 },
  { label: 'Wed', value: 5100, secondaryValue: 2900 },
  { label: 'Thu', value: 4600, secondaryValue: 2700 },
  { label: 'Fri', value: 5400, secondaryValue: 3100 },
  { label: 'Sat', value: 3200, secondaryValue: 1800 },
  { label: 'Sun', value: 2800, secondaryValue: 1500 },
];

// Mock user settings
export const mockUserSettings: UserSettings = {
  theme: 'system',
  notifications: {
    email: true,
    push: true,
    weekly: false,
  },
  timezone: 'America/New_York',
  language: 'en',
};

// Mock current user (authenticated user)
export const mockCurrentUser: User = mockUsers[0];

// Data fetching functions with simulated latency
export async function getUsers(): Promise<User[]> {
  await delay(800);
  return mockUsers;
}

export async function getUser(id: string): Promise<User | null> {
  await delay(500);
  return mockUsers.find((u) => u.id === id) ?? null;
}

export async function getProjects(): Promise<Project[]> {
  await delay(700);
  return mockProjects;
}

export async function getProject(id: string): Promise<Project | null> {
  await delay(500);
  return mockProjects.find((p) => p.id === id) ?? null;
}

export async function getDashboardData(): Promise<{
  kpis: KPI[];
  chartData: ChartDataPoint[];
  recentActivity: Activity[];
}> {
  await delay(1000);
  return {
    kpis: mockKPIs,
    chartData: mockChartData,
    recentActivity: mockActivities,
  };
}

export async function getUserSettings(): Promise<UserSettings> {
  await delay(400);
  return mockUserSettings;
}

export async function updateUserSettings(
  settings: Partial<UserSettings>
): Promise<UserSettings> {
  await delay(600);
  // In real app, this would persist to database
  return { ...mockUserSettings, ...settings };
}
