import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  styled,
  TextField,
  Box,
} from "@mui/material";
import { Delete, Edit, Add as AddIcon } from "@mui/icons-material";
import { getUsers, deleteUser } from "../services/api";
import { User } from "../types/types";

interface Props {
  users: User[]; // Perbarui prop untuk menerima users dari komponen induk
  setCurrentUser: (user: User | null) => void;
  setFormData: React.Dispatch<React.SetStateAction<Omit<User, "id">>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarSeverity: React.Dispatch<
    React.SetStateAction<"success" | "error" | "warning" | "info">
  >;
  handleOpenForm: () => void;
  reloadUsers: () => Promise<void>; // Tambahkan prop untuk memuat ulang data dari induk
}

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
});

const UserTable: React.FC<Props> = ({
  users,
  setCurrentUser,
  setFormData,
  setOpen,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarSeverity,
  handleOpenForm,
  reloadUsers,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<keyof User>("id");
  const [searchTerm, setSearchTerm] = useState("");

  // Perbarui data tabel saat props users berubah
  useEffect(() => {
    setPage(0); // Kembali ke halaman pertama saat data baru dimuat
  }, [users]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column: keyof User) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setFormData({ name: user.name, email: user.email });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setSnackbarMessage("User deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      await reloadUsers(); // Panggil ulang loadUsers dari props untuk sinkronisasi
    } catch (error) {
      setSnackbarMessage("Failed to delete user!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
        <TextField
          label="Search by Name or Email"
          variant="outlined"
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box display="flex" alignItems="center">
          <IconButton size="large" color="success" onClick={handleOpenForm}>
            <AddIcon />
          </IconButton>
          <Box component="span" ml={1} fontWeight="bold">
            {" "}
            {/* ml={1} for spacing */}
            Add User
          </Box>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell onClick={() => handleSort("name")}>
                Name
              </StyledTableCell>
              <StyledTableCell onClick={() => handleSort("email")}>
                Email
              </StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(user)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={sortedUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default UserTable;
