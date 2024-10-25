import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  formData: { name: string; email: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }>
  >;
}

const UserForm: React.FC<Props> = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
}) => {
  const [emailError, setEmailError] = useState(""); // State untuk error email
  const [nameError, setNameError] = useState(""); // State untuk error name

  // Fungsi untuk memvalidasi format email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fungsi untuk memvalidasi name (tidak boleh ada karakter khusus)
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z0-9 ]+$/; // Hanya huruf, angka, dan spasi
    return nameRegex.test(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }

    if (name === "name") {
      if (!validateName(value)) {
        setNameError("Name cannot contain special characters");
      } else if (value.trim() === "") {
        setNameError("Name is required");
      } else {
        setNameError("");
      }
    }
  };

  const handleSave = () => {
    // Cek apakah form valid sebelum menyimpan
    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!validateName(formData.name) || formData.name.trim() === "") {
      setNameError("Name cannot contain special characters or be empty");
      return;
    }

    onSave(); // Jika validasi lolos, lanjutkan dengan save
  };

  // Tombol Save hanya aktif jika tidak ada error dan form diisi dengan benar
  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      !nameError &&
      !emailError
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formData.name ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!nameError} // Jika ada pesan error, berikan indikator error
          helperText={nameError} // Tampilkan pesan error di bawah input
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!emailError} // Jika ada pesan error, berikan indikator error
          helperText={emailError} // Tampilkan pesan error di bawah input
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
          disabled={!isFormValid()}
        >
          {formData.name ? "Save" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
