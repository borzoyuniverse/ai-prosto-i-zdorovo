import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ConsultationAppointment } from '@/app/pages/consultation-appointment/consultation-appointment';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

let consultationType = 'REPEATED';
vi.mock('@tanstack/react-router', () => ({
  useSearch: () => ({ consultationType }),
}));

vi.mock('@/feature/multi-step-form/ui/multi-step-form-layout', () => ({
  MultiStepFormLayout: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/feature/multi-step-form/ui/steps-composer', () => ({
  StepsComposer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock(
  '@/widgets/consultation-appointments-steps/ui/slot-context-provider',
  () => ({
    ConsultationBookingContextProvider: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
  }),
);

vi.mock('@/widgets/consultation-appointments-steps/ui/choose-target-step', () => ({
  ChooseTargetStep: () => <div data-testid="choose-target" />,
}));

vi.mock('@/widgets/consultation-appointments-steps/ui/choose-slot-step', () => ({
  ChooseSlotStep: () => <div data-testid="choose-slot" />,
}));

vi.mock('@/widgets/consultation-appointments-steps/ui/confirm-appointment-step', () => ({
  ConfirmAppointmentStep: () => <div data-testid="confirm" />,
}));

describe('ConsultationAppointment', () => {
  it('skips target step for repeated consultations', () => {
    consultationType = 'REPEATED';
    render(<ConsultationAppointment />);

    expect(screen.queryByTestId('choose-target')).toBeNull();
    expect(screen.getByTestId('choose-slot')).toBeInTheDocument();
    expect(screen.getByTestId('confirm')).toBeInTheDocument();
  });

  it('shows target step for default consultations', () => {
    consultationType = 'DEFAULT';
    render(<ConsultationAppointment />);

    expect(screen.getByTestId('choose-target')).toBeInTheDocument();
    expect(screen.getByTestId('choose-slot')).toBeInTheDocument();
    expect(screen.getByTestId('confirm')).toBeInTheDocument();
  });
});
