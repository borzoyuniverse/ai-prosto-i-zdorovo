import { BdUser } from 'solar-icon-react/bd';

import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { Typography } from '../typography/typography';

type ProfileUserInfoProps = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
};

export function ProfileUserInfo({
  firstName,
  lastName,
  middleName,
  email,
}: ProfileUserInfoProps) {
  const fullName = `${firstName} ${middleName} ${lastName}`;

  return (
    <Stack
      direction="row"
      align="start"
      gap={6}
      className="rounded-9 bg-neutral-0 p-unit-4"
    >
      <Stack className="rounded-8 bg-primary-100 p-unit-6">
        <BdUser size={28} className="text-primary-700" />
      </Stack>
      <Stack gap={2}>
        <Typography.h6 className="text-neutral-900">{fullName}</Typography.h6>
        <Typography.body6 className="text-neutral-700">{email}</Typography.body6>
      </Stack>
    </Stack>
  );
}
