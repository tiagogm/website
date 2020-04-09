import Typography from "typography";

export const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  headerFontFamily: ["Raleway", "Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: ["Merriweather", "serif"],
  headerWeight: "300",
  bodyWeight: "300",
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    // h1: {
    //   ...adjustFontSizeTo("2.5rem"),
    // },
    // h2: {
    //   ...adjustFontSizeTo("2.2rem"),
    // },
    // h3: {
    //   ...adjustFontSizeTo("2rem"),
    // },
    "h2,h3": {
      marginTop: rhythm(2),
    },
  }),

  // See below for the full list of options.
});
