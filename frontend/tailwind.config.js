/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: {
          DEFAULT: "#007BFF",
        },
        secondary: {
          DEFAULT: "#6C757D",
        },
        // Dark mode colors
        dark: {
          primary: "#4C7DFD",
          secondary: "#9CA3AF",
        },
      },
    },
  },
  plugins: [],
};
