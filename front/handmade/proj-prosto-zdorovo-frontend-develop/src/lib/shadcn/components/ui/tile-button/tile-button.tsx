import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import { Slottable, Root } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { tileButtonVariants } from './tile-button-variants';

interface TileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tileButtonVariants> {
  asChild?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

const TileButton = React.forwardRef<HTMLButtonElement, TileButtonProps>(
  (
    {
      className,
      asChild = false,
      leftAddon,
      rightAddon,
      children,
      background,
      paddingSize,
      gap,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Root : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(tileButtonVariants({ background, gap, paddingSize, className }))}
        {...props}
      >
        {leftAddon}
        <Slottable>{children}</Slottable>
        {rightAddon}
      </Comp>
    );
  },
);
TileButton.displayName = 'TileButton';

export { TileButton };
