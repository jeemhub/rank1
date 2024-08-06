const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        'white-glow': '0 0 10px rgba(255, 255, 255, 0.8)',
        'none': 'none',
      },
    },
  },
  darkMode: "class",
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-white': {
          'text-shadow': '0 0 10px rgba(255, 255, 255, 0.8)',
        },
        '.text-shadow-none': {
          'text-shadow': 'none',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    nextui()
  ],
};
