import { PropsWithChildren } from 'react';
import { FieldValues } from 'react-hook-form';

import { useFormAutosave } from '../../hooks/use-form-autosave';

export const Autosave = <T extends FieldValues>({
  saveDraft,
  children,
}: PropsWithChildren<{
  saveDraft: (data: T) => void;
}>) => {
  useFormAutosave<T>(saveDraft, 1000);
  return children;
};
