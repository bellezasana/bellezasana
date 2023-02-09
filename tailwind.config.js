/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./shared/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            green: {
               DEFAULT: "#bccc8c",
               dark: "#aba55a",
            },
            beige: "#e2e0c1",
         },
      },
   },
   plugins: [],
};
