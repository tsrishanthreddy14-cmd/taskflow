export type Priority = 'High' | 'Medium' | 'Low';
export type Category = 'Work' | 'Design' | 'Engineering' | 'Personal';
export type PageId = 'dashboard' | 'tasks' | 'calendar' | 'analytics' | 'settings';
export type ThemeMode = 'light' | 'dark';

export interface Task {
  id: number;
  title: string;
  description?: string;
  category: Category;
  tags?: string[];
  priority: Priority;
  dueDate: string;
  dueTime?: string;
  completed: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  workspace: string;
}

export interface NotificationPrefs {
  dueDateReminders: boolean;
  weeklyDigest: boolean;
}
