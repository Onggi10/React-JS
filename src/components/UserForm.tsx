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
  onSave: (userData: { name: string; email: string }) => void; // Update to accept user data
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
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate name (no special characters)
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z0-9 ]+$/; // Only letters, numbers, and spaces
    return nameRegex.test(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate email field
    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }

    // Validate name field
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
    // Validate the form before saving
    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!validateName(formData.name) || formData.name.trim() === "") {
      setNameError("Name cannot contain special characters or be empty");
      return;
    }

    onSave(formData); // Pass formData to onSave
  };

  // Check if the form is valid
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
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!emailError}
          helperText={emailError}
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
