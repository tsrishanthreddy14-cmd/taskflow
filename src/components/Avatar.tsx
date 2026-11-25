import { useState } from 'react';

interface AvatarProps {
  src: string;
  name: string;
  className?: string;
}

export function Avatar({ src, name, className = 'w-9 h-9' }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'AR';

  if (failed || !src) {
    return (
      <div
        aria-label={name}
        className={`${className} rounded-full bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary flex items-center justify-center font-label text-label-md shrink-0 select-none`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${className} rounded-full object-cover shrink-0`}
    />
  );
}
