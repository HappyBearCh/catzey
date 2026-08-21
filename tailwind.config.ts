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
        // Manga is printed black on cheap paper, and a study guide is printed
        // the same way with one spot colour for the parts that matter. So: ink,
        // newsprint, and vermilion — the colour of a hanko, which is the only
        // red that appears on a Japanese page by convention rather than by
        // decoration.
        //
        // The token *names* are inherited from the previous design on purpose.
        // `gold` is now vermilion everywhere it is used, which re-skins some
        // fifty files without touching one of them; the names are a palette
        // slot, not a claim about hue.

        // Ink — the dark ground, and the text colour on paper.
        ground: '#14110f',
        'ground-2': '#1e1a17',
        'ground-3': '#2b2521',

        // The single accent. `gold` is the slot every accent already uses.
        gold: '#d0342c',
        'gold-dim': '#9c2620',
        'gold-pale': '#f0a49e',

        // Newsprint, for text on the ink ground.
        parchment: '#f7f4ee',
        'parchment-2': '#e6e1d8',
        'parchment-dim': '#9c968c',

        // Rules. Manga panels are drawn, not hinted at — these are meant to be
        // seen, unlike the hairlines they replace.
        rule: '#3a332e',
        'rule-gold': '#6b241f',

        // Paper mode.
        paper: '#f7f4ee',
        'paper-2': '#ece7dd',
        'paper-sunk': '#ddd7cb',
        ink: '#14110f',
        'ink-2': '#3d3630',
        'ink-muted': '#6f675e',

        seal: '#d0342c',
        'seal-bright': '#e8564a',

        primary: '#d0342c',
        'primary-dark': '#9c2620',
        'primary-accent': '#f0a49e',

        // Legacy tokens remapped so components still referencing them work.
        'site-dark': '#14110f',
        'site-dark-2': '#1e1a17',
        'site-gray': '#6f675e',
        'site-light': '#ece7dd',
        'site-border': '#ddd7cb',
        'ink-bg': '#14110f',
        'ink-bg-2': '#1e1a17',
        'ink-border': '#3a332e',
        'rule-strong': '#14110f',
      },
      fontFamily: {
        // Japanese textbooks set headings in Gothic and body in Mincho. This
        // keeps that convention and inverts the previous design, which set
        // everything in an old-style serif. Zen Kaku Gothic New is a real
        // Japanese Gothic, so the kanji in the stroke-count readings render in
        // the same voice as the headings around them.
        display: ['var(--font-display)', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', 'sans-serif'],
        serif: ['var(--font-serif)', 'Hiragino Mincho ProN', 'Yu Mincho', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      letterSpacing: {
        label: '0.14em',
        wide2: '0.3em',
      },
      maxWidth: {
        '8xl': '104rem',
        reading: '38rem',
      },
      borderRadius: {
        none: '0',
      },
      backgroundImage: {
        // Screentone. The defining texture of the medium: shading done with
        // adhesive sheets of printed dots rather than with grey ink, because
        // the presses could only manage black.
        screentone: 'radial-gradient(currentColor 1px, transparent 1.2px)',
      },
      backgroundSize: {
        screentone: '5px 5px',
        'screentone-fine': '3px 3px',
      },
    },
  },
  plugins: [typography],
};

export default config;
