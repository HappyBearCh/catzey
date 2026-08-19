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
        // Paper and ink. The old scheme was a violet-on-near-black tabloid
        // palette; this one is a warm printed page, which is what a reference
        // work looks like. Everything is low-chroma except the seal.
        paper: '#faf7f0',
        'paper-2': '#f2ede2',
        'paper-sunk': '#ebe4d6',
        ink: '#1f1c17',
        'ink-2': '#3f3a31',
        'ink-muted': '#6d655a',
        rule: '#ddd4c2',
        'rule-strong': '#c4b9a3',

        // Dark mode is the same page after dark, not a different site.
        'ink-bg': '#16140f',
        'ink-bg-2': '#201d16',
        'ink-border': '#3a352b',

        // Indigo for structure, vermilion for emphasis — the two inks a
        // Japanese printed page actually uses. The seal red is rationed: it
        // marks the current item and nothing else.
        primary: '#2f3b6b',
        'primary-dark': '#222c52',
        'primary-accent': '#8f9ac4',
        seal: '#a8342a',
        'seal-dark': '#7d251d',

        // Kept so the many components still referencing these keep compiling,
        // remapped onto the new palette rather than the old violet one.
        'site-dark': '#16140f',
        'site-dark-2': '#201d16',
        'site-gray': '#6d655a',
        'site-light': '#f2ede2',
        'site-border': '#ddd4c2',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      letterSpacing: {
        label: '0.14em',
      },
      maxWidth: {
        '8xl': '104rem',
        // A reading measure, roughly 68 characters at the body size.
        reading: '38rem',
      },
      borderRadius: {
        // Printed matter has corners.
        none: '0',
      },
    },
  },
  plugins: [typography],
};

export default config;
