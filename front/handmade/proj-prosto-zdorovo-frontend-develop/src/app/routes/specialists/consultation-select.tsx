import { SelectConsultationType } from '@/app/pages/consultation-select/consultation-select';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/specialists/consultation-select')({
  component: SelectConsultationType,
});
