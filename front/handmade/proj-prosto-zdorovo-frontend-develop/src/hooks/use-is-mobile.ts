import { useMediaQuery } from 'usehooks-ts';

export function useIsMobile() {
  return useMediaQuery('only screen and (max-width : 767px)');
}
