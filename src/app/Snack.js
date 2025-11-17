import React, { createContext, useState } from "react";
import { Snackbar } from "@mui/material";

// إنشاء الـ context
export const SnackContext = createContext();

// الـ Provider نفسه
export function SnackProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // دالة تفتح الـ Snackbar
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

      {/* Snackbar نفسه */}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message={message}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "", // لون الخلفية
            color: "white", // لون النص
            fontWeight: "bold",
            borderRadius: "10px",
          },
        }}
      />
    </SnackContext.Provider>
  );
}
