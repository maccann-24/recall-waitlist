import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#070707',
          warm: '#070705',
          cool: '#060808',
        },
        off: '#EDE8DF',
        gold: {
          primary: '#C4A35A',
          mid: '#886030',
          deep: '#6B4E1A',
          faint: '#3A2810',
          ghost: '#2A1A08',
        },
        blue: {
          primary: '#4A7B9D',
          mid: '#2A4A60',
          deep: '#1E3040',
        },
        teal: {
          primary: '#4A7A6A',
          deep: '#1A3028',
        },
        dim: '#484030',
        rule: '#141210',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
