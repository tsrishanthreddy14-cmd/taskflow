import { useMemo, useState } from 'react';
import { Task } from '../types';
import { PriorityBadge } from '../components/PriorityBadge';

interface TasksPageProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

const PRIORITY_RANK: Record<Task['priority'], number> = {
  High: 1,
  Medium: 2,
  Low: 3,
};

export function TasksPage({ tasks, onToggleTask, onEditTask, onDeleteTask }: TasksPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tasks
      .filter((t) => {
        const matchQ =
          !q ||
          t.title.toLowerCase().includes(q) ||
          (t.description || '').toLowerCase().includes(q) ||
          (t.tags || []).some((tg) => tg.toLowerCase().includes(q));
        const matchP = priorityFilter === 'All' || t.priority === priorityFilter;
        const matchC = categoryFilter === 'All' || t.category === categoryFilter;
        const matchS =
          statusFilter === 'All' || (statusFilter === 'Pending' ? !t.completed : t.completed);
        return matchQ && matchP && matchC && matchS;
      })
      .sort((a, b) =>
        sortBy === 'priority'
          ? PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
          : a.dueDate.localeCompare(b.dueDate)
      );
  }, [tasks, searchQuery, priorityFilter, categoryFilter, statusFilter, sortBy]);

  const pendingTasks = filtered.filter((t) => !t.completed);
  const completedTasks = filtered.filter((t) => t.completed);

  const renderTaskCard = (t: Task) => (
    <article
      key={t.id}
      className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-md flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md"
    >
      <div className="flex items-start gap-3 min-w-0">
        <input
          type="checkbox"
          checked={t.completed}
          onChange={() => onToggleTask(t.id)}
          aria-label={`Mark ${t.title} completed`}
          className="mt-1 w-4 h-4 rounded border-light-outline dark:border-dark-outline text-light-primary dark:text-dark-primary cursor-pointer"
        />
        <div className="min-w-0 flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-title text-title-md ${
                t.completed
                  ? 'line-through text-light-outline dark:text-dark-outline'
                  : 'text-light-on-surface dark:text-dark-on-surface'
              }`}
            >
              {t.title}
            </h3>
            <PriorityBadge priority={t.priority} />
            <span className="px-2.5 py-0.5 rounded-full bg-light-surface-container dark:bg-dark-surface-container text-light-on-surface-variant dark:text-dark-on-surface-variant font-label text-label-md">
              {t.category}
            </span>
          </div>
          <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
            {t.description || 'No description provided.'}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-mono text-mono-sm text-light-on-surface-variant dark:text-dark-on-surface-variant tabular-nums">
              {t.dueDate} • {t.dueTime || '05:00 PM'}
            </span>
            {(t.tags || []).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-light-surface-container dark:bg-dark-surface-container text-light-on-surface-variant dark:text-dark-on-surface-variant font-mono text-mono-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onEditTask(t)}
          aria-label="Edit task"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-light-outline-variant dark:border-dark-outline-variant text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container font-label text-label-md transition-colors duration-state-change ease-state-change"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          <span>Edit</span>
        </button>
        <button
          type="button"
          onClick={() => onDeleteTask(t.id)}
          aria-label="Delete task"
          className="inline-flex items-center justify-center w-8 h-8 rounded text-light-error dark:text-dark-error hover:bg-light-error-container dark:hover:bg-dark-error-container transition-colors duration-state-change ease-state-change"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </article>
  );

  return (
    <main className="flex-1 p-gutter-lg flex flex-col gap-gutter-lg max-w-[1440px] w-full mx-auto">
      {/* Search, Filter, and Sort Controls */}
      <section className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-gutter-md">
        <label className="relative flex items-center flex-1 max-w-md">
          <span className="sr-only">Search tasks</span>
          <span
            className="material-symbols-outlined absolute left-3 text-light-outline dark:text-dark-outline text-[18px]"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title, description, or tag..."
            className="w-full pl-9 pr-4 py-2 rounded bg-light-surface-container-low dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface placeholder:text-light-outline dark:placeholder:text-dark-outline focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          />
        </label>

        <div className="flex flex-wrap items-center gap-gutter-sm">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by priority"
            className="px-3 py-2 rounded bg-light-surface-container-low dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant font-label text-label-md text-light-on-surface dark:text-dark-on-surface"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className="px-3 py-2 rounded bg-light-surface-container-low dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant font-label text-label-md text-light-on-surface dark:text-dark-on-surface"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Design">Design</option>
            <option value="Engineering">Engineering</option>
            <option value="Personal">Personal</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="px-3 py-2 rounded bg-light-surface-container-low dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant font-label text-label-md text-light-on-surface dark:text-dark-on-surface"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Only</option>
            <option value="Completed">Completed Only</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
            aria-label="Sort tasks"
            className="px-3 py-2 rounded bg-light-surface-container-low dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant font-label text-label-md text-light-on-surface dark:text-dark-on-surface"
          >
            <option value="date">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
          </select>
        </div>
      </section>

      {/* Pending Tasks Section */}
      <section className="flex flex-col gap-gutter-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
            Pending Tasks (<span className="tabular-nums">{pendingTasks.length}</span>)
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {pendingTasks.length > 0 ? (
            pendingTasks.map(renderTaskCard)
          ) : (
            <p className="p-6 rounded-md bg-light-surface-container-low dark:bg-dark-surface-container text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
              No pending tasks match your filters.
            </p>
          )}
        </div>
      </section>

      {/* Completed Tasks Section */}
      <section className="flex flex-col gap-gutter-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-headline-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
            Completed Tasks (<span className="tabular-nums">{completedTasks.length}</span>)
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {completedTasks.length > 0 ? (
            completedTasks.map(renderTaskCard)
          ) : (
            <p className="p-6 rounded-md bg-light-surface-container-low dark:bg-dark-surface-container text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
              No completed tasks yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
