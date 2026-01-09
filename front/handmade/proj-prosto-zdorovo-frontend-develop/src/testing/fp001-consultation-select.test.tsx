import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useGetAppointmentTypes } from '@/api/rpc-request/appointment/use-get-appointment-types';
import { SelectConsultationType } from '@/app/pages/consultation-select/consultation-select';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock('@/components/back-button/back-button', () => ({
  BackButton: () => <div data-testid="back-button" /> ,
}));
vi.mock('@/lib/shadcn/components/ui/spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));


vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
  useNavigate: () => vi.fn(),
}));

vi.mock('@/api/rpc-request/appointment/use-get-appointment-types', () => ({
  useGetAppointmentTypes: vi.fn(),
}));

describe('SelectConsultationType', () => {
  it('renders available consultation types', () => {
    const useGetAppointmentTypesMock = vi.mocked(useGetAppointmentTypes);

    useGetAppointmentTypesMock.mockReturnValue({
      data: {
        consultationTypes: [
          {
            consultationTypeId: 'type-1',
            name: 'Type A',
            description: 'Desc',
            specialistType: 'MASTER_COACH',
            newAppointmentStatus: 'DEFAULT',
          },
        ],
      },
      isError: false,
      error: null,
      isPending: false,
    } as any);

    render(<SelectConsultationType />);

    expect(screen.getByText('Type A')).toBeInTheDocument();
  });

  it('renders empty state when there are no types', () => {
    const useGetAppointmentTypesMock = vi.mocked(useGetAppointmentTypes);

    useGetAppointmentTypesMock.mockReturnValue({
      data: { consultationTypes: [] },
      isError: false,
      error: null,
      isPending: false,
    } as any);

    render(<SelectConsultationType />);

    expect(
      screen.getByText('select-consultation-type-page.empty.title'),
    ).toBeInTheDocument();
  });

  it('renders spinner while loading', () => {
    const useGetAppointmentTypesMock = vi.mocked(useGetAppointmentTypes);

    useGetAppointmentTypesMock.mockReturnValue({
      data: { consultationTypes: [] },
      isError: false,
      error: null,
      isPending: true,
    } as any);

    render(<SelectConsultationType />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
