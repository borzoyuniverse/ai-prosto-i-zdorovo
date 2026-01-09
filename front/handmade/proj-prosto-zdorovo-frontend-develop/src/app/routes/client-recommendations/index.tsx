import { ClientRecommendations } from '@/app/pages/client-recommendations/client-recommendations';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/client-recommendations/')({
  component: ClientRecommendations,
});
