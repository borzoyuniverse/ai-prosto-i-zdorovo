import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useGetRecommendationsSpecialist } from '@/api/rpc-request/recommendation/use-get-recommendations-specialist';
import { ClientRecommendations } from '@/app/pages/client-recommendations/client-recommendations';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/components/base-layout/base-layout', () => ({
  BaseLayout: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock(
  '@/app/pages/client-recommendations/components/filters-carousel',
  () => ({
    FiltersCarousel: () => null,
  }),
);

vi.mock(
  '@/app/pages/client-recommendations/components/client-recommendations-list',
  () => ({
    ClientRecommendationsList: () => null,
  }),
);

vi.mock('@/api/rpc-request/recommendation/use-get-recommendations-specialist', () => ({
  useGetRecommendationsSpecialist: vi.fn(),
}));

describe('ClientRecommendations filters', () => {
  it('requests specialist types for filters', () => {
    const useGetRecommendationsSpecialistMock = vi.mocked(
      useGetRecommendationsSpecialist,
    );

    useGetRecommendationsSpecialistMock.mockReturnValue({
      data: ['MASTER_COACH', 'NUTRITIONIST'],
      isError: false,
      error: null,
      isPending: false,
    } as any);

    render(<ClientRecommendations />);

    expect(useGetRecommendationsSpecialistMock).toHaveBeenCalledWith({
      params: { userId: 'userId' },
    });
  });
});
