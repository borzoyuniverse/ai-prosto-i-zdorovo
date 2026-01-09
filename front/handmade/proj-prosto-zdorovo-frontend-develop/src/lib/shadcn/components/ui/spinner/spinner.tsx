import { Loader } from '@/components/icons/loader';
import { Stack } from '../stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <Stack
      align="center"
      justify="center"
      className={cn('fixed inset-0 z-[1002] size-full bg-neutral-0', className)}
    >
      <Loader className="size-14 animate-spin text-teal-400" />
    </Stack>
  );
};
