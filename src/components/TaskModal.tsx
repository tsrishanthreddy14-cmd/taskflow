import React, { useEffect, useState } from 'react';
import { Category, Priority, Task } from '../types';

export interface TaskModalProps {
  open: boolean;
  mode: 'quick' | 'full' | 'calendar';
  editingTask: Task | null;
  defaultDate?: string;
  onClose: () => void;
  onSave: (payload: Omit<Task, 'id' | 'completed'>, editingId?: number) => void;
}

export function TaskModal({
  open,
  mode,
  editingTask,
  defaultDate = '2026-11-26',
  onClose,
  onSave,
}: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(defaultDate);
  const [dueTime, setDueTime] = useState('04:00 PM');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [category, setCategory] = useState<Category>('Work');
  const [tagsText, setTagsText] = useState('');

  useEffect(() => {
    if (!open) return;
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate);
      setDueTime(editingTask.dueTime || '04:00 PM');
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
      setTagsText((editingTask.tags || []).join(', '));
    } else {
      setTitle('');
      setDescription('');
      setDueDate(defaultDate);
      setDueTime(mode === 'calendar' ? '03:00 PM' : '04:00 PM');
      setPriority('Medium');
      setCategory('Work');
      setTagsText('');
    }
  }, [open, editingTask, defaultDate, mode]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const modalTitle = editingTask
    ? 'Edit Task'
    : mode === 'calendar'
      ? 'Schedule Task'
      : mode === 'quick'
        ? 'Quick Add Task'
        : 'Add New Task';

  const submitLabel = editingTask
    ? 'Save Task'
    : mode === 'quick'
      ? 'Create Task'
      : 'Save Task';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const parsedTags = tagsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave(
      {
        title: trimmed,
        description: description.trim() || undefined,
        dueDate,
        dueTime: dueTime.trim() || '05:00 PM',
        priority,
        category,
        tags: parsedTags.length ? parsedTags : undefined,
      },
      editingTask?.id
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-lg bg-light-surface-container-lowest dark:bg-dark-surface-container-low text-light-on-surface dark:text-dark-on-surface border border-light-outline-variant dark:border-dark-outline-variant shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit}>
          <header className="flex items-center justify-between px-gutter-lg py-gutter-md border-b border-light-outline-variant dark:border-dark-outline-variant">
            <h2 id="task-modal-title" className="font-title text-title-lg">
              {modalTitle}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="inline-flex items-center justify-center w-8 h-8 rounded text-light-on-surface-variant dark:text-dark-on-surface-variant hover:bg-light-surface-container dark:hover:bg-dark-surface-container transition-colors duration-state-change ease-state-change"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </header>

          <div className="p-gutter-lg flex flex-col gap-gutter-md">
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md">Task Title</span>
              <input
                type="text"
                required
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={mode === 'calendar' ? 'e.g., Team standup' : 'e.g., Review Q4 budget proposal'}
                className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
              />
            </label>

            {mode === 'full' || editingTask ? (
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-md">Description</span>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add context or acceptance criteria..."
                  className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                />
              </label>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-md">Due Date</span>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                />
              </label>

              {mode === 'full' || editingTask ? (
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md">Due Time</span>
                  <input
                    type="text"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    placeholder="04:00 PM"
                    className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                  />
                </label>
              ) : (
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md">Priority</span>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </label>
              )}
            </div>

            {mode === 'full' || editingTask ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-label text-label-md">Priority</span>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-label text-label-md">Category</span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    >
                      <option value="Work">Work</option>
                      <option value="Design">Design</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md">Tags (comma separated)</span>
                  <input
                    type="text"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    placeholder="e.g., ui, q4, review"
                    className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                  />
                </label>
              </>
            ) : (
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-md">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                >
                  <option value="Work">Work</option>
                  <option value="Design">Design</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Personal">Personal</option>
                </select>
              </label>
            )}
          </div>

          <footer className="flex items-center justify-end gap-gutter-sm px-gutter-lg py-gutter-md border-t border-light-outline-variant dark:border-dark-outline-variant bg-light-surface-container-low dark:bg-dark-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-light-outline-variant dark:border-dark-outline-variant font-label text-label-lg hover:bg-light-surface-container dark:hover:bg-dark-surface-container-high transition-colors duration-state-change ease-state-change"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-label text-label-lg hover:opacity-90 transition-opacity duration-state-change ease-state-change"
            >
              {submitLabel}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
