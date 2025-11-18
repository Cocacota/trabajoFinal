import { API_URL } from "./config";

export interface producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  usuario: {
    nombre: string;
    foto?: string;
  };
}
export const getProductos = async ():Promise<producto[]> => {
  try {
    const response = await fetch(`${API_URL}/producto`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return[];
  }
};
export const cargarProducto = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/producto/cargar`, {
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