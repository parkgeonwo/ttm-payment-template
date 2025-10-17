/**
 * Linear Design System Theme Configuration
 * Based on Linear's official design system
 * Source: https://linear.app/
 */

export const linearTheme = {
  colors: {
    background: {
      primary: '#08090a',
      secondary: '#1c1c1f',
      tertiary: '#232326',
      quaternary: '#28282c',
      quinary: '#282828',
      tint: '#141516',
      translucent: 'rgba(255,255,255,.05)',
      marketing: '#010102',
      level0: '#08090a',
      level1: '#0f1011',
      level2: '#141516',
      level3: '#191a1b',
    },
    foreground: {
      primary: '#f7f8f8',
      secondary: '#d0d6e0',
      tertiary: '#8a8f98',
      quaternary: '#62666d',
    },
    border: {
      primary: '#23252a',
      secondary: '#34343a',
      tertiary: '#3e3e44',
      translucent: 'rgba(255,255,255,.05)',
    },
    line: {
      primary: '#37393a',
      secondary: '#202122',
      tertiary: '#18191a',
      quaternary: '#141515',
      tint: '#141516',
    },
    brand: {
      background: '#5e6ad2',
      text: '#fff',
    },
    accent: {
      default: '#7170ff',
      hover: '#828fff',
      tint: '#18182f',
    },
    link: {
      primary: '#828fff',
      hover: '#fff',
    },
    selection: {
      background: 'color-mix(in lch,#5e6ad2,black 10%)',
      text: '#fff',
      dim: 'color-mix(in lch,#5e6ad2,transparent 80%)',
    },
    semantic: {
      white: '#fff',
      black: '#000',
      red: '#eb5757',
      orange: '#fc7840',
      yellow: '#f2c94c',
      green: '#4cb782',
      blue: '#4ea7fc',
      indigo: '#5e6ad2',
    },
    product: {
      plan: '#68cc58',
      build: '#d4b144',
      security: '#7a7fad',
    },
  },
  typography: {
    fontFamily: {
      regular:
        '"Inter Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      serif:
        '"Tiempos Headline", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      monospace: '"Berkeley Mono", ui-monospace, "SF Mono", "Menlo", monospace',
      emoji:
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 510,
      semibold: 590,
      bold: 680,
    },
    fontSize: {
      micro: '0.6875rem', // 11px
      mini: '0.75rem', // 12px
      small: '0.8125rem', // 13px
      regular: '0.9375rem', // 15px
      large: '1.125rem', // 18px
      title1: '2.25rem', // 36px
      title2: '1.5rem', // 24px
      title3: '1.25rem', // 20px
    },
    lineHeight: {
      tight: '1.1',
      normal: '1.5',
      relaxed: '1.6',
    },
    letterSpacing: {
      tight: '-0.022em',
      normal: '-0.011em',
      wide: '0',
    },
  },
  spacing: {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0px 2px 4px rgba(0,0,0,.1)',
    md: '0px 4px 24px rgba(0,0,0,.2)',
    lg: '0px 7px 32px rgba(0,0,0,.35)',
    stackLow:
      '0px 8px 2px 0px transparent, 0px 5px 2px 0px rgba(0,0,0,.01), 0px 3px 2px 0px rgba(0,0,0,.04), 0px 1px 1px 0px rgba(0,0,0,.07), 0px 0px 1px 0px rgba(0,0,0,.08)',
  },
  animation: {
    duration: {
      fast: '0.1s',
      normal: '0.25s',
    },
    easing: {
      default: 'cubic-bezier(.25,.46,.45,.94)',
      inOut: 'cubic-bezier(.645,.045,.355,1)',
    },
  },
  zIndex: {
    base: 1,
    dropdown: 50,
    sticky: 100,
    overlay: 500,
    modal: 600,
    popover: 700,
    toast: 800,
    tooltip: 1000,
  },
} as const

export type LinearTheme = typeof linearTheme
