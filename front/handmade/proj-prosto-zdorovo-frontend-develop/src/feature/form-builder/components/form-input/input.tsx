import { Controller, get, useFormContext } from 'react-hook-form';

import { InputField } from '@/api/rpc-request/form/use-get-form-template-by-id';

import { TextareaAutoSize } from '@/components/textarea-autosize/textarea-autosize';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { useSetAnswerFormFields } from '../../hooks/use-set-answer-fields';
import { QuestionLayout } from '../question-layout/question-layout';
import { ResetButtonGroup } from '../reset-button-group/reset-button-group';

type InputProps = InputField;

export const FormInput = ({
  id,
  orderNumber,
  question,
  type,
  placeholder,
  resetButtonGroup,
  description,
  required,
}: InputProps) => {
  // const { t } = useTranslation();

  const {
    setValue,
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
      <Stack className="!gap-[13px]">
        <Controller
          name={`answers.${id}.answer`}
          control={control}
          rules={{
            required,
          }}
          render={({ field: { value, onChange } }) => {
            let inputValue = '';

            if (value) {
              try {
                const isResetAnswer = resetButtonGroup?.options
                  .map((o) => o.value)
                  .some((item) => item.title === JSON.parse(value).title);

                if (!isResetAnswer) {
                  inputValue = value;
                }
              } catch {
                inputValue = value;
              }
            }

            return (
              <TextareaAutoSize
                value={inputValue}
                placeholder={placeholder}
                showInfoTip
                onChange={(v) => onChange(v)}
                onFocus={(e) => {
                  if (e.target.value === '') {
                    setValue(`answers.${id}.answer`, '');
                  }
                }}
                error={
                  orderNumber ? undefined : get(errors, `answers.${id}.answer.message`)
                }
              />
            );
          }}
        />
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
