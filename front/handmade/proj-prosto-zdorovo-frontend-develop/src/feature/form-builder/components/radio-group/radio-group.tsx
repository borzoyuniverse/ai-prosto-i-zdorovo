import { Controller, get, useFormContext } from 'react-hook-form';

import { RadioField } from '@/api/rpc-request/form/use-get-form-template-by-id';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { ToggleGroup } from '@/lib/shadcn/components/ui/toggle-group/toggle-group';

import { RadioGroupItem } from './radio-group-item';
import { useSetAnswerFormFields } from '../../hooks/use-set-answer-fields';
import { AdditionalInput } from '../additional-input/additional-input';
import { QuestionLayout } from '../question-layout/question-layout';

type RadioGroupProps = RadioField;

export const RadioGroup = ({
  id,
  question,
  orderNumber,
  options,
  type,
  additionalField,
  variant,
  description,
}: RadioGroupProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  useSetAnswerFormFields({ id, question, orderNumber, type });

  return (
    <QuestionLayout
      ordinalNumber={orderNumber}
      question={question}
      description={description}
      error={get(errors, `answers.${id}.answer.message`)}
    >
      <Stack gap={9}>
        <Controller
          name={`answers.${id}.answer`}
          rules={{ required: 'Нужен ваш ответ' }}
          control={control}
          render={({ field: { value, onChange } }) => (
            <ToggleGroup
              type="single"
              value={value}
              onValueChange={(v) => {
                if (!v) {
                  return;
                }
                onChange(v);
              }}
              className="gap-unit-4"
            >
              {options.map((option, idx) => {
                const itemValue = JSON.stringify(option.value);
                const isActive = itemValue === value;

                return (
                  <RadioGroupItem
                    key={idx}
                    value={itemValue}
                    title={option.value.title}
                    description={option.value.subTitle ?? ''}
                    isActive={isActive}
                    variant={variant}
                  />
                );
              })}
            </ToggleGroup>
          )}
        />
        {additionalField ? (
          <AdditionalInput
            text={additionalField.text}
            placeholder={additionalField.placeholder}
            name={`answers.${id}.additionalAnswer`}
          />
        ) : null}
      </Stack>
    </QuestionLayout>
  );
};
