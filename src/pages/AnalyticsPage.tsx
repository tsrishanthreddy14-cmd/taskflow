import { Task } from '../types';
import { MONTHLY_COMPLETION, WEEKLY_PRODUCTIVITY_ANALYTICS } from '../data/defaults';

interface AnalyticsPageProps {
  tasks: Task[];
}

export function AnalyticsPage({ tasks }: AnalyticsPageProps) {
  const total = tasks.length || 1;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;
  const compPct = Math.round((completed / total) * 100);
  const pendPct = 100 - compPct;

  const high = tasks.filter((t) => t.priority === 'High').length;
  const med = tasks.filter((t) => t.priority === 'Medium').length;
  const low = tasks.filter((t) => t.priority === 'Low').length;

  const completedTasks = tasks.filter((t) => t.completed);

  const priorityRows = [
    { label: 'High Priority', count: high, color: 'bg-light-error dark:bg-dark-error' },
    { label: 'Medium Priority', count: med, color: 'bg-light-tertiary dark:bg-dark-tertiary' },
    { label: 'Low Priority', count: low, color: 'bg-light-secondary dark:bg-dark-secondary' },
  ];

  return (
    <main className="flex-1 p-gutter-lg flex flex-col gap-gutter-lg max-w-[1440px] w-full mx-auto">
      {/* Top Highlight Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter-md items-stretch">
        <article className="h-full bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-2">
          <span className="font-label text-label-lg text-light-on-surface-variant dark:text-dark-on-surface-variant">
            Total Productivity
          </span>
          <p className="font-display text-display-lg text-light-primary dark:text-dark-primary tabular-nums">
            {compPct}%
          </p>
          <span className="font-label text-label-md text-light-secondary dark:text-dark-secondary">
            Up 8% from last month
          </span>
        </article>

        <article className="h-full bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-2">
          <span className="font-label text-label-lg text-light-on-surface-variant dark:text-dark-on-surface-variant">
            Most Productive Day
          </span>
          <p className="font-display text-display-lg text-light-on-surface dark:text-dark-on-surface">
            Wednesday
          </p>
          <span className="font-label text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant tabular-nums">
            7.4 avg tasks completed
          </span>
        </article>

        <article className="h-full bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-2">
          <span className="font-label text-label-lg text-light-on-surface-variant dark:text-dark-on-surface-variant">
            Daily Completion Avg
          </span>
          <p className="font-display text-display-lg text-light-on-surface dark:text-dark-on-surface tabular-nums">
            4.2
          </p>
          <span className="font-label text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
            Tasks per workday
          </span>
        </article>

        <article className="h-full bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col justify-between gap-2">
          <span className="font-label text-label-lg text-light-on-surface-variant dark:text-dark-on-surface-variant">
            On-Time Rate
          </span>
          <p className="font-display text-display-lg text-light-secondary dark:text-dark-secondary tabular-nums">
            89%
          </p>
          <span className="font-label text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
            Before due deadline
          </span>
        </article>
      </section>

      {/* Charts Row 1: Weekly Productivity + Monthly Completion */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-lg">
        <article className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
          <header>
            <h2 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
              Weekly Productivity Graph
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Daily completed tasks (Mon – Sun)
            </p>
          </header>
          <div className="grid grid-cols-7 gap-3 items-end h-48 pt-4 border-b border-light-outline-variant dark:border-dark-outline-variant">
            {WEEKLY_PRODUCTIVITY_ANALYTICS.map((bar) => (
              <div key={bar.day} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <span
                  className={`font-mono text-mono-sm tabular-nums ${
                    bar.highlight ? 'text-light-secondary dark:text-dark-secondary' : ''
                  }`}
                >
                  {bar.count}
                </span>
                <div
                  className={`w-full max-w-[32px] rounded-t ${
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
          <div className="grid grid-cols-7 gap-3 text-center font-label text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
            {WEEKLY_PRODUCTIVITY_ANALYTICS.map((bar) => (
              <span
                key={bar.day}
                className={bar.highlight ? 'text-light-secondary dark:text-dark-secondary' : ''}
              >
                {bar.day}
              </span>
            ))}
          </div>
        </article>

        <article className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
          <header>
            <h2 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
              Monthly Task Completion
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
              6-month completion trend (Jun – Nov)
            </p>
          </header>
          <div className="grid grid-cols-6 gap-4 items-end h-48 pt-4 border-b border-light-outline-variant dark:border-dark-outline-variant">
            {MONTHLY_COMPLETION.map((bar) => (
              <div key={bar.month} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <span
                  className={`font-mono text-mono-sm tabular-nums ${
                    bar.highlight ? 'text-light-secondary dark:text-dark-secondary' : ''
                  }`}
                >
                  {bar.count}
                </span>
                <div
                  className={`w-full max-w-[40px] rounded-t ${
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
          <div className="grid grid-cols-6 gap-4 text-center font-label text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
            {MONTHLY_COMPLETION.map((bar) => (
              <span
                key={bar.month}
                className={bar.highlight ? 'text-light-secondary dark:text-dark-secondary' : ''}
              >
                {bar.month}
              </span>
            ))}
          </div>
        </article>
      </section>

      {/* Charts Row 2: Completed vs Pending + Priority Distribution + Completion History */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
        <article className="lg:col-span-5 bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-lg">
          <div>
            <h2 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface mb-3">
              Completed vs. Pending
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label text-label-md">
                  <span>Completed ({completed})</span>
                  <span className="tabular-nums">{compPct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-light-surface-container dark:bg-dark-surface-container overflow-hidden">
                  <div
                    className="h-full bg-light-secondary dark:bg-dark-secondary rounded-full transition-all duration-surface-enter"
                    style={{ width: `${compPct}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label text-label-md">
                  <span>Pending ({pending})</span>
                  <span className="tabular-nums">{pendPct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-light-surface-container dark:bg-dark-surface-container overflow-hidden">
                  <div
                    className="h-full bg-light-primary dark:bg-dark-primary rounded-full transition-all duration-surface-enter"
                    style={{ width: `${pendPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-light-outline-variant dark:border-dark-outline-variant">
            <h2 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface mb-3">
              Priority Distribution
            </h2>
            <div className="flex flex-col gap-3">
              {priorityRows.map((row) => {
                const pct = Math.round((row.count / total) * 100);
                return (
                  <div key={row.label} className="flex flex-col gap-1">
                    <div className="flex justify-between font-label text-label-md">
                      <span>
                        {row.label} ({row.count})
                      </span>
                      <span className="tabular-nums">{pct}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-light-surface-container dark:bg-dark-surface-container overflow-hidden">
                      <div
                        className={`h-full ${row.color} rounded-full transition-all duration-surface-enter`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        <article className="lg:col-span-7 bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
          <header className="flex items-center justify-between">
            <h2 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
              Task Completion History
            </h2>
            <span className="font-label text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Live task log
            </span>
          </header>

          <div className="flex flex-col divide-y divide-light-outline-variant dark:divide-dark-outline-variant">
            {completedTasks.length > 0 ? (
              completedTasks.map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined material-symbols-filled text-light-secondary dark:text-dark-secondary text-[20px]">
                      check_circle
                    </span>
                    <div className="min-w-0">
                      <p className="font-label text-label-lg text-light-on-surface dark:text-dark-on-surface truncate">
                        {t.title}
                      </p>
                      <p className="font-body text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                        {t.category} • {t.priority} Priority
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-mono-sm text-light-on-surface-variant dark:text-dark-on-surface-variant tabular-nums shrink-0">
                    {t.dueDate}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-4 text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                Complete tasks in My Tasks to populate your history.
              </p>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
