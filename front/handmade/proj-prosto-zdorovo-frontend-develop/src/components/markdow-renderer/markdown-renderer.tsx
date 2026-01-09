import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/shadcn/lib/utils';

import { Typography } from '../typography/typography';

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        'prose prose-p:my-unit-3 prose-li:font-manrope prose-li:text-body6 prose-li:font-medium prose-li:text-neutral-900',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography.body6 className="text-neutral-900">{children}</Typography.body6>
          ),
          h2: ({ children }) => (
            <Typography.h6 className="mb-unit-5 mt-unit-9 text-neutral-900">
              {children}
            </Typography.h6>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
