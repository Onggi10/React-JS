import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Atur posisi di bagian atas tengah
      open={open}
      autoHideDuration={3000} // Durasi otomatis tutup
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
