/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable unicorn/prefer-module */

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{html,tsx,ts}'],
  // mode: 'jit', // Активируем JIT режим
  theme: {
    colors: {
      transparent: 'transparent',
      neutral: {
        0: 'var(--neutral-0)',
        100: 'var(--neutral-100)',
        200: 'var(--neutral-200)',
        300: 'var(--neutral-300)',
        400: 'var(--neutral-400)',
        500: 'var(--neutral-500)',
        600: 'var(--neutral-600)',
        700: 'var(--neutral-700)',
        800: 'var(--neutral-800)',
        900: 'var(--neutral-900)',
      },
      primary: {
        50: 'var(--primary-50)',
        100: 'var(--primary-100)',
        200: 'var(--primary-200)',
        300: 'var(--primary-300)',
        400: 'var(--primary-400)',
        500: 'var(--primary-500)',
        600: 'var(--primary-600)',
        700: 'var(--primary-700)',
        800: 'var(--primary-800)',
        900: 'var(--primary-900)',
      },
      secondary: {
        50: 'var(--secondary-50)',
        100: 'var(--secondary-100)',
        200: 'var(--secondary-200)',
        300: 'var(--secondary-300)',
        400: 'var(--secondary-400)',
        500: 'var(--secondary-500)',
        600: 'var(--secondary-600)',
        700: 'var(--secondary-700)',
        800: 'var(--secondary-800)',
        900: 'var(--secondary-900)',
      },
      error: {
        100: 'var(--error-100)',
        200: 'var(--error-200)',
        300: 'var(--error-300)',
        400: 'var(--error-400)',
        500: 'var(--error-500)',
        600: 'var(--error-600)',
        700: 'var(--error-700)',
        800: 'var(--error-800)',
        900: 'var(--error-900)',
      },
      black: {
        50: 'var(--black-50)',
      },
      current: 'current',
    },
    fontFamily: {
      travels: ['Travels', 'sans-serif'],
      manrope: ['Manrope', 'sans-serif'],
    },
    fontSize: {
      display: [
        '2rem',
        { lineHeight: '2.25rem', fontWeight: '500', letterSpacing: '-0.02em' },
      ],
      title1: [
        '2rem',
        { lineHeight: '2rem', fontWeight: '500', letterSpacing: '-0.01em' },
      ],
      title2: [
        '1.75rem',
        { lineHeight: '1.75rem', fontWeight: '500', letterSpacing: '-0.01em' },
      ],
      title3: [
        '1.625rem',
        { lineHeight: '1.625rem', fontWeight: '500', letterSpacing: '-0.01em' },
      ],
      title4: [
        '1.5rem',
        { lineHeight: '1.5rem', fontWeight: '500', letterSpacing: '-0.01em' },
      ],
      title5: [
        '1.375rem',
        { lineHeight: '1.375rem', fontWeight: '500', letterSpacing: '-0.01em' },
      ],
      title6: [
        '1.25rem',
        { lineHeight: '1.25rem', fontWeight: '500', letterSpacing: '-0.01em' },
      ],
      title7: [
        '1.125rem',
        { lineHeight: '1.125rem', fontWeight: '500', letterSpacing: '-0.01em' },
      ],
      title8: [
        '1rem',
        { lineHeight: '1rem', fontWeight: '500', letterSpacing: '-0.01em' },
      ],
      h1: ['1.5rem', { lineHeight: '1.625rem', fontWeight: '600' }],
      h2: ['1.375rem', { lineHeight: '1.5rem', fontWeight: '600' }],
      h3: ['1.25rem', { lineHeight: '1.375rem', fontWeight: '600' }],
      h4: ['1.125rem', { lineHeight: '1.25rem', fontWeight: '600' }],
      h5: ['1rem', { lineHeight: '1.125rem', fontWeight: '600' }],
      h6: ['0.875rem', { lineHeight: '1rem', fontWeight: '600' }],
      h7: ['0.75rem', { lineHeight: '0.875rem', fontWeight: '600' }],
      body1: ['1.5rem', { lineHeight: '1.625rem' }],
      body2: ['1.375rem', { lineHeight: '1.5rem' }],
      body3: ['1.25rem', { lineHeight: '1.375rem' }],
      body4: ['1.125rem', { lineHeight: '1.25rem' }],
      body5: ['1rem', { lineHeight: '1.125rem' }],
      body6: ['0.875rem', { lineHeight: '1rem' }],
      body7: ['0.75rem', { lineHeight: '0.875rem' }],
      numeric3: [
        '3rem',
        { lineHeight: '3rem', fontWeight: '600', letterSpacing: '-0.04em' },
      ],
      numeric: [
        '0.75rem',
        { lineHeight: '0.875rem', fontWeight: '500', letterSpacing: '-0.04em' },
      ],
    },
    borderRadius: {
      0: '0',
      1: '2px',
      2: '4px',
      3: '6px',
      4: '8px',
      5: '10px',
      6: '12px',
      7: '16px',
      8: '20px',
      9: '24px',
      10: '28px',
      11: '32px',
      12: '36px',
      13: '40px',
      14: '44px',
      15: '48px',
      16: '52px',
      17: '56px',
      18: '60px',
      19: '64px',
      full: '100%',
    },
    screens: {
      mobile: '375px',
      tablet: '768px',
      laptop: '1280px',
      desktop: '1536px',
    },

    extend: {
      spacing: {
        'unit-0': '0',
        'unit-1': '0.125rem',
        'unit-2': '0.25rem',
        'unit-3': '0.375rem',
        'unit-4': '0.5rem',
        'unit-5': '0.625rem',
        'unit-6': '0.75rem',
        'unit-7': '0.875rem',
        'unit-8': '1rem',
        'unit-9': '1.125rem',
        'unit-10': '1.25rem',
        'unit-11': '1.5rem',
        'unit-12': '1.75rem',
        'unit-13': '2rem',
        'unit-14': '2.25rem',
        'unit-15': '2.5rem',
        'unit-16': '2.75rem',
        'unit-17': '3rem',
        'unit-18': '3.25rem',
        'unit-19': '3.5rem',
        'unit-20': '3.75rem',
        'unit-21': '4rem',
        'unit-22': '4.25rem',
        'unit-23': '4.5rem',
        'unit-24': '4.75rem',
        'unit-25': '5rem',
      },
      containers: {
        sm: '768px',
        md: '1280px',
        lg: '1536px',
      },
      gridTemplateColumns: {
        listings: 'repeat(auto-fill, minmax(1fr))',
        'listings-tablet': 'repeat(auto-fill, minmax(362px,1fr))',
        'listings-laptop': 'repeat(auto-fill, minmax(362px,1fr))',
        'listings-desktop': 'repeat(auto-fill, minmax(358px,1fr))',
        sidebar: 'var(--sidebar-width) 1fr',
        'sidebar-map': 'var(--sidebar-width) 1fr 1fr',
      },
      width: {
        sidebar: 'var(--sidebar-width)',
        'booking-info': 'var(--booking-info-card-width)',
      },
      maxWidth: {
        'booking-info': 'var(--booking-info-card-width)',
      },
      height: {
        sidebar: 'var(--mobile-sidebar-heigth)',
        drawer: 'var(--mobile-drawer-height)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'darkening-gradient': 'var(--darkening-gradient)',
      },
      boxShadow: {
        drop: 'var(--drop-shadow)',
        shadowDown: 'var(--shadow-down)',
        shadowUp: 'var(--shadow-up)',
      },
    },
    safelist: [
      // Добавляем селекторы в safelist
      {
        pattern: /rdp-(month|table|day|nav)/,
      },
      {
        pattern: /leaflet+/,
      },
    ],
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-stable': {
          'scrollbar-gutter': 'stable',
        },
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        '.shepherd-calendar-active': {},
        '.shepherd-calendar-day-active': {},
        '.shepherd-calendar-day-highlight': {},
        '.shepherd-arrival-day-active': {},
      });
    },
    require('@tailwindcss/typography'),
  ],
};
