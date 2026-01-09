import { GoalDto } from '@/api/rpc-request/appointment/use-get-goals';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { GoalDescriptionDrawer } from './ui/goal-description-drawer';
import { GoalFormDrawer } from './ui/goal-form-drawer';

type GoalProps = GoalDto;

export const Goal = (props: GoalProps) => {
  return props.formId ? (
    <GoalFormDrawer {...props} />
  ) : (
    <GoalDescriptionDrawer
      trigger={
        <Stack className="rounded-8 bg-primary-100 p-unit-6 pb-unit-11 pt-unit-10">
          <Typography.body5 className="text-neutral-900">{props.name}</Typography.body5>
        </Stack>
      }
      {...props}
    />
  );
};
