import { FillingQuestionnaire } from '@/app/pages/filling-questionnaire/filling-questionnaire';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/filling-questionnaire/')({
  component: FillingQuestionnaire,
});
