import { useState } from 'react';
import { Task } from '../types';
import { TODAY } from '../data/defaults';
import { priorityDotClass } from '../components/PriorityBadge';

interface CalendarPageProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onAddTaskOnDate: (dateStr: string) => void;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function CalendarPage({ tasks, onToggleTask, onAddTaskOnDate }: CalendarPageProps) {
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(10); // 0-indexed: 10 = November
  const [selectedDate, setSelectedDate] = useState(TODAY);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const changeMonth = (delta: number) => {
    let nextMonth = viewMonth + delta;
    let nextYear = viewYear;
    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    } else if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    setViewMonth(nextMonth);
    setViewYear(nextYear);
  };

  const goToday = () => {
    setViewYear(2026);
    setViewMonth(10);
    setSelectedDate(TODAY);
  };

  const selectedDayTasks = tasks.filter((t) => t.dueDate === selectedDate);
  const upcomingDeadlines = tasks
    .filter((t) => !t.completed && t.dueDate >= TODAY)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  return (
    <main className="flex-1 p-gutter-lg grid grid-cols-1 xl:grid-cols-12 gap-gutter-lg max-w-[1440px] w-full mx-auto">
      {/* Monthly Calendar Grid (8 cols) */}
      <section className="xl:col-span-8 bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
        <header className="flex items-center justify-between gap-2">
          <h2 className="font-headline text-headline-lg text-light-on-surface dark:text-dark-on-surface">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="inline-flex items-center justify-center w-9 h-9 rounded border border-light-outline-variant dark:border-dark-outline-variant hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={goToday}
              className="px-3 py-1.5 rounded border border-light-outline-variant dark:border-dark-outline-variant font-label text-label-md hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="inline-flex items-center justify-center w-9 h-9 rounded border border-light-outline-variant dark:border-dark-outline-variant hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span
              key={d}
              className="font-label text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant py-1"
            >
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="min-h-[88px] rounded bg-light-surface-container-low dark:bg-dark-surface-container opacity-40"
            />
          ))}

          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const d = idx + 1;
            const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
            const dayTasks = tasks.filter((t) => t.dueDate === dateStr);
            const isToday = dateStr === TODAY;
            const isSelected = dateStr === selectedDate;

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => setSelectedDate(dateStr)}
                className={`min-h-[88px] p-2 rounded flex flex-col items-start gap-1 text-left transition-colors duration-state-change ease-state-change ${
                  isSelected
                    ? 'border-2 border-light-primary dark:border-dark-primary bg-light-surface-container-low dark:bg-dark-surface-container'
                    : 'border border-light-outline-variant dark:border-dark-outline-variant hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-mono-sm tabular-nums ${
                    isToday
                      ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
                      : 'text-light-on-surface dark:text-dark-on-surface'
                  }`}
                >
                  {d}
                </span>
                <div className="w-full flex flex-col gap-1">
                  {dayTasks.slice(0, 2).map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-light-surface-container dark:bg-dark-surface-container-high w-full"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${priorityDotClass(t.priority)}`}
                      />
                      <span className="font-label text-label-md text-light-on-surface dark:text-dark-on-surface truncate">
                        {t.title}
                      </span>
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <span className="font-mono text-mono-sm text-light-primary dark:text-dark-primary">
                      +{dayTasks.length - 2} more
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Right Sidebar: Selected Date Tasks + Upcoming Deadlines (4 cols) */}
      <aside className="xl:col-span-4 flex flex-col gap-gutter-lg">
        <article className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
          <header className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface tabular-nums">
                {selectedDate}
              </h3>
              <p className="font-body text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                Tasks for selected date
              </p>
            </div>
            <button
              type="button"
              onClick={() => onAddTaskOnDate(selectedDate)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-label text-label-md hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add</span>
            </button>
          </header>

          <div className="flex flex-col gap-2">
            {selectedDayTasks.length > 0 ? (
              selectedDayTasks.map((t) => (
                <label
                  key={t.id}
                  className="p-3 rounded bg-light-surface-container-low dark:bg-dark-surface-container flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => onToggleTask(t.id)}
                      className="w-4 h-4 rounded border-light-outline dark:border-dark-outline text-light-primary dark:text-dark-primary shrink-0"
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
                      <p className="font-mono text-mono-sm text-light-on-surface-variant dark:text-dark-on-surface-variant tabular-nums">
                        {t.dueTime || '05:00 PM'} • {t.priority}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${priorityDotClass(t.priority)}`}
                  />
                </label>
              ))
            ) : (
              <p className="p-4 rounded bg-light-surface-container-low dark:bg-dark-surface-container font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                No tasks scheduled for {selectedDate}.
              </p>
            )}
          </div>
        </article>

        <article className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
          <h3 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
            Upcoming Deadlines
          </h3>
          <div className="flex flex-col gap-2">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded bg-light-surface-container-low dark:bg-dark-surface-container flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="font-label text-label-lg text-light-on-surface dark:text-dark-on-surface truncate">
                      {t.title}
                    </p>
                    <p className="font-mono text-mono-sm text-light-on-surface-variant dark:text-dark-on-surface-variant tabular-nums">
                      {t.dueDate}
                    </p>
                  </div>
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${priorityDotClass(t.priority)}`}
                  />
                </div>
              ))
            ) : (
              <p className="p-4 rounded bg-light-surface-container-low dark:bg-dark-surface-container font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                No upcoming deadlines.
              </p>
            )}
          </div>
        </article>
      </aside>
    </main>
  );
}
