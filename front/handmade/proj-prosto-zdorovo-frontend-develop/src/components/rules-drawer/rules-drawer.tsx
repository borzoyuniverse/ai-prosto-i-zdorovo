import { useTranslation } from 'react-i18next';

import { useGetRules } from '@/api/rpc-request/profile/use-get-rules';

import { BaseDrawer } from '@/components/base-drawer/base-drawer';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { MarkdownRenderer } from '../markdow-renderer/markdown-renderer';
import { ProfileMenuItem } from '../profile-menu-item/profile-menu-item';

interface RulesDrawerProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RulesDrawer({ isOpen, onOpenChange }: RulesDrawerProps) {
  const { t } = useTranslation();

  const { data: rules } = useGetRules();

  return (
    <BaseDrawer
      title={t('profile-page.rules-drawer.title')}
      trigger={<ProfileMenuItem title={t('profile-page.rules-drawer.menu-title')} />}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Stack className="pb-unit-13">
        <MarkdownRenderer
          content={rules?.text ?? ''}
          className="first:[&>h6]:mt-unit-0"
        />
      </Stack>
    </BaseDrawer>
  );
}
