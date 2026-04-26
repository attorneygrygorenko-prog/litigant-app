import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B3E',
          1: '#142251',
          2: '#1A2B64'
        },
        gold: {
          DEFAULT: '#B8941E',
          1: '#CDA82A',
          2: '#D4B44A'
        },
        silver: '#A8C0D8',
        cream: '#F6F5F1',
        bone: '#CCC8BE',
        ink: '#0F0F0F',
        muted: '#555250'
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Josefin Sans', 'Century Gothic', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Outfit', 'Century Gothic', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        wrap: '1220px'
      }
    }
  },
  plugins: []
};

export default config;
