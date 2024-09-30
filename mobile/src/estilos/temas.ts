import { extendTheme } from "native-base";

export const TEMAS = extendTheme({
  colors: {
    gray: {
      300: "#8D8D99",
    },
    yellow: {
      300: "#FFD95E",
      500: "#FFD21C",
      800: "#FF9500",
    },
    white: "#FFF",
    black: "#000",
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
});
