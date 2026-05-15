// components/chat/date-separator.tsx
import { formatDatechats } from '@/lib/utils'; // تأكدي من وجود دالة لتنسيق التاريخ

interface DateSeparatorProps {
 date: string; // تاريخ مثل '2025-05-01'
}

export function DateSeparator({ date }: DateSeparatorProps) {
 return (
  <div className="flex items-center justify-center my-4">
   <div className="bg-[var(--surfaceMuted)] px-4 py-1 rounded-full text-xs text-[var(--textSecondary)]">
    {formatDatechats(date)} {/* مثلاً "١ مايو" أو "May 1" */}
   </div>
  </div>
 );
}