import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useGetRecommendationsSpecialist } from '@/api/rpc-request/recommendation/use-get-recommendations-specialist';
import { ClientRecommendations } from '@/app/pages/client-recommendations/client-recommendations';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock('@/components/base-layout/base-layout', () => ({
  BaseLayout: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));


vi.mock(
  '@/app/pages/client-recommendations/components/filters-carousel',
  () => ({
    FiltersCarousel: ({ filters }: { filters: string[] }) => (
      <div data-testid="filters">{filters.length}</div>
    ),
  }),
);

vi.mock(
  '@/app/pages/client-recommendations/components/client-recommendations-list',
  () => ({
    ClientRecommendationsList: () => <div data-testid="recommendations-list" />,
  }),
);

vi.mock('@/api/rpc-request/recommendation/use-get-recommendations-specialist', () => ({
  useGetRecommendationsSpecialist: vi.fn(),
}));

describe('ClientRecommendations', () => {
  it('shows filters when there are multiple types', () => {
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

    expect(screen.getByTestId('filters')).toHaveTextContent('3');
  });

  it('hides filters when there is no filters data', () => {
    const useGetRecommendationsSpecialistMock = vi.mocked(
      useGetRecommendationsSpecialist,
    );

    useGetRecommendationsSpecialistMock.mockReturnValue({
      data: undefined,
      isError: false,
      error: null,
      isPending: false,
    } as any);

    render(<ClientRecommendations />);

    expect(screen.queryByTestId('filters')).toBeNull();
    expect(screen.getByTestId('recommendations-list')).toBeInTheDocument();
  });
});
