import React from "react";
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
  onSave: () => void; // Perhatikan tidak ada parameter, data diambil dari state
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formData.name ? "Add User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          {formData.name ? "Save" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
