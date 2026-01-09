import { AttachmentDto } from '@/api/rpc-request/types';
import type { IconType } from 'solar-icon-react';
import {
  BdFileText,
  BdGalleryMinimalistic,
  BdMusicNote,
  BdVideocamera,
} from 'solar-icon-react/bd';

import { Typography } from '@/components/typography/typography';

import { IconWithBg } from '@/lib/shadcn/components/ui/icon-with-background/icon-with-background';
import { Stack } from '@/lib/shadcn/components/ui/stack/stack';

import { downloadFile } from './utils/download-file';

const docksIcon: Record<string, IconType> = {
  MP3: BdMusicNote,
  MP4: BdVideocamera,
  JPG: BdGalleryMinimalistic,
  PNG: BdGalleryMinimalistic,
  PDF: BdFileText,
};

export function Doc({ title, type, url }: AttachmentDto) {
  const DocIcon = docksIcon[type] ?? BdGalleryMinimalistic;

  return (
    <button
      className="flex w-fit items-center gap-unit-4 rounded-7 bg-primary-100 p-unit-4 pr-unit-6"
      onClick={() => downloadFile(url, title, type.toLowerCase())}
    >
      <IconWithBg>
        <DocIcon type={type} />
      </IconWithBg>
      <Stack className="text-left">
        <Typography.h7 className="text-neutral-900">{title}</Typography.h7>
        <Typography.body7 className="text-neutral-500">{type}</Typography.body7>
      </Stack>
    </button>
  );
}

// const icons: Record<string, ReactNode> = {
//   MP3: <MP3 />,
//   MP4: <MP4 />,
//   JPG: <ImageIcon />,
//   PNG: <ImageIcon />,
//   PDF: <PDF />,
// };

// const DocIcon = ({ type }: { type: string }) => {
//   return (
//     <Stack className="rounded-6 bg-primary-300 p-unit-3">
//       {icons[type] ?? <ImageIcon />}
//     </Stack>
//   );
// };
