import { ReactNode } from 'react';
import {
  FieldErrors,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FormField,
  FormSchema,
} from '@/api/rpc-request/form/use-get-form-template-by-id';
import { OlSmileCircle } from 'solar-icon-react/ol';

import { Typography } from '@/components/typography/typography';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { toast } from '@/lib/shadcn/components/ui/toaster/toaster';
import { cn } from '@/lib/shadcn/lib/utils';

import { Autosave } from './components/auto-save/auto-save';
import { CheckboxGroup } from './components/checkbox-group/checkbox-group';
import { FormInput } from './components/form-input/input';
import { MultipleRadioGroup } from './components/multiple-radio-group/multiple-radio-group';
import { RadioGroup } from './components/radio-group/radio-group';
import { Form } from './types';

type FormBuilderProps = {
  schema: FormSchema;
  onSubmit: SubmitHandler<Form>;
  footer: (errors: FieldErrors<Form>) => ReactNode;
  showTitle?: boolean;
  className?: string;
};

export const FormBuilder = ({
  schema,
  onSubmit,
  footer,
  className,
  showTitle = true,
}: FormBuilderProps) => {
  const { t } = useTranslation();

  const methods = useForm<Form>();
  const errors = methods.formState.errors;

  const onError: SubmitErrorHandler<Form> = () => {
    toast({
      text: t('form-builder.errors.main'),
      icon: <OlSmileCircle size={20} className="text-error-900" />,
      className: 'bg-error-100 text-error-900',
    });
  };

  return (
    <FormProvider {...methods}>
      <Autosave saveDraft={(data: Form) => console.log(data, 'AUTO SAVE')}>
        <form
          onSubmit={methods.handleSubmit(onSubmit, onError)}
          className="flex flex-1 flex-col overflow-auto"
        >
          <Stack className={cn('flex-1 overflow-auto px-unit-8 pb-unit-15', className)}>
            {schema.description || showTitle ? (
              <Stack gap={4} className="mb-unit-13 text-left">
                {showTitle ? (
                  <Typography.h3 className="text-neutral-900">
                    {schema.title}
                  </Typography.h3>
                ) : null}
                {schema.description ? (
                  <Typography.body6 className="text-neutral-700">
                    {schema.description}
                  </Typography.body6>
                ) : null}
              </Stack>
            ) : null}
            <Stack>{schema.fields.map((field) => renderComponent(field))}</Stack>
          </Stack>
          <Stack className="bg-neutral-0">{footer(errors)}</Stack>
        </form>
      </Autosave>
    </FormProvider>
  );
};

const renderComponent = (field: FormField) => {
  switch (field.type) {
    case 'input': {
      return <FormInput key={field.id} {...field} />;
    }
    case 'radio': {
      return <RadioGroup key={field.id} {...field} />;
    }
    case 'checkbox': {
      return <CheckboxGroup key={field.id} {...field} />;
    }
    case 'multiple-radio': {
      return <MultipleRadioGroup key={field.id} {...field} />;
    }
    default: {
      return null;
    }
  }
};
