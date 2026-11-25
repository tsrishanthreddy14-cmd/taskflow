import React, { useEffect, useRef, useState } from 'react';
import { PageId, Task, ThemeMode, UserProfile } from '../types';
import { TODAY } from '../data/defaults';
import { Avatar } from './Avatar';

interface LayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onQuickAdd: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  profile: UserProfile;
  tasks: Task[];
  children: React.ReactNode;
}

const NAV_ITEMS: { id: PageId; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'tasks', label: 'My Tasks', icon: 'check_box' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
  { id: 'analytics', label: 'Analytics', icon: 'bar_chart' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

const PAGE_TITLES: Record<PageId, string> = {
  dashboard: 'Dashboard',
  tasks: 'My Tasks',
  calendar: 'Calendar',
  analytics: 'Analytics',
  settings: 'Settings & Profile',
};

export function Layout({
  activePage,
  onNavigate,
  onQuickAdd,
  theme,
  onToggleTheme,
  profile,
  tasks,
  children,
}: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notificationsCleared, setNotificationsCleared] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const urgentTasks = tasks.filter((t) => !t.completed && t.dueDate <= TODAY);
  const hasUnread = !notificationsCleared && urgentTasks.length > 0;
  const firstName = profile.name.split(' ')[0] || profile.name;

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-light-background dark:bg-dark-background">
      {/* Persistent Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 min-h-screen bg-light-surface-container-lowest dark:bg-dark-surface-container-low border-r border-light-outline-variant dark:border-dark-outline-variant">
        <div className="h-16 px-gutter-lg flex items-center gap-gutter-sm border-b border-light-outline-variant dark:border-dark-outline-variant">
          <button
            type="button"
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-gutter-sm text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded bg-light-primary dark:bg-dark-primary flex items-center justify-center text-light-on-primary dark:text-dark-on-primary shrink-0">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <span className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface whitespace-nowrap">
              TaskFlow
            </span>
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex-1 px-3 py-gutter-md flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded font-label text-label-lg transition-colors duration-state-change ease-state-change text-left whitespace-nowrap ${
                  isActive
                    ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
                    : 'text-light-on-surface-variant dark:text-dark-on-surface-variant hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? 'material-symbols-filled' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-gutter-md border-t border-light-outline-variant dark:border-dark-outline-variant">
          <button
            type="button"
            onClick={() => handleNavClick('settings')}
            className="w-full p-3 rounded-md bg-light-surface-container-low dark:bg-dark-surface-container flex items-center gap-3 text-left hover:bg-light-surface-container dark:hover:bg-dark-surface-container-high transition-colors duration-state-change ease-state-change"
          >
            <Avatar src={profile.avatarUrl} name={profile.name} className="w-9 h-9" />
            <div className="min-w-0">
              <p className="font-label text-label-lg text-light-on-surface dark:text-dark-on-surface truncate">
                {profile.name}
              </p>
              <p className="font-body text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant truncate">
                {profile.email}
              </p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Navigation Bar */}
        <header className="sticky top-0 z-20 h-16 px-gutter-lg bg-light-surface-container-lowest dark:bg-dark-surface-container-low border-b border-light-outline-variant dark:border-dark-outline-variant flex items-center justify-between gap-gutter-md">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-container dark:hover:bg-dark-surface-container"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
            <h1 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface truncate">
              {PAGE_TITLES[activePage]}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onQuickAdd}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-label text-label-lg hover:opacity-90 transition-opacity duration-state-change ease-state-change whitespace-nowrap shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                add
              </span>
              <span className="hidden sm:inline">Quick Add Task</span>
              <span className="sm:hidden">Add</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              className="inline-flex items-center justify-center w-9 h-9 rounded text-light-on-surface-variant dark:text-dark-on-surface-variant hover:bg-light-surface-container dark:hover:bg-dark-surface-container transition-colors duration-state-change ease-state-change"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((prev) => !prev);
                  setProfileOpen(false);
                }}
                aria-label="Notifications"
                aria-expanded={notifOpen}
                className="relative inline-flex items-center justify-center w-9 h-9 rounded text-light-on-surface-variant dark:text-dark-on-surface-variant hover:bg-light-surface-container dark:hover:bg-dark-surface-container transition-colors duration-state-change ease-state-change"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {hasUnread && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-light-error dark:bg-dark-error" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-md bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant shadow-lg z-30 overflow-hidden">
                  <div className="px-4 py-3 border-b border-light-outline-variant dark:border-dark-outline-variant flex items-center justify-between">
                    <span className="font-label text-label-lg text-light-on-surface dark:text-dark-on-surface">
                      Notifications
                    </span>
                    {urgentTasks.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setNotificationsCleared(true)}
                        className="font-label text-label-md text-light-primary dark:text-dark-primary hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-light-outline-variant dark:divide-dark-outline-variant">
                    {urgentTasks.length > 0 ? (
                      urgentTasks.map((t) => {
                        const isOverdue = t.dueDate < TODAY;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleNavClick('tasks')}
                            className="w-full px-4 py-3 text-left hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container flex items-start gap-3 transition-colors"
                          >
                            <span
                              className={`material-symbols-outlined text-[18px] mt-0.5 ${
                                isOverdue
                                  ? 'text-light-error dark:text-dark-error'
                                  : 'text-light-primary dark:text-dark-primary'
                              }`}
                            >
                              {isOverdue ? 'warning' : 'schedule'}
                            </span>
                            <div className="min-w-0">
                              <p className="font-label text-label-md text-light-on-surface dark:text-dark-on-surface truncate">
                                {t.title}
                              </p>
                              <p className="font-body text-label-md text-light-on-surface-variant dark:text-dark-on-surface-variant tabular-nums">
                                {isOverdue ? `Overdue (${t.dueDate})` : `Due today • ${t.dueTime || '05:00 PM'}`}
                              </p>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <p className="px-4 py-6 text-center font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                        You&apos;re all caught up!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setNotifOpen(false);
                }}
                aria-expanded={profileOpen}
                className="flex items-center gap-2 pl-2 pr-2 py-1 rounded hover:bg-light-surface-container dark:hover:bg-dark-surface-container transition-colors duration-state-change ease-state-change"
              >
                <Avatar src={profile.avatarUrl} name={profile.name} className="w-8 h-8" />
                <span className="hidden sm:inline font-label text-label-lg text-light-on-surface dark:text-dark-on-surface whitespace-nowrap">
                  {firstName}
                </span>
                <span className="material-symbols-outlined text-[18px] text-light-on-surface-variant dark:text-dark-on-surface-variant">
                  expand_more
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant shadow-lg py-1 z-30">
                  <button
                    type="button"
                    onClick={() => handleNavClick('settings')}
                    className="w-full flex items-center gap-2 px-4 py-2 text-body-md text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container text-left"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    <span>Profile &amp; Settings</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('tasks')}
                    className="w-full flex items-center gap-2 px-4 py-2 text-body-md text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container text-left"
                  >
                    <span className="material-symbols-outlined text-[18px]">checklist</span>
                    <span>All My Tasks</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full flex items-center gap-2 px-4 py-2 text-body-md text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container text-left"
                  >
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    <span>Dashboard</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {children}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex bg-black/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
        >
          <aside className="h-full w-72 bg-light-surface-container-lowest dark:bg-dark-surface-container-low text-light-on-surface dark:text-dark-on-surface border-r border-light-outline-variant dark:border-dark-outline-variant flex flex-col">
            <header className="h-16 px-gutter-lg flex items-center justify-between border-b border-light-outline-variant dark:border-dark-outline-variant">
              <h2 className="font-headline text-headline-md">TaskFlow</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-light-surface-container dark:hover:bg-dark-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </header>
            <nav className="p-3 flex-1 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded font-label text-label-lg text-left ${
                      isActive
                        ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
                        : 'text-light-on-surface-variant dark:text-dark-on-surface-variant hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
