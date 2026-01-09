import { Controller, get, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CheckboxField } from '@/api/rpc-request/form/use-get-form-template-by-id';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';
import { ToggleGroup } from '@/lib/shadcn/components/ui/toggle-group/toggle-group';

import { CheckboxGroupItem } from './checkbox-group-item';
import { useSetAnswerFormFields } from '../../hooks/use-set-answer-fields';
import { AdditionalInput } from '../additional-input/additional-input';
import { QuestionLayout } from '../question-layout/question-layout';
import { ResetButtonGroup } from '../reset-button-group/reset-button-group';

type CheckboxGroupProps = CheckboxField;

export const CheckboxGroup = ({
  id,
  question,
  description,
  orderNumber,
  options,
  type,
  resetButtonGroup,
  additionalField,
}: CheckboxGroupProps) => {
  const { t } = useTranslation();

  const {
    control,
    setValue,
    unregister,
    trigger,
    formState: { errors },
  } = useFormContext();

  useSetAnswerFormFields({ id, question, orderNumber, type });

  const extraCheckboxError =
    get(errors, `answers.${id}.extraCheckboxAnswer`)?.length > 0
      ? t('form-builder.errors.question')
      : undefined;
  const error = get(errors, `answers.${id}.answer.message`);

  return (
    <QuestionLayout
      ordinalNumber={orderNumber}
      question={question}
      description={description}
      error={error || extraCheckboxError}
    >
      <Stack gap={10}>
        <Controller
          rules={{
            validate: {
              requiredOrAdditional: (_, formValues) => {
                const block = formValues.answers?.[id];

                let hasAnswer = !!block.answer;
                if (Array.isArray(block.answer) && block.answer.length === 0) {
                  hasAnswer = false;
                }

                const hasAdditional = Boolean(block?.additionalAnswer);

                return hasAnswer || hasAdditional || t('form-builder.errors.question');
              },
            },
          }}
          name={`answers.${id}.answer`}
          control={control}
          render={({ field: { value, onChange } }) => {
            const groupValue = value && typeof value !== 'object' ? [] : value;

            return (
              <ToggleGroup
                type="multiple"
                value={groupValue}
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
                  const isActive = value ? value.includes(itemValue) : false;

                  return (
                    <Stack gap={5} className="w-full" key={idx}>
                      <CheckboxGroupItem
                        value={itemValue}
                        title={option.value.title}
                        description={option.value.subTitle ?? ''}
                        isActive={isActive}
                        onClick={
                          option.extraQuestion
                            ? () => {
                                if (isActive) {
                                  unregister(`answers.${id}.extraCheckboxAnswer.${idx}`);
                                } else {
                                  setValue(
                                    `answers.${id}.extraCheckboxAnswer.${idx}.title`,
                                    option.value.title,
                                  );
                                }
                              }
                            : undefined
                        }
                      />
                      {option.extraQuestion && isActive ? (
                        <AdditionalInput
                          required
                          text={option.extraQuestion.text}
                          placeholder={option.extraQuestion.placeholder}
                          name={`answers.${id}.extraCheckboxAnswer.${idx}.answer`}
                        />
                      ) : null}
                    </Stack>
                  );
                })}
              </ToggleGroup>
            );
          }}
        />
        {additionalField ? (
          <AdditionalInput
            text={additionalField.text}
            placeholder={additionalField.placeholder}
            name={`answers.${id}.additionalAnswer`}
            onValueChange={() => trigger(`answers.${id}.answer`)}
          />
        ) : null}
        {resetButtonGroup ? (
          <ResetButtonGroup
            options={resetButtonGroup.options}
            name={`answers.${id}.answer`}
          />
        ) : null}
      </Stack>
    </QuestionLayout>
  );
};
