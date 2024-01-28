"use client";

/* Core */
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
/* Instruments */
import { reduxStore } from "@/lib/redux";
import { ThemeProvider } from "@mui/material";
import theme from "@/config/theme";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <Provider store={reduxStore}>{props.children}</Provider>
      </ThemeProvider>
    </SessionProvider>
  );
};
