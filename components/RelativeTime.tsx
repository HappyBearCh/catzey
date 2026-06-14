'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';

interface Props {
  date: string | Date;
  className?: string;
}

export function RelativeTime({ date, className }: Props) {
  const d = new Date(date);
  const [relative, setRelative] = useState<string | null>(null);

  useEffect(() => {
    setRelative(formatDistanceToNow(d, { addSuffix: true }));
    const timer = setInterval(
      () => setRelative(formatDistanceToNow(new Date(date), { addSuffix: true })),
      60_000,
    );
    return () => clearInterval(timer);
  }, [date]);

  return (
    <time dateTime={d.toISOString()} className={className}>
      {relative ?? format(d, 'MMMM d, yyyy')}
    </time>
  );
}
