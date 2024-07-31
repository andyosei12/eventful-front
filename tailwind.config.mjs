/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#1DDB70',
      },
      animation: {
        'text-gradient': 'text 1.5s linear infinite',
      },
      keyframes: {
        text: {
          to: {
            backgroundPosition: '200% center',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
