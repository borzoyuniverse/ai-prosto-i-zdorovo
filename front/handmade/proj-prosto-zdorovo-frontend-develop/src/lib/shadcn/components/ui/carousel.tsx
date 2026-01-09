import * as React from 'react';

import { cn } from '@/lib/shadcn/lib/utils';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { OlArrowLeft, OlArrowRight } from 'solar-icon-react/ol';

import { Button } from './button/button';
import { SquareButton } from './square-button/square-button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollTo: (index: number) => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    { orientation = 'horizontal', opts, setApi, plugins, className, children, ...props },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );
    const scrollTo = React.useCallback(
      (index: number) => {
        api?.scrollTo(index);
      },
      [api],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollTo,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { wrapperClassName?: string }
>(({ className, wrapperClassName, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={cn('overflow-hidden', wrapperClassName)}>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'ml-unit-0' : 'mt-unit-0 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-unit-0' : 'pt-unit-0',
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

type CarouselDotsProps = {
  activeDotVariant?: 'main' | 'secondary';
  slidesToScroll?: number;
};

const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselDotsProps
>(({ className, activeDotVariant = 'secondary', slidesToScroll = 1, ...props }, ref) => {
  const { selectedIndex, scrollTo, api } = useCarousel();

  const slideCount = React.useMemo(() => {
    if (!api) return 0;
    return Math.ceil(api.slideNodes().length / slidesToScroll);
  }, [api, slidesToScroll]);

  return (
    <div
      ref={ref}
      className={cn(
        'flex w-full items-center justify-center px-unit-6 pb-unit-6 pt-unit-11',
        className,
      )}
      {...props}
    >
      {[...Array(slideCount)].map((_, index) => {
        return (
          <Button
            data-testid="carousel-nav-dot"
            key={index}
            variant="filled"
            size="s"
            className={cn(
              'rounded-full h-unit-2 p-0 transition-all duration-300 ease-in-out',
              {
                'bg-white w-[30px]':
                  selectedIndex === index && activeDotVariant === 'secondary',
                'bg-teal-500 w-[30px]':
                  selectedIndex === index && activeDotVariant === 'main',
                'w-[16px] bg-neutral-200': selectedIndex !== index,
              },
            )}
            onClick={(event) => {
              scrollTo(index);
              event?.stopPropagation();
            }}
          />
        );
      })}
    </div>
  );
});
CarouselDots.displayName = 'CarouselDots';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof SquareButton>
>(({ className, variant = 'with-bg', size = 'md', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <SquareButton
      data-testid="carousel-previous-dot"
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'rounded-medium absolute p-unit-5 disabled:text-neutral-200',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <OlArrowLeft className="size-5" />
    </SquareButton>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof SquareButton>
>(({ className, variant = 'with-bg', size = 'md', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <SquareButton
      data-testid="carousel-next-dot"
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'rounded-medium absolute cursor-pointer p-unit-5 disabled:text-neutral-200',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <OlArrowRight className="size-5" />
    </SquareButton>
  );
});
CarouselNext.displayName = 'CarouselNext';

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};
