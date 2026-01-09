import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FillingQuestionnaire } from '@/app/pages/filling-questionnaire/filling-questionnaire';
import { useFormSubmission } from '@/api/rpc-request/form/use-form-submission';
import { useGetFormTemplateById } from '@/api/rpc-request/form/use-get-form-template-by-id';
import { useSearchForm } from '@/api/rpc-request/form/use-search-form';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@tanstack/react-router', () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate" data-to={to} />,
  useNavigate: () => vi.fn(),
}));

vi.mock('@/api/rpc-request/form/use-form-submission', () => ({
  useFormSubmission: vi.fn(),
}));

vi.mock('@/api/rpc-request/form/use-get-form-template-by-id', () => ({
  useGetFormTemplateById: vi.fn(),
}));

vi.mock('@/api/rpc-request/form/use-search-form', () => ({
  useSearchForm: vi.fn(),
}));

describe('FillingQuestionnaire', () => {
  it('redirects when there are no forms', () => {
    const useFormSubmissionMock = vi.mocked(useFormSubmission);
    const useGetFormTemplateByIdMock = vi.mocked(useGetFormTemplateById);
    const useSearchFormMock = vi.mocked(useSearchForm);

    useFormSubmissionMock.mockReturnValue({ mutate: vi.fn() } as any);

    useSearchFormMock.mockReturnValue({
      data: { forms: [] },
      isError: false,
      error: null,
      isPending: false,
    } as any);

    useGetFormTemplateByIdMock.mockReturnValue({
      data: null,
      isError: false,
      error: null,
      isPending: false,
    } as any);

    render(<FillingQuestionnaire />);

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/');
  });
});
