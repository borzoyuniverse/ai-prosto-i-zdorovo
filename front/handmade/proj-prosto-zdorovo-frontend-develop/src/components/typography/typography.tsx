import React, { forwardRef } from 'react';

import { cn } from '@/lib/shadcn/lib/utils';

type TypographyElementProps =
  | React.HTMLAttributes<HTMLHeadingElement>
  | React.HTMLAttributes<HTMLParagraphElement>;

export type TypographyProps = {
  ref?: React.ForwardedRef<HTMLParagraphElement | HTMLHeadingElement>;
} & React.PropsWithChildren<TypographyElementProps>;

function display({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('font-travels text-display', className)} {...props}>
      {children}
    </p>
  );
}

function title1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 className={cn('font-travels text-title1', className)} {...props}>
      {children}
    </h1>
  );
}
function title2({ children, className, ...props }: TypographyProps) {
  return (
    <h2 className={cn('font-travels text-title2', className)} {...props}>
      {children}
    </h2>
  );
}
function title3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 className={cn('font-travels text-title3', className)} {...props}>
      {children}
    </h3>
  );
}
function title4({ children, className, ...props }: TypographyProps) {
  return (
    <h4 className={cn('font-travels text-title4', className)} {...props}>
      {children}
    </h4>
  );
}
function title5({ children, className, ...props }: TypographyProps) {
  return (
    <h5 className={cn('font-travels text-title5', className)} {...props}>
      {children}
    </h5>
  );
}
function title6({ children, className, ...props }: TypographyProps) {
  return (
    <h6 className={cn('font-travels text-title6', className)} {...props}>
      {children}
    </h6>
  );
}
function title7({ children, className, ...props }: TypographyProps) {
  return (
    <h6 className={cn('font-travels text-title7', className)} {...props}>
      {children}
    </h6>
  );
}
function title8({ children, className, ...props }: TypographyProps) {
  return (
    <h6 className={cn('font-travels text-title8', className)} {...props}>
      {children}
    </h6>
  );
}

function h1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 className={cn('font-manrope text-h1', className)} {...props}>
      {children}
    </h1>
  );
}
function h2({ children, className, ...props }: TypographyProps) {
  return (
    <h2 className={cn('font-manrope text-h2', className)} {...props}>
      {children}
    </h2>
  );
}
function h3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 className={cn('font-manrope text-h3', className)} {...props}>
      {children}
    </h3>
  );
}
function h4({ children, className, ...props }: TypographyProps) {
  return (
    <h4 className={cn('font-manrope text-h4', className)} {...props}>
      {children}
    </h4>
  );
}
function h5({ children, className, ...props }: TypographyProps) {
  return (
    <h5 className={cn('font-manrope text-h5', className)} {...props}>
      {children}
    </h5>
  );
}
function h6({ children, className, ...props }: TypographyProps) {
  return (
    <h6 className={cn('font-manrope text-h6', className)} {...props}>
      {children}
    </h6>
  );
}
function h7({ children, className, ...props }: TypographyProps) {
  return (
    <h6 className={cn('font-manrope text-h7', className)} {...props}>
      {children}
    </h6>
  );
}

function body1({
  children,
  className,
  weight = 'medium',
  ...props
}: TypographyProps & { weight?: 'regular' | 'medium' }) {
  return (
    <p
      className={cn(
        'font-manrope text-body1',
        {
          'font-normal': weight === 'regular',
          'font-medium': weight === 'medium',
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
function body2({
  children,
  className,
  weight = 'medium',
  ...props
}: TypographyProps & { weight?: 'regular' | 'medium' }) {
  return (
    <p
      className={cn(
        'font-manrope text-body2',
        {
          'font-normal': weight === 'regular',
          'font-medium': weight === 'medium',
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
function body3({
  children,
  className,
  weight = 'medium',
  ...props
}: TypographyProps & { weight?: 'regular' | 'medium' }) {
  return (
    <p
      className={cn(
        'font-manrope text-body3',
        {
          'font-normal': weight === 'regular',
          'font-medium': weight === 'medium',
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
function body4({
  children,
  className,
  weight = 'medium',
  ...props
}: TypographyProps & { weight?: 'regular' | 'medium' }) {
  return (
    <p
      className={cn(
        'font-manrope text-body4',
        {
          'font-normal': weight === 'regular',
          'font-medium': weight === 'medium',
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
function body5({
  children,
  className,
  weight = 'medium',
  ...props
}: TypographyProps & { weight?: 'regular' | 'medium' }) {
  return (
    <p
      className={cn(
        'font-manrope text-body5',
        {
          'font-normal': weight === 'regular',
          'font-medium': weight === 'medium',
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
function body6({
  children,
  className,
  weight = 'medium',
  ...props
}: TypographyProps & { weight?: 'regular' | 'medium' }) {
  return (
    <p
      className={cn(
        'font-manrope text-body6',
        {
          'font-normal': weight === 'regular',
          'font-medium': weight === 'medium',
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

const body7 = forwardRef<
  HTMLParagraphElement,
  TypographyProps & { weight?: 'regular' | 'medium' }
>(({ children, className, weight = 'medium', ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'font-manrope text-body7',
        {
          'font-normal': weight === 'regular',
          'font-medium': weight === 'medium',
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});

function numeric({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('font-manrope text-numeric', className)} {...props}>
      {children}
    </p>
  );
}

function numeric3({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('font-manrope text-numeric3', className)} {...props}>
      {children}
    </p>
  );
}

export const Typography = {
  display,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  title7,
  title8,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  body1,
  body2,
  body3,
  body4,
  body5,
  body6,
  body7,
  numeric,
  numeric3,
};
