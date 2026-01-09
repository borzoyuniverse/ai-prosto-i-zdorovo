import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
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
});
