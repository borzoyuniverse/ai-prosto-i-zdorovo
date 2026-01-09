import { Typography } from '@/components/typography/typography';
import { forwardRef, InputHTMLAttributes } from 'react';
import { Stack } from '../stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

interface PrefixInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  postfix?: string;
}

const PrefixInput = forwardRef<HTMLInputElement, PrefixInputProps>(
  ({ prefix, postfix, className, ...props }, ref) => {
    return (
      <Stack
        direction="row"
        align="center"
        gap={2}
        className={cn(
          'rounded-large bg-slate-100 px-unit-9 py-unit-6 focus-within:border focus-within:border-teal-300',
          className,
        )}
      >
        {prefix ? (
          <Typography.body4 className="text-slate-400">{prefix}</Typography.body4>
        ) : null}
        <input
          ref={ref}
          className="w-full border-none bg-slate-100 text-slate-500 outline-none"
          {...props}
        />
        {postfix ? (
          <Typography.body4 className="text-slate-400">{postfix}</Typography.body4>
        ) : null}
      </Stack>
    );
  },
);

export { PrefixInput };
