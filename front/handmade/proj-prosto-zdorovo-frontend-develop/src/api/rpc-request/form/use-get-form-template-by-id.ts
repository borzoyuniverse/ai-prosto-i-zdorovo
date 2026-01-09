import { UseExternalRPCQueryOptions, useRPCQuery } from '@/lib/api/request/use-rpc-query';

export type AdditionalField = {
  text: string;
  placeholder: string;
};
type BaseField = {
  id: string;
  orderNumber?: number;
  question?: string;
  description?: string;
  required: boolean | string;
  resetButtonGroup?: { options: RadioOption[] };
  additionalField?: AdditionalField;
};

export type InputField = {
  type: 'input';
  placeholder?: string;
} & BaseField;

type Value = {
  title: string;
  subTitle?: string;
};

export type RadioOption = {
  value: Value;
};

export type RadioField = {
  type: 'radio';
  options: RadioOption[];
  variant?: 'default' | 'chip';
} & BaseField;

export type CheckboxOption = {
  value: Value;
  extraQuestion?: {
    text: string;
    placeholder: string;
  };
};

export type CheckboxField = {
  type: 'checkbox';
  options: CheckboxOption[];
} & BaseField;

export type MultipleRadioOption = {
  question: string;
  options: RadioOption[];
};

export type MultipleRadioField = {
  type: 'multiple-radio';
  options: MultipleRadioOption[];
} & BaseField;

export type FormField = InputField | RadioField | CheckboxField | MultipleRadioField;

export type FormSchema = {
  title: string;
  description?: string;
  fields: FormField[];
};

type GetFormTemplateByIdRequest = { id: string };

export function useGetFormTemplateById({
  params,
  ...opts
}: UseExternalRPCQueryOptions<FormSchema, GetFormTemplateByIdRequest>) {
  return useRPCQuery({
    ...opts,
    queryKey: ['form-template'] as const,
    method: useGetFormTemplateById.method,
    params,
  });
}

useGetFormTemplateById.method = 'get-form-template';
