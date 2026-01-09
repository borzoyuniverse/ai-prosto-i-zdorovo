import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpdateInsurancePolicy } from '@/api/rpc-request/profile/use-update-insurance-policy';
import { OlLike } from 'solar-icon-react/ol';

import { Button } from '@/lib/shadcn/components/ui/button/button';
import { toast } from '@/lib/shadcn/components/ui/toaster/toaster';

import { BaseDrawer } from '../base-drawer/base-drawer';
import { TextareaAutoSize } from '../textarea-autosize/textarea-autosize';

interface ChangeInsuranceNumberDrawerProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ChangeInsuranceNumberDrawer = ({
  isOpen,
  onOpenChange,
}: ChangeInsuranceNumberDrawerProps) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string>();

  const { mutate } = useUpdateInsurancePolicy({
    onSuccess: () => {
      onOpenChange?.(false);
      toast({
        text: t('profile-page.change-insurance-number-drawer.success-update'),
        icon: <OlLike size={20} />,
        className: 'bg-primary-200 text-primary-900',
      });
    },
    onError: () => {
      setError(t('profile-page.change-insurance-number-drawer.error.server'));
    },
  });

  const getError = () => {
    if (error) return error;
    if (value === '') return t('profile-page.change-insurance-number-drawer.error.empty');
    return;
  };

  return (
    <BaseDrawer
      title={t('profile-page.change-insurance-number-drawer.title')}
      trigger={<></>}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      primaryAction={
        <Button
          className="w-full"
          onClick={() => {
            if (value) {
              mutate({ policyNumber: value ?? '' });
            } else {
              setValue('');
            }
          }}
          disabled={value === ''}
        >
          {t('buttons.save')}
        </Button>
      }
    >
      <TextareaAutoSize
        value={value}
        placeholder={t('profile-page.change-insurance-number-drawer.placeholder')}
        showInfoTip
        onChange={(event) => setValue(event.target.value)}
        error={getError()}
      />
    </BaseDrawer>
  );
};
