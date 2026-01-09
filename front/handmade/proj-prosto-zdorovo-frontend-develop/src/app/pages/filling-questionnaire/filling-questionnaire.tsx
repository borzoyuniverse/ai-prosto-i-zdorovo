import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormSubmission } from '@/api/rpc-request/form/use-form-submission';
import { useGetFormTemplateById } from '@/api/rpc-request/form/use-get-form-template-by-id';
import { useSearchForm } from '@/api/rpc-request/form/use-search-form';
import { FormBuilder } from '@/feature/form-builder/form-builder';
import { Navigate, useNavigate } from '@tanstack/react-router';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { Spinner } from '@/lib/shadcn/components/ui/spinner/spinner';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

export const FillingQuestionnaire = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  const { mutate } = useFormSubmission();

  const { data, isPending, isError, error } = useSearchForm({
    params: { includeFilled: false },
  });

  const forms = data?.forms ?? [];
  const currentForm = forms[currentIndex];

  const {
    data: schema,
    isPending: isFormPending,
    isError: isFormError,
    error: formError,
  } = useGetFormTemplateById({
    params: { id: currentForm?.formId },
    enabled: Boolean(currentForm),
  });

  if (isPending || isFormPending) {
    return <Spinner />;
  }

  if (isError) {
    throw error;
  }

  if (isFormError) {
    throw formError;
  }

  if (forms.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack className="h-dvh overflow-auto pt-unit-6">
      <FormBuilder
        schema={schema}
        onSubmit={(data) => {
          console.log(data, 'RESULT');
          mutate({ formId: currentForm.formId, answers: data.answers });

          if (currentIndex < forms.length - 1) {
            setCurrentIndex((i) => i + 1);
          } else {
            navigate({ to: '/' });
          }
        }}
        footer={(errors) => (
          <Stack
            gap={6}
            direction="row"
            className="rounded-t-8 px-unit-8 pb-unit-6 pt-unit-4 shadow-shadowUp"
          >
            <Button variant="outline" className="flex-1" type="button">
              {t('filling-questionnaire-page.form-footer.buttons.fill-later')}
            </Button>
            <Button
              variant="filled"
              className="flex-1"
              disabled={Object.keys(errors).length > 0}
            >
              {t('filling-questionnaire-page.form-footer.buttons.save')}
            </Button>
          </Stack>
        )}
      />
    </Stack>
  );
};
