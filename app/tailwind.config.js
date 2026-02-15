/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saint: {
          bg: '#1a1a2e',
          surface: 'rgba(255,255,255,0.06)',
          border: 'rgba(255,255,255,0.1)',
          accent: '#60a5fa',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
          sidebar: 'rgba(0,0,0,0.3)',
        }
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
};
