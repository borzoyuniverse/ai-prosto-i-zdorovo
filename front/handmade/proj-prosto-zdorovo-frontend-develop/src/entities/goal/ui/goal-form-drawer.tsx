import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GoalDto } from '@/api/rpc-request/appointment/use-get-goals';
import { useFormSubmission } from '@/api/rpc-request/form/use-form-submission';
import { useGetFormTemplateById } from '@/api/rpc-request/form/use-get-form-template-by-id';
import { FormBuilder } from '@/feature/form-builder/form-builder';
import { Form } from '@/feature/form-builder/types';

import { BaseDrawer } from '@/components/base-drawer/base-drawer';
import { Typography } from '@/components/typography/typography';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { GoalDescriptionDrawer } from './goal-description-drawer';

type GoalFormDrawerProps = GoalDto;

export const GoalFormDrawer = (props: GoalFormDrawerProps) => {
  const { t } = useTranslation();
  const { data } = useGetFormTemplateById({ params: { id: props.formId ?? '' } });

  const { mutate } = useFormSubmission();

  const [openDescription, setOpenDescription] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const onSubmit = (data: Form) => {
    console.log(data, 'RESULT');
    mutate({ formId: props.formId ?? '', answers: data.answers });
    setOpenForm(false);
    setOpenDescription(true);
  };

  return (
    <>
      <BaseDrawer
        title={data?.title}
        isOpen={openForm}
        onOpenChange={(open) => setOpenForm(open)}
        trigger={
          <Stack className="rounded-8 bg-primary-100 p-unit-6 pb-unit-11 pt-unit-10">
            <Typography.body5 className="text-neutral-900">{props.name}</Typography.body5>
          </Stack>
        }
      >
        {data ? (
          <Stack className="relative pb-unit-6">
            <FormBuilder
              schema={data}
              onSubmit={onSubmit}
              footer={(errors) => (
                <Button
                  variant="filled"
                  className="fixed bottom-unit-6 left-1/2 w-[calc(100%-32px)] flex-1 -translate-x-1/2"
                  disabled={Object.keys(errors).length > 0}
                >
                  {t('buttons.continue')}
                </Button>
              )}
              className="!px-unit-0 !pb-[82px]"
              showTitle={false}
            />
          </Stack>
        ) : null}
      </BaseDrawer>
      <GoalDescriptionDrawer
        {...props}
        isOpen={openDescription}
        onOpenChange={(open) => setOpenDescription(open)}
      />
    </>
  );
};
