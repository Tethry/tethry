/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        AlexandriaBold: ["AlexandriaBold", "sans-serif"],
        AlexandriaRegular: ["AlexandriaRegular", "sans-serif"],
        AlexandriaMedium: ["AlexandriaMedium", "sans-serif"],
        AlexandriaLight: ["AlexandriaLight", "sans-serif"],
        AlexandriaExtraLight: ["AlexandriaExtraLight", "sans-serif"],
      },
    },
  },
  plugins: [],
};
