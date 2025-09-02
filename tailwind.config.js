const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addVariant }) {
      addVariant('children', '& > *');
    },
  ],
};
export default config;
