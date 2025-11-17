"use client";
import Image from "next/image";
import * as React from "react";
import TodoList from "./TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackProvider } from "./Snack";
import { ProviderReducer } from "./provider";

const theme = createTheme({
  palette: {
    mode: "light", // أو "dark"
    primary: {
      main: "#5F5F5F", // اللون الأساسى
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "Cairo, sans-serif",
    fontSize: 14,
  },
});

export default function SelectOtherProps() {
  return (
    <ThemeProvider theme={theme}>
      <ProviderReducer>
        <SnackProvider>
          <div className="max-w-4xl max-h-[90vh] bg-[#eee] flex justify-center mt-10 mx-auto text-black overflow-y-auto rounded-2xl p-5">
            <div className="w-full">
              <TodoList />
            </div>
          </div>
        </SnackProvider>
      </ProviderReducer>
    </ThemeProvider>
  );
}
