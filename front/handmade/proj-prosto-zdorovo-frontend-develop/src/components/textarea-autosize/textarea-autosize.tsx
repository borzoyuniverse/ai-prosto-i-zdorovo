import { TextareaHTMLAttributes, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { cva, VariantProps } from 'class-variance-authority';
import { OlInfoCircle } from 'solar-icon-react/ol';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

import { Typography } from '../typography/typography';

const textareaVariants = cva(
  'rounded-8 border border-neutral-200 p-unit-8 caret-primary-700 outline-none placeholder:font-normal focus:border-primary-700 data-[error=true]:border-error-400 data-[error=true]:caret-error-400',
  {
    variants: {
      inputSize: {
        m: 'text-body5 font-medium',
        s: 'text-body6 font-normal',
      },
      placeholderSize: {
        m: 'placeholder:text-body5',
        s: 'placeholder:text-body6 ',
      },
    },
    defaultVariants: {
      inputSize: 's',
      placeholderSize: 's',
    },
  },
);

interface TextareaAutoSizeProps
  extends VariantProps<typeof textareaVariants>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  wrapperClassName?: string;
  error?: string;
  showInfoTip?: boolean;
}

export function TextareaAutoSize({
  value,
  inputSize,
  placeholderSize,
  className,
  wrapperClassName,
  style,
  error,
  onChange,
  maxLength = 1000,
  showInfoTip = false,
  ...props
}: TextareaAutoSizeProps) {
  const { t } = useTranslation();

  const ref = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  };

  useLayoutEffect(() => {
    adjustHeight();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!maxLength || e.target.value.length <= maxLength) {
      onChange?.(e);
    }
  };

  const currentLength = (value?.toString() ?? '').length;

  return (
    <div className={cn('relative', wrapperClassName)}>
      <textarea
        data-error={Boolean(error)}
        rows={1}
        ref={ref}
        value={value}
        className={cn(
          'w-full resize-none overflow-hidden',
          textareaVariants({
            inputSize,
            placeholderSize,
            className,
          }),
        )}
        style={{ ...style }}
        onInput={adjustHeight}
        onChange={handleChange}
        {...props}
      />
      {error ? (
        <Stack gap={2} direction="row" align="center">
          <OlInfoCircle size={14} className="text-error-700" />
          <Typography.body7 className="text-error-700">{error}</Typography.body7>
        </Stack>
      ) : null}
      {showInfoTip && maxLength - currentLength <= 100 ? (
        <InfoTip
          text={t(
            `textarea-auto-size.info-tip.${currentLength === maxLength ? 'max-length' : 'current-count'}`,
            {
              count: maxLength - currentLength,
            },
          )}
          className={
            currentLength === maxLength
              ? 'bg-error-100 text-error-900'
              : 'bg-primary-100 text-primary-900'
          }
        />
      ) : null}
    </div>
  );
}

const InfoTip = ({ text, className }: { text: string; className?: string }) => {
  return (
    <Stack
      gap={2}
      direction="row"
      align="center"
      className={cn('w-fit rounded-5 pb-unit-2 pl-unit-3 pr-unit-4 pt-unit-1', className)}
    >
      <OlInfoCircle size={14} />
      <Typography.body7>{text}</Typography.body7>
    </Stack>
  );
};
