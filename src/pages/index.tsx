import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import UserTable from "@/components/UserTable";
import UserForm from "@/components/UserForm";
import CustomSnackbar from "@/components/CustomSnackbar";
import Navbar from "../components/navbar";
import { getUsers, createUser, updateUser } from "../services/api";
import { User } from "../types/types";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Tambahkan state users
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  // Fungsi untuk memuat pengguna dari API
  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      setSnackbarMessage("Failed to load users!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    loadUsers(); // Panggil fungsi loadUsers saat pertama kali komponen di-render
  }, []);

  // Buka form dialog untuk menambah pengguna
  const handleOpenForm = () => {
    setCurrentUser(null);
    setFormData({ name: "", email: "" });
    setOpen(true);
  };

  // Fungsi untuk menyimpan atau memperbarui pengguna
  const handleSave = async (userData: Omit<User, "id">) => {
    try {
      if (currentUser) {
        await updateUser(currentUser.id, userData);
        setSnackbarMessage("User updated successfully!");
      } else {
        await createUser(userData);
        setSnackbarMessage("User created successfully!");
      }
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpen(false);
      await loadUsers(); // Memuat ulang daftar pengguna untuk memastikan pembaruan data
    } catch (error) {
      setSnackbarMessage("Failed to save user data.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        User Management System
      </Typography>

      {/* Tabel untuk menampilkan daftar pengguna */}
      <UserTable
        users={users} // Berikan users sebagai prop ke UserTable
        setCurrentUser={setCurrentUser}
        setFormData={setFormData}
        setOpen={setOpen}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarSeverity={setSnackbarSeverity}
        handleOpenForm={handleOpenForm}
        reloadUsers={loadUsers} // Berikan fungsi loadUsers sebagai prop reloadUsers
      />

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
