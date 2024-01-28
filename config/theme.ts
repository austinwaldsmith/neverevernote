import {
  createTheme,
  ThemeOptions,
  alpha,
  lighten,
  darken,
} from "@mui/material/styles";

const breakpoints = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 1200,
    xl: 1536,
  },
};

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#343435",
      contrastText: "#ffffff",
      dark: "#202021",
      light: "#707070",
    },
    secondary: {
      main: "#129580",
      contrastText: "#1A3035",
      light: "#59DD9C",
    },
    info: {
      light: "#E2E2E2",
      main: "#D6D6D6",
      dark: "#B1B1B1",
      contrastText: "#758386",
    },
    error: {
      main: "#D37A7A",
      dark: "#CC1919",
    },
    action: {
      hoverOpacity: 0.5,
      selectedOpacity: 0.5,
    },
    text: {
      primary: "#424242",
    },
  },
  breakpoints,
  typography: {
    fontFamily: "Manrope, Homemade Apple",
    body1: {
      fontSize: 15,
      lineHeight: "normal",
      fontWeight: 500,
    },
    body2: {
      fontSize: 15,
      fontWeight: 800,
    },
    button: {
      fontSize: 15,
      fontWeight: 700,
      textTransform: "none",
      cursor: "pointer",
    },
    h1: {
      fontSize: 36,
      fontWeight: 700,
      [`@media (max-width: ${breakpoints.values.sm}px)`]: {
        fontSize: 22,
      },
    },
    h2: {
      fontSize: 24,
      fontWeight: 800,
      fontStyle: "normal",
      lineHeight: "normal",
      [`@media (max-width: ${breakpoints.values.sm}px)`]: {
        fontSize: 18,
      },
    },
    h3: {
      fontSize: 18,
      fontWeight: 800,
      [`@media (max-width: ${breakpoints.values.sm}px)`]: {
        fontSize: 16,
      },
    },
    h4: {
      fontSize: 16,
      fontWeight: 800,
    },
    subtitle1: {
      fontSize: 11,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 11,
      fontWeight: 800,
    },
  },

  components: {
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(!ownerState.square && {
            borderRadius: 10,
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: "100px",
          whiteSpace: "nowrap",
          fontSize: "12px",
          fontWeight: 800,
          padding: "4px 8px",
          textTransform: "uppercase",
          color: theme.palette.primary.contrastText,
          ...(ownerState.variant === "contained" && {
            ...(ownerState.color === "primary" && {
              "&.Mui-disabled": {
                background: theme.palette.info.main,
                opacity: 0.5,
              },
              "&:hover": {
                background: theme.palette.primary.light,
              },
            }),
            ...(ownerState.color === "info" && {
              fontSize: "11px",
              "&:hover": {
                background: theme.palette.primary.main,
              },
            }),
            ...(ownerState.color === "error" && {
              "&.Mui-disabled": {
                background: theme.palette.error.main,
                opacity: 0.5,
              },
              "&:hover": {
                background: theme.palette.error.light,
              },
            }),
          }),
          ...(ownerState.variant === "outlined" && {
            lineHeight: "20px",
            padding: "9px 24px 8px",
            border: "1.5px solid",
            backgroundColor: "#FFFFFF",
            ...((!ownerState.size || ownerState.size === "small") && {
              lineHeight: "15px",
              fontSize: "11px",
              padding: "4px 16px 6px",
            }),

            ...(ownerState.color !== "inherit" && {
              borderColor: theme.palette[ownerState.color || "primary"].main,
            }),
            "&:hover": {
              border: "1.5px solid",
              ...(ownerState.color !== "inherit" && {
                backgroundColor: alpha(
                  theme.palette[ownerState.color || "primary"].light,
                  0.7
                ),
                borderColor: theme.palette[ownerState.color || "primary"].main,
              }),
            },
          }),
        }),
      },
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
