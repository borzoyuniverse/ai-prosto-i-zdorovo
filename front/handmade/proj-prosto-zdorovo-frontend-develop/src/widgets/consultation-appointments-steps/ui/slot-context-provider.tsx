import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { ConsultationBookingContext } from '../context/сonsultation-booking-context';

interface SlotState {
  slotIds: string[];
  currentIndex: number;
}

export function ConsultationBookingContextProvider({ children }: PropsWithChildren) {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState('');
  const [goalId, setGoalId] = useState('');
  const [goalName, setGoalName] = useState('');
  const [appointmentId, setAppointmentId] = useState('');

  const [slotState, setSlotState] = useState<SlotState>({
    slotIds: [],
    currentIndex: 0,
  });

  const currentSlotId = slotState.slotIds[slotState.currentIndex];

  const setSlotsForTime = (slotIds: string[]) => {
    setSlotState({ slotIds, currentIndex: 0 });
  };

  const moveToNextSlot = () => {
    setSlotState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
    }));
  };

  const getNextSlotId = useCallback(
    (slotId: string): string | null => {
      const index = slotState.slotIds.indexOf(slotId);

      if (index === -1) return null;

      return slotState.slotIds[index + 1] ?? null;
    },
    [slotState.slotIds],
  );

  const hasMoreSlots = slotState.currentIndex < slotState.slotIds.length - 1;

  const value = useMemo(
    () => ({
      date,
      setDate,
      time,
      setTime,
      appointmentId,
      setAppointmentId,
      goal: { goalId, goalName, setGoalId, setGoalName },
      slots: {
        currentSlotId,
        setSlotsForTime,
        moveToNextSlot,
        hasMoreSlots,
        getNextSlotId,
      },
    }),
    [
      date,
      time,
      goalId,
      goalName,
      currentSlotId,
      hasMoreSlots,
      getNextSlotId,
      appointmentId,
    ],
  );

  return (
    <ConsultationBookingContext.Provider value={value}>
      {children}
    </ConsultationBookingContext.Provider>
  );
}
