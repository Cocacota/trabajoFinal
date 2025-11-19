import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/src/api/config";
export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  register: async (data: any) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Verificar si hay sesión guardada
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return setLoading(false);

        const res = await fetch(`${API_URL}/usuario/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          await AsyncStorage.removeItem("token");
        }
      } catch (error) {
        console.error("⚠️ Error verificando sesión:", error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // ✅ Iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/usuario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();
      await AsyncStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // ✅ Cerrar sesión
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  // ✅ Registrar usuario
  const register = async (userData: any) => {
    const res = await fetch(`${API_URL}/usuario/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error registrando usuario: ${text}`);
    }

    return await res.json();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
