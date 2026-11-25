import { Priority } from '../types';

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (priority === 'High') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-light-error-container dark:bg-dark-error-container text-light-on-error-container dark:text-dark-on-error-container font-label text-label-md whitespace-nowrap shrink-0">
        High
      </span>
    );
  }

  if (priority === 'Medium') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-light-surface-container-high dark:bg-dark-surface-container-high text-light-tertiary dark:text-dark-tertiary font-label text-label-md whitespace-nowrap shrink-0">
        Medium
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-light-secondary-container dark:bg-dark-secondary-container text-light-on-secondary-container dark:text-dark-on-secondary-container font-label text-label-md whitespace-nowrap shrink-0">
      Low
    </span>
  );
}

export function priorityDotClass(priority: Priority): string {
  if (priority === 'High') return 'bg-light-error dark:bg-dark-error';
  if (priority === 'Medium') return 'bg-light-tertiary dark:bg-dark-tertiary';
  return 'bg-light-secondary dark:bg-dark-secondary';
}
