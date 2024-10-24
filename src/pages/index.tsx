import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import UserTable from "@/components/UserTable";
import UserForm from "@/components/UserForm";
import CustomSnackbar from "@/components/CustomSnackbar"; // Import CustomSnackbar
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";
import { User } from "../types/types";
import Navbar from "../components/navbar";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State untuk menyimpan daftar pengguna
  const [open, setOpen] = useState(false); // State untuk mengelola dialog form
  const [currentUser, setCurrentUser] = useState<User | null>(null); // State untuk menyimpan user yang sedang diedit
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
  }); // State form data

  // State untuk CustomSnackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State untuk membuka Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State untuk menyimpan pesan
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success"); // State untuk menyimpan tipe pesan

  // Fungsi untuk menampilkan Snackbar
  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Memuat data pengguna dari API saat pertama kali komponen di-render
  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to load users:", error);
      showSnackbar("Failed to load users!", "error");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Fungsi untuk membuka form dialog
  const handleOpenForm = () => {
    setCurrentUser(null); // Reset currentUser (untuk Create mode)
    setFormData({ name: "", email: "" }); // Reset form data
    setOpen(true); // Buka dialog form
  };

  // Fungsi untuk menyimpan (create/update) pengguna
  const handleSave = async () => {
    try {
      console.log("Saving user:", formData);

      if (currentUser) {
        await updateUser(currentUser.id, formData);
        showSnackbar("User updated successfully!", "success");
      } else {
        await createUser(formData);
        showSnackbar("User created successfully!", "success");
      }

      setOpen(false);
      await loadUsers();
    } catch (error) {
      console.error("Failed to save user:", error);
      showSnackbar("Failed to save user!", "error");
    }
  };

  // Fungsi untuk edit user
  const handleEdit = (user: User) => {
    setCurrentUser(user); // Set currentUser untuk user yang akan diedit
    setFormData({ name: user.name, email: user.email }); // Isi form dengan data user
    setOpen(true); // Buka dialog form
  };

  // Fungsi untuk menghapus user
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      showSnackbar("User deleted successfully!", "success");
      await loadUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      showSnackbar("Failed to delete user!", "error");
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        User Management System
      </Typography>

      {/* Tombol untuk membuka form tambah user */}
      <Button variant="contained" color="primary" onClick={handleOpenForm}>
        Add New User
      </Button>

      {/* Tabel untuk menampilkan daftar pengguna */}
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Komponen form untuk tambah/edit pengguna */}
      <UserForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Snackbar untuk menampilkan pesan umpan balik */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default Home;
