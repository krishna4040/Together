/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*{.js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily:{
      'Confortaa': ['Confortaa']
    }
  },
  plugins: [require('@sira-ui/tailwind')],
}

