module.exports = {
  purge: [
    './src/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        darkGrex: "var(--color-dark-grey)",
        lightGrey: "var(--color-light-grey)",
        'regal-blue': '#243c5a'
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        openSans: ['Open Sans'],
        oswald: ['Oswald']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

