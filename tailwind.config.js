/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      backgroundImage: {
        viewpage:
          "url('https://i.pinimg.com/1200x/7c/2c/ff/7c2cff6bf945f072ea09616a4e191f18.jpg')",
      },
    },
  },
  plugins: [],
};
