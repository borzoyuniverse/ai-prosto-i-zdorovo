import { format } from '@/lib/date-fns';

export function formatDateForBackend(date: Date | string | number) {
  return format(new Date(date), 'yyyy-MM-dd');
}

export function formatTimeForBackend(date: Date | string | number) {
  return format(new Date(date), 'HH:mm');
}
