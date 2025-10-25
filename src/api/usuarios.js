// src/api/users.js
import { API_URL } from "./config";

// src/api/userApi.js
// 👆 reemplaza 192.168.x.x por la IP local de tu PC
// puedes obtenerla con "ipconfig" en Windows o "ifconfig" en mac/linux

export const registerUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/usuario/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    throw error;
  }
};


export const loginUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/usuario/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data ),
    });

    return await response.json();
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/usuario`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};
