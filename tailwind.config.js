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
        viewpage: "url('https://wallpaperaccess.com/full/377416.jpg')",
      },
    },
  },
  plugins: [],
};
