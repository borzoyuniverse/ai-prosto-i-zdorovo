// import { type PropsWithChildren } from 'react';

// import type { Image } from '@/types/typings';
// import {
//   Content,
//   DialogDescription,
//   DialogTitle,
//   Overlay,
//   Portal,
//   Root,
// } from '@radix-ui/react-dialog';

// import { Button } from '@/lib/shadcn/components/ui/button/button';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/lib/shadcn/components/ui/carousel';

// import { AppImage } from '@/components/app-image/app-image';

// type ImageDialogProps = {
//   open: boolean;
//   onOpenChange: (value: boolean) => void;
// };

// export function ImageDialog({
//   children,
//   open,
//   onOpenChange,
// }: PropsWithChildren<ImageDialogProps>) {
//   return (
//     <Root open={open} onOpenChange={onOpenChange}>
//       {children}
//     </Root>
//   );
// }

// type ImageDialogContentProps = {
//   images: Image[];
//   startIndex?: number;
//   onClose: () => void;

//   title: string;
//   description: string;
// };

// export function ImageDialogContent({
//   images,
//   startIndex = 0,
//   onClose,
//   title,
//   description,
// }: ImageDialogContentProps) {
//   return (
//     <Portal>
//       <Overlay className="fixed inset-0 z-50 bg-[#191919E5] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

//       <Content
//         style={
//           {
//             '--image-carousel-width': 'calc(100vw - 212px)',
//             '--image-carousel-height': '80dvh',
//           } as React.CSSProperties
//         }
//         className="fixed left-0 top-0 z-50 h-dvh w-dvw duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
//       >
//         <DialogTitle className="sr-only">{title}</DialogTitle>
//         <DialogDescription className="sr-only">{description}</DialogDescription>

//         <Button
//           className="fixed right-8 top-8"
//           contentType="onlyIcon"
//           size="lg"
//           variant="main"
//           onClick={onClose}
//         >
//           <XIcon />
//         </Button>

//         <div className="fixed inset-x-[106px] top-1/2 flex -translate-y-1/2">
//           <Carousel
//             className="max-h-[var(--image-carousel-height)]"
//             opts={{ startIndex }}
//           >
//             <CarouselContent
//               className="ml-0 items-center p-0"
//               wrapperClassName="max-w-[var(--image-carousel-width)] rounded-medium"
//             >
//               {images.map((source) => (
//                 <CarouselItem
//                   key={source.id}
//                   className="h-[var(--image-carousel-height)] w-[var(--image-carousel-width)] min-w-[var(--image-carousel-width)] max-w-[var(--image-carousel-width)] p-0"
//                 >
//                   <AppImage
//                     src={source.url}
//                     alt={source.caption ?? ''}
//                     className="h-[var(--image-carousel-height)] w-[var(--image-carousel-width)] min-w-[var(--image-carousel-width)] object-cover"
//                   />
//                 </CarouselItem>
//               ))}
//             </CarouselContent>

//             <CarouselNext
//               variant="main"
//               className="fixed -right-6 translate-x-12"
//               contentType="onlyIcon"
//               size="lg"
//             />
//             <CarouselPrevious
//               variant="main"
//               className="fixed -left-6 -translate-x-12"
//               contentType="onlyIcon"
//               size="lg"
//             />
//           </Carousel>
//         </div>
//       </Content>
//     </Portal>
//   );
// }

export const something = 'something';
