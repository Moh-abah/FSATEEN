// Countdown timer component

'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { formatTimeRemaining, cn } from '@/lib/utils';

interface CountdownTimerProps {
  endTime: string | Date;
  onEnd?: () => void;
  showIcon?: boolean;
  className?: string;
}

export function CountdownTimer({
  endTime,
  onEnd,
  showIcon = true,
  className,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(
    formatTimeRemaining(endTime)
  );
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setIsEnded(true);
        setTimeRemaining('انتهى');
        onEnd?.();
        return 'انتهى';
      }

      setTimeRemaining(formatTimeRemaining(endTime));
      return formatTimeRemaining(endTime);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, onEnd]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && <Clock className="h-4 w-4 text-[var(--primary)]" />}
      <span
        className={cn(
          "font-medium",
          isEnded ? "text-[var(--textTertiary)]" : "text-[var(--primary)]"
        )}
      >
        {timeRemaining}
      </span>
    </div>
  );
}