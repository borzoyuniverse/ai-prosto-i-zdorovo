import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useGetAppointments } from '@/api/rpc-request/appointment/use-get-appointments';
import { useGetRecommendations } from '@/api/rpc-request/recommendation/use-get-recommendations';
import { MainPage } from '@/app/pages/main-page/main-page';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock('@/components/base-layout/base-layout', () => ({
  BaseLayout: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('@/components/app-image/app-image', () => ({
  AppImage: () => <div data-testid="app-image" />,
}));
vi.mock('@/lib/shadcn/components/ui/spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));


vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('@/api/rpc-request/appointment/use-get-appointments', () => ({
  useGetAppointments: vi.fn(),
}));

vi.mock('@/api/rpc-request/recommendation/use-get-recommendations', () => ({
  useGetRecommendations: vi.fn(),
}));

describe('MainPage', () => {
  it('requests last recommendation for main page', () => {
    const useGetAppointmentsMock = vi.mocked(useGetAppointments);
    const useGetRecommendationsMock = vi.mocked(useGetRecommendations);

    useGetAppointmentsMock.mockReturnValue({
      data: [
        {
          id: 'appt-1',
          startDate: new Date('2026-01-01T10:00:00Z'),
          isRepeated: false,
          consultationTypeName: 'Consultation',
          consultationTypeId: 'type-1',
          specialistType: 'MASTER_COACH',
          unfilledQuestionnaires: [],
          consultationUrl: 'https://example.test',
        },
      ],
      isError: false,
      error: null,
      isPending: false,
    });

    useGetRecommendationsMock.mockReturnValue({
      data: {
        recommendations: [
          {
            id: 'rec-1',
            specialistType: 'MASTER_COACH',
            text: 'Recommendation 1',
            createdAt: new Date('2026-01-01T10:00:00Z'),
            attachments: [],
          },
        ],
      },
      isError: false,
      error: null,
      isPending: false,
      fetchNextPage: vi.fn(),
    } as any);

    render(<MainPage />);

    expect(useGetRecommendationsMock).toHaveBeenCalled();
  });

  it('renders spinner while loading', () => {
    const useGetAppointmentsMock = vi.mocked(useGetAppointments);
    const useGetRecommendationsMock = vi.mocked(useGetRecommendations);

    useGetAppointmentsMock.mockReturnValue({
      data: [],
      isError: false,
      error: null,
      isPending: true,
    } as any);

    useGetRecommendationsMock.mockReturnValue({
      data: { recommendations: [] },
      isError: false,
      error: null,
      isPending: false,
      fetchNextPage: vi.fn(),
    } as any);

    render(<MainPage />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders empty state when there are no appointments', () => {
    const useGetAppointmentsMock = vi.mocked(useGetAppointments);
    const useGetRecommendationsMock = vi.mocked(useGetRecommendations);

    useGetAppointmentsMock.mockReturnValue({
      data: [],
      isError: false,
      error: null,
      isPending: false,
    } as any);

    useGetRecommendationsMock.mockReturnValue({
      data: { recommendations: [] },
      isError: false,
      error: null,
      isPending: false,
      fetchNextPage: vi.fn(),
    } as any);

    render(<MainPage />);

    expect(screen.getByTestId('app-image')).toBeInTheDocument();
  });
});
