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
        // A dark ground with gold rules — the plates in an old book of
        // correspondences rather than a printed textbook page. Light mode is
        // the same book on aged parchment, so the toggle stays coherent.
        ground: '#0d0c14',
        'ground-2': '#15141f',
        'ground-3': '#1e1b2b',
        gold: '#c9a227',
        'gold-dim': '#8a7020',
        'gold-pale': '#e6d492',
        parchment: '#ece5d4',
        'parchment-2': '#d9d0ba',
        'parchment-dim': '#9a927f',
        rule: '#2f2a41',
        'rule-gold': '#5c4a1c',

        // Light mode ground
        paper: '#f2ebd9',
        'paper-2': '#e7dec7',
        'paper-sunk': '#dad0b6',
        ink: '#1b1826',
        'ink-2': '#3b3550',
        'ink-muted': '#6a6280',

        // Vermilion stays as the seal — the one hot colour, rationed.
        seal: '#b03a2e',
        'seal-bright': '#d4553f',

        primary: '#c9a227',
        'primary-dark': '#8a7020',
        'primary-accent': '#e6d492',

        // Legacy tokens remapped so components still referencing them work.
        'site-dark': '#0d0c14',
        'site-dark-2': '#15141f',
        'site-gray': '#6a6280',
        'site-light': '#e7dec7',
        'site-border': '#dad0b6',
        'ink-bg': '#0d0c14',
        'ink-bg-2': '#15141f',
        'ink-border': '#2f2a41',
        'rule-strong': '#b8ab8c',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Garamond', 'serif'],
        serif: ['var(--font-serif)', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      letterSpacing: {
        label: '0.18em',
        wide2: '0.3em',
      },
      maxWidth: {
        '8xl': '104rem',
        reading: '38rem',
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [typography],
};

export default config;
