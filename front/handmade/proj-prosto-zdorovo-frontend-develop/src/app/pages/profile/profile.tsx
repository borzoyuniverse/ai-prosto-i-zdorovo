import { useTranslation } from 'react-i18next';

import { useGetProfile } from '@/api/rpc-request/profile/use-get-profile';

import { BaseLayout } from '@/components/base-layout/base-layout';
import { InsurancePolicyDrawer } from '@/components/insurance-policy-drawer/insurance-policy-drawer';
import { PersonalInfoDrawer } from '@/components/personal-info-drawer/personal-info-drawer';
import { ProfilePackageInfo } from '@/components/profile-package-info/profile-package-info';
import { ProfileUserInfo } from '@/components/profile-user-info/profile-user-info';
import { RulesDrawer } from '@/components/rules-drawer/rules-drawer';

import { Spinner } from '@/lib/shadcn/components/ui/spinner/spinner';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

export const Profile = () => {
  const { t } = useTranslation();
  const { data, isError, error, isPending } = useGetProfile({
    params: { userId: 'userId' },
  });

  if (isError) {
    throw error;
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <BaseLayout
      className="gap-unit-4 px-unit-8 py-unit-6"
      title={t('profile-page.title')}
    >
      <Stack gap={4}>
        <ProfileUserInfo
          firstName={data.personalInfo.firstName}
          lastName={data.personalInfo.lastName}
          middleName={data.personalInfo.middleName}
          email={data.personalInfo.email}
        />
        <ProfilePackageInfo
          totalConsultations={data.package.totalConsultations}
          usedConsultations={data.package.usedConsultations}
          validUntil={data.package.validUntil}
        />
        <Stack gap={3}>
          <PersonalInfoDrawer
            phone={data.personalInfo.phone}
            email={data.personalInfo.email}
            birthDate={data.personalInfo.birthDate}
          />
          <InsurancePolicyDrawer
            insurer={data.personalInfo.insurerName}
            number={data.personalInfo.policyNumber}
            policyValidUntil={data.personalInfo.policyValidUntil}
          />
        </Stack>
        <Stack gap={3}>
          <RulesDrawer />
        </Stack>
      </Stack>
    </BaseLayout>
  );
};
