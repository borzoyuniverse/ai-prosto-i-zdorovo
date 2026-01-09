import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
  'resize-none overflow-hidden rounded-large border border-slate-300 bg-transparent p-unit-8 text-p3 text-slate-500 caret-teal-300 outline-none transition-colors placeholder:text-slate-300 focus:border-teal-300 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50',
);

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        onInput={(e) => {
          const textarea = e.currentTarget;
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }}
        rows={1}
        className={cn(textareaVariants({ className }))}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
