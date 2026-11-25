import { NotificationPrefs, Task, UserProfile } from '../types';

export const TODAY = '2026-11-25';

export const DEFAULT_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrCnLkx4YuuSFXlq_9maeESvdiXOhpJw4lxht73KaQ4bTcnkEFPjL07K9OfcKVY5Vzt8Kpc0UDD6Id64bcnGuVjLZL39CXFD4WNMH94dpyQPg7uPj-UqawVT1N37zhF0DYk57uJ_1M2-dEhs1zhsIR1cr_-JQCbTs0rulQIHSJGES0qF9boVlMDVGI0XImsi99t3xkMiCnGTh9ThaL27b5j7oR_-BL9mo0joWcGsctbBQswn1Q';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex@taskflow.app',
  avatarUrl: DEFAULT_AVATAR_URL,
  workspace: 'Pro Workspace',
};

export const DEFAULT_PREFS: NotificationPrefs = {
  dueDateReminders: true,
  weeklyDigest: true,
};

export const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    title: 'Design system token audit',
    description: 'Verify contrast ratios and update button tokens across light and dark surfaces.',
    category: 'Design',
    tags: ['tokens', 'ui'],
    priority: 'High',
    dueDate: '2026-11-25',
    dueTime: '09:30 AM',
    completed: false,
  },
  {
    id: 2,
    title: 'Finalize Q4 product roadmap',
    description: 'Align engineering milestones and design review dates for December release.',
    category: 'Work',
    tags: ['planning', 'q4'],
    priority: 'High',
    dueDate: '2026-11-25',
    dueTime: '04:30 PM',
    completed: false,
  },
  {
    id: 3,
    title: 'Sprint 14 API integration sync',
    description: 'Review REST endpoints for task filtering and MongoDB pagination.',
    category: 'Engineering',
    tags: ['api', 'sync'],
    priority: 'Medium',
    dueDate: '2026-11-25',
    dueTime: '01:00 PM',
    completed: true,
  },
  {
    id: 4,
    title: 'Submit quarterly tax estimates',
    description: 'Upload Q4 invoices and confirm payment receipt.',
    category: 'Personal',
    tags: ['finance'],
    priority: 'High',
    dueDate: '2026-11-23',
    dueTime: '05:00 PM',
    completed: false,
  },
  {
    id: 5,
    title: 'Refactor MongoDB task schema',
    description: 'Add compound index on userId and dueDate for calendar queries.',
    category: 'Engineering',
    tags: ['database'],
    priority: 'Medium',
    dueDate: '2026-11-24',
    dueTime: '03:00 PM',
    completed: false,
  },
  {
    id: 6,
    title: 'Prepare user interview script',
    description: 'Draft 8 usability questions for TaskFlow calendar interactions.',
    category: 'Design',
    tags: ['research'],
    priority: 'Low',
    dueDate: '2026-11-27',
    dueTime: '11:00 AM',
    completed: false,
  },
  {
    id: 7,
    title: 'Publish November changelog',
    description: 'Summarize dark mode and analytics improvements for customers.',
    category: 'Work',
    tags: ['release'],
    priority: 'Medium',
    dueDate: '2026-11-28',
    dueTime: '02:00 PM',
    completed: true,
  },
  {
    id: 8,
    title: 'Renew cloud database cluster',
    description: 'Review production storage tier and confirm automated backup schedule.',
    category: 'Engineering',
    tags: ['infra'],
    priority: 'Low',
    dueDate: '2026-11-29',
    dueTime: '10:00 AM',
    completed: false,
  },
];

export const WEEKLY_PRODUCTIVITY_DASHBOARD = [
  { day: 'Mon', count: 4, heightPct: 55, highlight: false, muted: false },
  { day: 'Tue', count: 6, heightPct: 80, highlight: false, muted: false },
  { day: 'Wed', count: 7, heightPct: 92, highlight: true, muted: false },
  { day: 'Thu', count: 5, heightPct: 68, highlight: false, muted: false },
  { day: 'Fri', count: 3, heightPct: 42, highlight: false, muted: true },
  { day: 'Sat', count: 2, heightPct: 28, highlight: false, muted: true },
  { day: 'Sun', count: 1, heightPct: 16, highlight: false, muted: true },
];

export const WEEKLY_PRODUCTIVITY_ANALYTICS = [
  { day: 'Mon', count: 4, heightPct: 55, highlight: false, muted: false },
  { day: 'Tue', count: 6, heightPct: 80, highlight: false, muted: false },
  { day: 'Wed', count: 7, heightPct: 95, highlight: true, muted: false },
  { day: 'Thu', count: 5, heightPct: 68, highlight: false, muted: false },
  { day: 'Fri', count: 4, heightPct: 55, highlight: false, muted: false },
  { day: 'Sat', count: 2, heightPct: 28, highlight: false, muted: true },
  { day: 'Sun', count: 1, heightPct: 16, highlight: false, muted: true },
];

export const MONTHLY_COMPLETION = [
  { month: 'Jun', count: 48, heightPct: 48, highlight: false, muted: true },
  { month: 'Jul', count: 62, heightPct: 62, highlight: false, muted: true },
  { month: 'Aug', count: 57, heightPct: 57, highlight: false, muted: false },
  { month: 'Sep', count: 74, heightPct: 74, highlight: false, muted: false },
  { month: 'Oct', count: 81, heightPct: 81, highlight: false, muted: false },
  { month: 'Nov', count: 89, heightPct: 90, highlight: true, muted: false },
];
