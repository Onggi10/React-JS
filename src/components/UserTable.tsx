import React, { useState } from "react";
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
  tableCellClasses,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { User } from "../types/types";

// Styled components untuk tabel
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  // State untuk pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default: 5 baris per halaman

  // State untuk sorting
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<keyof User>("id");

  // Fungsi untuk mengubah halaman
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Fungsi untuk mengubah jumlah baris per halaman
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update jumlah baris per halaman
    setPage(0); // Reset ke halaman pertama
  };

  // Fungsi untuk mengubah sorting
  const handleSort = (column: keyof User) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  // Sorting data pengguna
  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Potong data pengguna berdasarkan halaman dan jumlah baris yang dipilih
  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                onClick={() => handleSort("id")}
                style={{ cursor: "pointer" }}
              >
                ID{" "}
                {sortColumn === "id"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </StyledTableCell>
              <StyledTableCell
                onClick={() => handleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Name{" "}
                {sortColumn === "name"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </StyledTableCell>
              <StyledTableCell
                onClick={() => handleSort("email")}
                style={{ cursor: "pointer" }}
              >
                Email{" "}
                {sortColumn === "email"
                  ? sortDirection === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell>{user.id}</StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => onEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Komponen Pagination */}
      <TablePagination
        component="div"
        count={users.length} // Total jumlah user
        page={page} // Halaman saat ini
        onPageChange={handleChangePage} // Fungsi untuk ganti halaman
        rowsPerPage={rowsPerPage} // Jumlah baris per halaman
        onRowsPerPageChange={handleChangeRowsPerPage} // Fungsi untuk ganti jumlah baris
        rowsPerPageOptions={[5, 10, 25]} // Opsi jumlah baris per halaman
      />
    </>
  );
};

export default UserTable;
