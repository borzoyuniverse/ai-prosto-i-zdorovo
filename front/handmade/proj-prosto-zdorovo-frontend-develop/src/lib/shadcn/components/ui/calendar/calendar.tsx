import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ru } from 'date-fns/locale';

import { OlAltArrowRight, OlAltArrowLeft } from 'solar-icon-react/ol';

import { cn } from '@/lib/shadcn/lib/utils';
import { Button } from '../button/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  const _monthsClassName = cn(
    'grid w-full grid-cols-1 gap-2 tablet:grid-cols-2 tablet:gap-20',
    classNames?.months,
  );
  const _monthClassName = cn(
    'relative flex flex-col gap-unit-3 rounded-9 p-unit-6 bg-primary-50',
    classNames?.month,
  );

  const _monthCaptionClassName = cn(
    'flex items-center justify-center',
    classNames?.month_caption,
  );
  const _captionLabelClassName = cn(
    'text-body5 capitalize p-unit-4',
    classNames?.caption_label,
  );
  const _navClassName = cn('flex items-center', classNames?.nav);
  const _buttonPreviousClassName = cn(
    'absolute top-unit-7 left-unit-6 !p-unit-2 !rounded-5 bg-primary-200 border-none',
    classNames?.button_previous,
  );
  const _buttonNextClassName = cn(
    'absolute top-unit-7 right-unit-6 !p-unit-2 !rounded-5 bg-primary-200 border-none',
    classNames?.button_next,
  );

  const _monthGridClassName = cn(
    'flex w-full border-collapse flex-col gap-unit-3',
    classNames?.month_grid,
  );
  const _weekdaysClassName = cn('flex justify-between py-unit-4', classNames?.weekdays);
  const _weekdayClassName = cn(
    'flex w-full items-center justify-center text-body6 font-medium text-uppercase text-neutral-900',
    classNames?.weekday,
  );
  const _weeksClassName = cn('flex w-full flex-col', classNames?.weeks);
  const _weekClassName = cn('flex w-full justify-between', classNames?.week);
  const _dayClassName = cn(
    'flex w-full h-[46px] items-center justify-center text-body5',
    classNames?.day,
  );
  const _dayButtonClassName = cn('size-full', classNames?.day_button);

  const _outsideClassName = cn('rdp-outside text-neutral-400', classNames?.outside);
  const _disabledClassName = cn('rdp-disabled text-neutral-400', classNames?.disabled);
  const _hiddenClassName = cn('rdp-hidden invisible', classNames?.hidden);
  const _todayClassName = cn(
    '[&>button]:rounded-7 [&>button]:border [&>button]:border-primary-300',
    classNames?.today,
  );

  const _rangeStartClassName = cn(
    'rounded-l-small [&>button]:rounded-7 [&>button]:border-none [&>button]:bg-primary-700 [&>button]:text-neutral-0',
    '[&.rdp-disabled>button]:bg-teal-300 [&.rdp-disabled>button]:text-neutral-0',
    '[&.rdp-outside>button]:bg-teal-300 [&.rdp-outside>button]:text-neutral-0',
    classNames?.range_start,
  );
  const _rangeMiddleClassName = cn(
    'bg-slate-100',
    '[&.rdp-disabled]:bg-slate-50 [&.rdp-outside]:bg-slate-50',
    '[&.rdp-disabled>button]:text-slate-300 [&.rdp-outside>button]:text-slate-300',
    classNames?.range_middle,
  );
  const _rangeEndClassName = cn(
    'rounded-r-small [&>button]:rounded-small [&>button]:border-none [&>button]:bg-teal-500 [&>button]:text-white',
    '[&.rdp-disabled>button]:bg-teal-300 [&.rdp-outside>button]:bg-teal-300',
    '[&.rdp-disabled>button]:text-white [&.rdp-outside>button]:text-white',
    classNames?.range_end,
  );
  const _selectedClassName = cn(
    '[&>button]:rounded-7 [&>button]:border-none [&>button]:bg-primary-700 [&>button]:text-neutral-0',
    '[&.rdp-disabled]:bg-slate-50 [&.rdp-outside]:bg-slate-50',
    '[&.rdp-disabled>button]:text-slate-300 [&.rdp-outside>button]:text-slate-300',
    classNames?.selected,
  );

  return (
    <DayPicker
      locale={ru}
      navLayout="around"
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        months: _monthsClassName,
        month: _monthClassName,

        month_caption: _monthCaptionClassName,
        caption_label: _captionLabelClassName,
        nav: _navClassName,
        button_previous: _buttonPreviousClassName,
        button_next: _buttonNextClassName,

        month_grid: _monthGridClassName,
        weekdays: _weekdaysClassName,
        weekday: _weekdayClassName,
        weeks: _weeksClassName,
        week: _weekClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,

        range_start: _rangeStartClassName,
        range_middle: _rangeMiddleClassName,
        range_end: _rangeEndClassName,
        selected: _selectedClassName,

        outside: _outsideClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName,
        today: _todayClassName,
      }}
      components={{
        NextMonthButton: NextMonthButtonImpl,
        PreviousMonthButton: PreviousMonthButtonImpl,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

function NextMonthButtonImpl(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="outline" {...props}>
      <OlAltArrowRight />
    </Button>
  );
}

function PreviousMonthButtonImpl(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="outline" {...props}>
      <OlAltArrowLeft />
    </Button>
  );
}

export { Calendar };
