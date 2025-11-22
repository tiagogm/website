import Typography from "typography";

export const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.5,
  headerFontFamily: ["Raleway", "Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: ["Nunito", "Georgia", "serif"],
  headerWeight: "300",
  bodyWeight: "300",
  boldWeight: "600",
  // Colors are handled via CSS variables in app.scss for dark mode support
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
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
