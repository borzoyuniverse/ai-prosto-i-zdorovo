import { type PropsWithChildren } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/lib/shadcn/components/ui/drawer';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { cn } from '@/lib/shadcn/lib/utils';

import { XIcon } from '../icons/x-icon';

interface BaseDrawerProps extends PropsWithChildren {
  title: React.ReactNode;
  description?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  snapPoints?: number[];
  className?: string;
  overlayClassName?: string;
  trigger: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  showButtonClose?: boolean;
  drawerFooterClassName?: string;
}

export function BaseDrawer({
  children,
  title,
  description,
  isOpen,
  onOpenChange,
  snapPoints = [1],
  className,
  overlayClassName,
  trigger,
  primaryAction,
  secondaryAction,
  showButtonClose = true,
  drawerFooterClassName,
}: BaseDrawerProps) {
  return (
    <Drawer snapPoints={snapPoints} open={isOpen} onOpenChange={onOpenChange} handleOnly>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        className={cn('overflow-visible border-none', className)}
        overlayClassName={overlayClassName}
        data-testid="base-drawer"
      >
        <Stack gap={8} className="min-h-0 flex-1">
          <DrawerHeader className="flex-col items-center gap-unit-4">
            <DrawerHandle className="my-unit-4" />
            <Stack direction="row" align="center" justify="between" className="w-full">
              <DrawerTitle className="text-wrap text-left" data-testid="modal-title">
                {title}
              </DrawerTitle>
              {showButtonClose ? (
                <DrawerClose
                  className="flex items-center justify-center justify-self-end rounded-5 bg-neutral-100 p-unit-2"
                  data-testid="close-button"
                >
                  <XIcon className="size-unit-10 text-neutral-900" />
                </DrawerClose>
              ) : null}
            </Stack>
          </DrawerHeader>
          {description ? (
            <DrawerDescription className="sr-only">{description}</DrawerDescription>
          ) : null}
          <Stack className="size-full overflow-y-scroll px-unit-8">{children}</Stack>
        </Stack>
        {primaryAction || secondaryAction ? (
          <DrawerFooter
            className={cn(
              'w-full gap-unit-2 bg-transparent px-unit-8 pb-unit-8 pt-unit-4',
              drawerFooterClassName,
            )}
          >
            {secondaryAction}
            {primaryAction}
          </DrawerFooter>
        ) : (
          <div />
        )}
      </DrawerContent>
    </Drawer>
  );
}
