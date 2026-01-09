import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-6 w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-unit-4 w-full grow overflow-hidden rounded-full bg-slate-100">
      <SliderPrimitive.Range className="absolute h-full bg-teal-500" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="block size-unit-10 rounded-full border-2 border-teal-500 bg-white shadow transition-colors focus-visible:border-2 focus-visible:border-teal-500 focus-visible:bg-teal-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="actfocus-visibleive:border-teal-500 block size-unit-10 rounded-full border-2 border-teal-500 bg-white shadow transition-colors focus-visible:border-2 focus-visible:bg-teal-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
RangeSlider.displayName = 'RangeSlider';

export { RangeSlider };
