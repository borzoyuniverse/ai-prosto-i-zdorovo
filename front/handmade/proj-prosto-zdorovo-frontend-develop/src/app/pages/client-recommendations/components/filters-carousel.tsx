import { useTranslation } from 'react-i18next';

import { SpecialistTypeDto } from '@/api/rpc-request/types';

import { Typography } from '@/components/typography/typography';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/lib/shadcn/components/ui/carousel';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/lib/shadcn/components/ui/toggle-group/toggle-group';
import { cn } from '@/lib/shadcn/lib/utils';

type FiltersCarouselProps<T extends string | SpecialistTypeDto> = {
  filters: (T | 'ALL')[];
  curType: T | 'ALL';
  setCurType: (v: T | 'ALL') => void;
};

export const FiltersCarousel = <T extends string | SpecialistTypeDto>({
  filters,
  curType,
  setCurType,
}: FiltersCarouselProps<T>) => {
  const { t } = useTranslation();

  if (filters.length === 0) {
    return;
  }

  return (
    <Carousel opts={{ dragFree: true }} className="mb-unit-8 mt-unit-6">
      <ToggleGroup type="single" value={curType} onValueChange={setCurType}>
        <CarouselContent className="gap-unit-3 px-unit-8">
          {filters.map((type, idx, arr) => (
            <CarouselItem key={idx} className="basis-auto">
              <ToggleGroupItem
                variant="secondary"
                value={type}
                className={cn('', { 'mr-unit-8': idx === arr.length - 1 })}
              >
                <Typography.h6>{t(`specialist-type-title.${type}`)}</Typography.h6>
              </ToggleGroupItem>
            </CarouselItem>
          ))}
        </CarouselContent>
      </ToggleGroup>
    </Carousel>
  );
};
