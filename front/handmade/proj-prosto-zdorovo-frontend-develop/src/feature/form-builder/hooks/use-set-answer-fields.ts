import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface UseSetAnswerFormFieldsProps {
  id: string;
  question?: string;
  orderNumber?: number;
  type: string;
}

export const useSetAnswerFormFields = ({
  id,
  question,
  orderNumber,
  type,
}: UseSetAnswerFormFieldsProps) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`answers.${id}.question`, question);
    setValue(`answers.${id}.orderNumber`, orderNumber);
    setValue(`answers.${id}.type`, type);
  }, [id, question, orderNumber, type, setValue]);
};
