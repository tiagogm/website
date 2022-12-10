import Typography from "typography";

export const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.5,
  headerFontFamily: ["Raleway", "Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: ["Nunito", "Georgia", "serif"],
  headerWeight: "300",
  bodyWeight: "300",
  boldWeight: "600",
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
    // p: {
    //   ...adjustFontSizeTo("18px"),
    // },
    "pre,code": {
      fontSize: "14px",
    },
    h2: {
      marginTop: rhythm(2),
    },
    h3: {
      marginTop: rhythm(1.2),
      fontWeight: "400",
    },
  }),
});
