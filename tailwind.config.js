module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customWhite: "#e6e5e8",
        customBlue: "#8a85ff",
        customBlack: "#282c34",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
