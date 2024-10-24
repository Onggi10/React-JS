import axios from "axios";

const API_URL = "http://localhost:3001/users"; // URL json-server atau API

// Fungsi untuk READ (mendapatkan semua data)
export const getUsers = async () => {
  return await axios.get(API_URL);
};

// Fungsi untuk CREATE (menambah user baru)
export const createUser = async (user: { name: string; email: string }) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Fungsi untuk UPDATE (mengupdate user berdasarkan ID)
export const updateUser = async (
  id: number,
  user: { name: string; email: string }
) => {
  return await axios.put(`${API_URL}/${id}`, user);
};

// Fungsi untuk DELETE (menghapus user berdasarkan ID)
export const deleteUser = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};
