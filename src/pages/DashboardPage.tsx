import { PageId, Task, UserProfile } from '../types';
import { TODAY, WEEKLY_PRODUCTIVITY_DASHBOARD } from '../data/defaults';
import { PriorityBadge } from '../components/PriorityBadge';

interface DashboardPageProps {
  tasks: Task[];
  profile: UserProfile;
  onToggleTask: (id: number) => void;
  onNavigate: (page: PageId) => void;
}

export function DashboardPage({ tasks, profile, onToggleTask, onNavigate }: DashboardPageProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter((t) => !t.completed && t.dueDate < TODAY).length;
  const pending = total - completed;
  const rate = total ? Math.round((completed / total) * 100) : 0;

  const todaySchedule = tasks.filter((t) => t.dueDate === TODAY);
  const recentTasks = tasks.slice(0, 5);
  const upcomingDeadlines = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  return (
    <main className="flex-1 p-gutter-lg flex flex-col gap-gutter-lg max-w-[1440px] w-full mx-auto">
      {/* Welcome Banner */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md">
        <div>
          <h2 className="font-headline text-headline-lg text-light-on-surface dark:text-dark-on-surface text-balance">
            Welcome back, {profile.name}
          </h2>
          <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant text-pretty">
            Wednesday, Nov 25, 2026 — Here is your productivity overview and today&apos;s priorities.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('tasks')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded border border-light-outline-variant dark:border-dark-outline-variant bg-light-surface-container-lowest dark:bg-dark-surface-container-low text-light-on-surface dark:text-dark-on-surface font-label text-label-lg hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container transition-colors duration-state-change ease-state-change self-start whitespace-nowrap shrink-0"
        >
          <span>Manage All Tasks</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </section>

      {/* 4 KPI Cards */}
      <section aria-label="Task summary metrics" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter-md items-stretch">
        <article className="h-full bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-gutter-sm">
          <header className="flex items-center justify-between gap-2">
            <h3 className="font-label text-label-lg text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Total Tasks
            </h3>
            <span className="w-8 h-8 rounded bg-light-surface-container dark:bg-dark-surface-container flex items-center justify-center text-light-primary dark:text-dark-primary">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </span>
          </header>
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-display-lg text-light-on-surface dark:text-dark-on-surface tabular-nums">
              {total}
            </p>
            <span className="font-label text-label-md text-light-primary dark:text-dark-primary">
              Active sprint
            </span>
          </div>
        </article>

        <article className="h-full bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-gutter-sm">
          <header className="flex items-center justify-between gap-2">
            <h3 className="font-label text-label-lg text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Completed Tasks
            </h3>
            <span className="w-8 h-8 rounded bg-light-secondary-container dark:bg-dark-secondary-container flex items-center justify-center text-light-on-secondary-container dark:text-dark-on-secondary-container">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </span>
          </header>
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-display-lg text-light-on-surface dark:text-dark-on-surface tabular-nums">
              {completed}
            </p>
            <span className="font-label text-label-md text-light-secondary dark:text-dark-secondary tabular-nums">
              {rate}% done
            </span>
          </div>
        </article>

        <article className="h-full bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-gutter-sm">
          <header className="flex items-center justify-between gap-2">
            <h3 className="font-label text-label-lg text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Pending Tasks
            </h3>
            <span className="w-8 h-8 rounded bg-light-surface-container-high dark:bg-dark-surface-container-high flex items-center justify-center text-light-tertiary dark:text-dark-tertiary">
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
            </span>
          </header>
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-display-lg text-light-on-surface dark:text-dark-on-surface tabular-nums">
              {pending}
            </p>
            <span className="font-label text-label-md text-light-tertiary dark:text-dark-tertiary">
              In progress
            </span>
          </div>
        </article>

        <article className="h-full bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-gutter-sm">
          <header className="flex items-center justify-between gap-2">
            <h3 className="font-label text-label-lg text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Overdue Tasks
            </h3>
            <span className="w-8 h-8 rounded bg-light-error-container dark:bg-dark-error-container flex items-center justify-center text-light-on-error-container dark:text-dark-on-error-container">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </span>
          </header>
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-display-lg text-light-error dark:text-dark-error tabular-nums">
              {overdue}
            </p>
            <span className="font-label text-label-md text-light-error dark:text-dark-error">
              Needs attention
            </span>
          </div>
        </article>
      </section>

      {/* Middle Row: Weekly Productivity Chart + Today's Schedule */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-stretch">
        <article className="lg:col-span-7 bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-gutter-md">
          <header className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
                Weekly Productivity
              </h3>
              <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                Tasks completed vs. planned across this week
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('analytics')}
              className="font-label text-label-md text-light-primary dark:text-dark-primary hover:underline whitespace-nowrap shrink-0"
            >
              Full Analytics
            </button>
          </header>

          <div>
            <div className="grid grid-cols-7 gap-gutter-sm items-end h-52 pt-4 pb-2 border-b border-light-outline-variant dark:border-dark-outline-variant">
              {WEEKLY_PRODUCTIVITY_DASHBOARD.map((bar) => (
                <div key={bar.day} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span
                    className={`font-mono text-mono-sm tabular-nums ${
                      bar.highlight
                        ? 'text-light-secondary dark:text-dark-secondary'
                        : 'text-light-on-surface-variant dark:text-dark-on-surface-variant'
                    }`}
                  >
                    {bar.count}
                  </span>
                  <div
                    className={`w-full max-w-[36px] rounded-t transition-opacity hover:opacity-85 ${
                      bar.highlight
                        ? 'bg-light-secondary dark:bg-dark-secondary'
                        : bar.muted
                          ? 'bg-light-surface-variant dark:bg-dark-surface-variant'
                          : 'bg-light-primary dark:bg-dark-primary'
                    }`}
                    style={{ height: `${bar.heightPct}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-gutter-sm text-center pt-2">
              {WEEKLY_PRODUCTIVITY_DASHBOARD.map((bar) => (
                <span
                  key={bar.day}
                  className={`font-label text-label-md ${
                    bar.highlight
                      ? 'text-light-secondary dark:text-dark-secondary'
                      : 'text-light-on-surface-variant dark:text-dark-on-surface-variant'
                  }`}
                >
                  {bar.day}
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="lg:col-span-5 bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
          <header className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
                Today&apos;s Schedule
              </h3>
              <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                Nov 25, 2026
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="font-label text-label-md text-light-primary dark:text-dark-primary hover:underline whitespace-nowrap shrink-0"
            >
              Open Calendar
            </button>
          </header>

          <div className="flex flex-col gap-3">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((t) => (
                <div
                  key={t.id}
                  className="flex items-start gap-3 p-3 rounded bg-light-surface-container-low dark:bg-dark-surface-container"
                >
                  <span className="font-mono text-mono-sm text-light-primary dark:text-dark-primary tabular-nums shrink-0 pt-0.5">
                    {t.dueTime || '05:00 PM'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-label text-label-lg truncate ${
                        t.completed
                          ? 'line-through text-light-outline dark:text-dark-outline'
                          : 'text-light-on-surface dark:text-dark-on-surface'
                      }`}
                    >
                      {t.title}
                    </p>
                    <p className="font-body text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                      {t.category} • {t.priority} Priority
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 rounded bg-light-surface-container-low dark:bg-dark-surface-container font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                No tasks scheduled for today.
              </p>
            )}
          </div>
        </article>
      </section>

      {/* Bottom Row: Recent Tasks + Upcoming Deadlines */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-stretch">
        <article className="lg:col-span-7 bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
          <header className="flex items-center justify-between gap-2">
            <h3 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
              Recent Tasks
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="font-label text-label-md text-light-primary dark:text-dark-primary hover:underline"
            >
              View all
            </button>
          </header>

          <div className="flex flex-col divide-y divide-light-outline-variant dark:divide-dark-outline-variant">
            {recentTasks.length > 0 ? (
              recentTasks.map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                  <label className="flex items-center gap-3 min-w-0 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => onToggleTask(t.id)}
                      className="w-4 h-4 rounded border-light-outline dark:border-dark-outline text-light-primary dark:text-dark-primary focus:ring-light-primary"
                    />
                    <div className="min-w-0">
                      <p
                        className={`font-label text-label-lg truncate ${
                          t.completed
                            ? 'line-through text-light-outline dark:text-dark-outline'
                            : 'text-light-on-surface dark:text-dark-on-surface'
                        }`}
                      >
                        {t.title}
                      </p>
                      <p className="font-body text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant tabular-nums">
                        {t.category} • {t.dueDate}
                      </p>
                    </div>
                  </label>
                  <PriorityBadge priority={t.priority} />
                </div>
              ))
            ) : (
              <p className="py-6 text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                No tasks yet. Use Quick Add Task to create your first task.
              </p>
            )}
          </div>
        </article>

        <article className="lg:col-span-5 bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
          <header className="flex items-center justify-between gap-2">
            <h3 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
              Upcoming Deadlines
            </h3>
            <span className="font-label text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Next 7 days
            </span>
          </header>

          <div className="flex flex-col gap-3">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((t) => {
                const isOverdue = t.dueDate < TODAY;
                return (
                  <div
                    key={t.id}
                    className="p-3 rounded bg-light-surface-container-low dark:bg-dark-surface-container flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-label text-label-lg text-light-on-surface dark:text-dark-on-surface truncate">
                        {t.title}
                      </p>
                      <p
                        className={`font-mono text-mono-sm tabular-nums ${
                          isOverdue
                            ? 'text-light-error dark:text-dark-error'
                            : 'text-light-on-surface-variant dark:text-dark-on-surface-variant'
                        }`}
                      >
                        {t.dueDate} • {t.dueTime || '05:00 PM'}
                      </p>
                    </div>
                    <PriorityBadge priority={t.priority} />
                  </div>
                );
              })
            ) : (
              <p className="p-4 rounded bg-light-surface-container-low dark:bg-dark-surface-container font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                All upcoming tasks are completed.
              </p>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
