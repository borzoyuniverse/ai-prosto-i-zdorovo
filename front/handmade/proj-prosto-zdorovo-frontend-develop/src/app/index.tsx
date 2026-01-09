// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/lib/shadcn/components/ui/toaster/toaster';

import { AppProvider } from './provider';
import { RouterProvider } from './router';

// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider />
      {/* <Loader /> */}
      {/* <CookieDialog /> */}
      {/* <TanStackRouterDevelopmentTools
				router={router}
				initialIsOpen={false}
				position="bottom-right"
			/> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Toaster
        position="bottom-center"
        duration={3000}
        visibleToasts={1}
        offset={{ bottom: 84 }}
        mobileOffset={{ bottom: 84 }}
        toastOptions={{
          classNames: {
            toast:
              '!bg-transparent !shadow-none !border-none flex items-center justify-center w-fit !rounded-large !px-unit-0 !py-unit-0 [&>div]:w-full',
          },
        }}
      />
    </AppProvider>
  );
};
