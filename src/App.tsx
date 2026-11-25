import { useEffect, useState } from 'react';
import { NotificationPrefs, PageId, Task, ThemeMode, UserProfile } from './types';
import { DEFAULT_PREFS, DEFAULT_PROFILE, DEFAULT_TASKS } from './data/defaults';
import { Layout } from './components/Layout';
import { TaskModal } from './components/TaskModal';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { CalendarPage } from './pages/CalendarPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function loadTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem('taskflow_theme');
    return saved === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(() => loadFromStorage('taskflow_tasks', DEFAULT_TASKS));
  const [profile, setProfile] = useState<UserProfile>(() =>
    loadFromStorage('taskflow_profile', DEFAULT_PROFILE)
  );
  const [prefs, setPrefs] = useState<NotificationPrefs>(() =>
    loadFromStorage('taskflow_prefs', DEFAULT_PREFS)
  );
  const [theme, setTheme] = useState<ThemeMode>(loadTheme);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'quick' | 'full' | 'calendar'>('quick');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalDefaultDate, setModalDefaultDate] = useState('2026-11-26');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('taskflow_theme', theme);
    } catch {
      // Ignore storage failures
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    } catch {
      // Ignore storage failures
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('taskflow_profile', JSON.stringify(profile));
    } catch {
      // Ignore storage failures
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('taskflow_prefs', JSON.stringify(prefs));
    } catch {
      // Ignore storage failures
    }
  }, [prefs]);

  const handleToggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSaveTask = (payload: Omit<Task, 'id' | 'completed'>, editingId?: number) => {
    if (editingId !== undefined) {
      setTasks((prev) => prev.map((t) => (t.id === editingId ? { ...t, ...payload } : t)));
    } else {
      setTasks((prev) => [{ id: Date.now(), ...payload, completed: false }, ...prev]);
    }
  };

  const openQuickAdd = () => {
    setEditingTask(null);
    setModalMode(activePage === 'tasks' ? 'full' : 'quick');
    setModalDefaultDate('2026-11-26');
    setModalOpen(true);
  };

  const openEditTask = (task: Task) => {
    setEditingTask(task);
    setModalMode('full');
    setModalDefaultDate(task.dueDate);
    setModalOpen(true);
  };

  const openCalendarAdd = (dateStr: string) => {
    setEditingTask(null);
    setModalMode('calendar');
    setModalDefaultDate(dateStr);
    setModalOpen(true);
  };

  return (
    <Layout
      activePage={activePage}
      onNavigate={setActivePage}
      onQuickAdd={openQuickAdd}
      theme={theme}
      onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      profile={profile}
      tasks={tasks}
    >
      {activePage === 'dashboard' && (
        <DashboardPage
          tasks={tasks}
          profile={profile}
          onToggleTask={handleToggleTask}
          onNavigate={setActivePage}
        />
      )}
      {activePage === 'tasks' && (
        <TasksPage
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onEditTask={openEditTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
      {activePage === 'calendar' && (
        <CalendarPage
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onAddTaskOnDate={openCalendarAdd}
        />
      )}
      {activePage === 'analytics' && <AnalyticsPage tasks={tasks} />}
      {activePage === 'settings' && (
        <SettingsPage
          profile={profile}
          onUpdateProfile={setProfile}
          theme={theme}
          onSetTheme={setTheme}
          prefs={prefs}
          onUpdatePrefs={setPrefs}
        />
      )}

      <TaskModal
        open={modalOpen}
        mode={modalMode}
        editingTask={editingTask}
        defaultDate={modalDefaultDate}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
      />
    </Layout>
  );
}
