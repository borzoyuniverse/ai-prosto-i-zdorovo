/// <reference types="vitest" />

import { sentryVitePlugin } from '@sentry/vite-plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, ProxyOptions } from 'vite';
import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';

import { injectYandexMetrika } from './vite-plugins/inject-yandex-metrika.ts';

import svgr from 'vite-plugin-svgr';

const proxies: Record<string, Record<string, string | ProxyOptions>> = {
  local: {
    '/api': {
      target: 'http://localhost/api',
      changeOrigin: true,
      rewrite: (path: string) => {
        return path.replace(/^\/api/, '');
      },
    },
  },
  test: {
    '/api': {
      target: 'https://prosto-zdorovo.7bits.it/api',
      changeOrigin: true,
      rewrite: (path: string) => {
        return path.replace(/^\/api/, '');
      },
    },
  },
  prod: {
    '/api': {
      target: 'https://booking.dvuhmetrovigid.ru/api',
      changeOrigin: true,
      rewrite: (path: string) => {
        return path.replace(/^\/api/, '');
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const plugins = [
    react(),
    svgr(),
    TanStackRouterVite({
      autoCodeSplitting: true,
    }),
    tsconfigPaths(),
    viteCompression({ algorithm: 'brotliCompress' }),
    injectYandexMetrika(),
  ];

  if (process.env.VITE_ENABLE_SENTRY === 'true') {
    plugins.push(
      sentryVitePlugin({
        org: '7bits',
        project: 'prosto-zdorovo-front',
        url: 'https://sentry.7bits.it/',
      }),
    );
  }

  return {
    plugins,
    build: {
      sourcemap: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}'],
      setupFiles: 'src/app/setup-tests.ts',
    },
    server: {
      proxy: proxies[process.env.VITE_PROXY_SERVER as keyof typeof proxies],
    },
  };
});
