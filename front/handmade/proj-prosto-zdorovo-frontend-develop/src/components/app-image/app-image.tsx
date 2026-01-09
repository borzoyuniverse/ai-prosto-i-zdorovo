import { ImgHTMLAttributes, useState } from 'react';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

import { ImagePlaceholder } from './image-placeholder';

export type AppImageProps = {
  className?: string;
  src?: string | null;
  alt: string;
  onClick?: () => void;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export function AppImage({ className, src, alt, onClick, ...props }: AppImageProps) {
  const [hasError, setHasError] = useState(false);

  return hasError || !src ? (
    <Stack
      align="center"
      justify="center"
      className={cn('w-full bg-neutral-200', className)}
    >
      <ImagePlaceholder className="size-unit-11" />
    </Stack>
  ) : (
    <img
      loading="lazy"
      decoding="async"
      className={cn('w-full object-cover object-bottom', className)}
      alt={alt}
      src={src}
      onError={() => setHasError(true)}
      onClick={onClick}
      {...props}
    />
  );
}
