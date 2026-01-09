import { get, useFormContext } from 'react-hook-form';

import { MultipleRadioField } from '@/api/rpc-request/form/use-get-form-template-by-id';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { MultipleRadioGroupItem } from './multiple-radio-group-item';
import { useSetAnswerFormFields } from '../../hooks/use-set-answer-fields';
import { QuestionLayout } from '../question-layout/question-layout';

type MultipleRadioGroupProps = MultipleRadioField;

export const MultipleRadioGroup = ({
  id,
  question,
  orderNumber,
  options,
  type,
  description,
}: MultipleRadioGroupProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  useSetAnswerFormFields({ id, question, orderNumber, type });

  return (
    <QuestionLayout
      ordinalNumber={orderNumber}
      question={question}
      description={description}
      error={
        get(errors, `answers.${id}.answer`)?.length > 0 ? 'Нужен ваш ответ' : undefined
      }
    >
      <Stack gap={11}>
        {options.map((item, idx) => (
          <MultipleRadioGroupItem
            name={`answers.${id}.answer.${idx}`}
            {...item}
            key={idx}
          />
        ))}
      </Stack>
    </QuestionLayout>
  );
};
