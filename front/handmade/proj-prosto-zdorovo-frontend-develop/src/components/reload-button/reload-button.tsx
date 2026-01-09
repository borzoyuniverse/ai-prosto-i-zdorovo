import { useTranslation } from 'react-i18next';

import {
  MainButton,
  MainButtonProps,
} from '@/lib/shadcn/components/ui/main-button/main-button';

type ReloadButtonProps = {
  onClick?: () => void;
} & MainButtonProps;

export function ReloadButton({ onClick, ...props }: ReloadButtonProps) {
  const { t } = useTranslation();
  return (
    <MainButton
      {...props}
      onClick={() => {
        globalThis.location.reload();
        onClick?.();
      }}
    >
      {t('buttons.reload-page')}
    </MainButton>
  );
}
