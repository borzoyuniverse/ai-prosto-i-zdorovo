import { Profile } from '@/app/pages/profile/profile';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/')({
  component: Profile,
});
