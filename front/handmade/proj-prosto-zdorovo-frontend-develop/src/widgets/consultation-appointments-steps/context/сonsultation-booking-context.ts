import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type ConsultationBookingContextType = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  goal: {
    goalName: string;
    goalId: string;
    setGoalName: Dispatch<SetStateAction<string>>;
    setGoalId: Dispatch<SetStateAction<string>>;
  };
  slots: {
    currentSlotId: string;
    setSlotsForTime: (slotIds: string[]) => void;
    moveToNextSlot: () => void;
    getNextSlotId: (slotId: string) => string | null;
  };
  appointmentId: string;
  setAppointmentId: Dispatch<SetStateAction<string>>;
};

export const ConsultationBookingContext =
  createContext<ConsultationBookingContextType | null>(null);

export function useConsultationBookingContext() {
  const context = useContext(ConsultationBookingContext);

  if (!context) {
    throw new Error('ConsultationBookingContext must be provided');
  }

  return context;
}
