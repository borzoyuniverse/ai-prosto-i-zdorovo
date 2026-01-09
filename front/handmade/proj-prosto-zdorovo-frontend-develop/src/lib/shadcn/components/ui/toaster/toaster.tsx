import { ReactNode } from 'react';
import {
  ExternalToast,
  Toaster as LibToaster,
  ToasterProps,
  toast as libToast,
} from 'sonner';
import { Stack } from '../stack/stack';
import { Typography } from '@/components/typography/typography';
import { cn } from '@/lib/shadcn/lib/utils';

export const Toaster = (props: ToasterProps) => {
  return <LibToaster {...props} />;
};

type ToastArg = {
  text: string;
  icon: ReactNode;
  className?: string;
  options?: ExternalToast;
};

export const toast = ({ text, icon, className, options }: ToastArg) => {
  libToast.dismiss();
  libToast(
    <Stack
      direction="row"
      align="center"
      justify="center"
      className={cn('rounded-7 gap-unit-4 p-unit-4 pb-unit-5 pl-unit-3', className)}
    >
      {icon}
      <Typography.body6>{text}</Typography.body6>
    </Stack>,
    options,
  );
};
