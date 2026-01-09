import { useMediaQuery } from 'usehooks-ts';

import { useIsMobile } from './use-is-mobile';

export const useScreens = () => {
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery('only screen and (max-width : 1240px)');
  const isLaptop = useMediaQuery('only screen and (max-width : 1536px)');

  return { isMobile, isTablet, isLaptop };
};
