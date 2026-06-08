import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        'primary-dark': '#5b21b6',
        'primary-accent': '#e879f9',
        'site-dark': '#0f0b1e',
        'site-dark-2': '#1a1530',
        'site-gray': '#4b5563',
        'site-light': '#f5f3ff',
        'site-border': '#ddd6fe',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      maxWidth: {
        '8xl': '104rem',
      },
    },
  },
  plugins: [typography],
};

export default config;
