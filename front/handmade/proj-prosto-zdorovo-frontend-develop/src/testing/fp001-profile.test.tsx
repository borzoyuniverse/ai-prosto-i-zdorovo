import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useGetProfile } from '@/api/rpc-request/profile/use-get-profile';
import { Profile } from '@/app/pages/profile/profile';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock('@/components/base-layout/base-layout', () => ({
  BaseLayout: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));


vi.mock('@/components/profile-user-info/profile-user-info', () => ({
  ProfileUserInfo: ({ firstName, lastName }: { firstName: string; lastName: string }) => (
    <div data-testid="profile-user">{firstName} {lastName}</div>
  ),
}));

vi.mock('@/components/profile-package-info/profile-package-info', () => ({
  ProfilePackageInfo: ({ totalConsultations }: { totalConsultations: number }) => (
    <div data-testid="profile-package">{totalConsultations}</div>
  ),
}));

vi.mock('@/components/personal-info-drawer/personal-info-drawer', () => ({
  PersonalInfoDrawer: () => <div data-testid="personal-info" />,
}));

vi.mock('@/components/insurance-policy-drawer/insurance-policy-drawer', () => ({
  InsurancePolicyDrawer: () => <div data-testid="insurance-policy" />,
}));

vi.mock('@/components/rules-drawer/rules-drawer', () => ({
  RulesDrawer: () => <div data-testid="rules" />,
}));

vi.mock('@/api/rpc-request/profile/use-get-profile', () => ({
  useGetProfile: vi.fn(),
}));

describe('Profile', () => {
  it('renders profile data', () => {
    const useGetProfileMock = vi.mocked(useGetProfile);

    useGetProfileMock.mockReturnValue({
      data: {
        package: {
          totalConsultations: 10,
          usedConsultations: 3,
          validUntil: '2026-02-01',
        },
        personalInfo: {
          phone: '+1000000000',
          email: 'user@example.test',
          birthDate: '1990-01-01',
          insurerName: 'Insurer',
          policyNumber: 'POL-1',
          policyValidUntil: '2026-12-31',
          firstName: 'John',
          lastName: 'Doe',
          middleName: 'M',
        },
      },
      isError: false,
      error: null,
      isPending: false,
    } as any);

    render(<Profile />);

    expect(screen.getByTestId('profile-user')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('profile-package')).toHaveTextContent('10');
    expect(screen.getByTestId('personal-info')).toBeInTheDocument();
    expect(screen.getByTestId('insurance-policy')).toBeInTheDocument();
  });
});
