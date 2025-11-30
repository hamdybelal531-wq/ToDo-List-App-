import React, { createContext, useState } from "react";
import { Snackbar } from "@mui/material";

export const SnackContext = createContext();

export function SnackProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnack = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackContext.Provider value={{ showSnack }}>
      {children}

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message={message}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "",
            fontWeight: "bold",
            borderRadius: "10px",
          },
        }}
      />
    </SnackContext.Provider>
  );
}
