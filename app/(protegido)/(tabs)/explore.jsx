import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { AuthContext } from "@/context/AuthContext";
import { API_URL } from "@/src/api/config";

export default function CrearProductoScreen() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [foto, setFoto] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!nombre || !precio) {
      Alert.alert("Error", "El nombre y el precio son obligatorios");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Debes iniciar sesión para subir productos");
        return;
      }

      const response = await fetch(`${API_URL}/producto/cargar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio_dia: parseFloat(precio),
          foto_url: foto,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("✅ Éxito", "Producto creado correctamente");
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setFoto("");
      } else {
        Alert.alert("Error", data.message || "No se pudo crear el producto");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      Alert.alert("Error", "Hubo un problema al conectar con el servidor");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Subir un producto</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        multiline
        numberOfLines={4}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio por día"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la foto (opcional)"
        value={foto}
        onChangeText={setFoto}
      />

      <Button title="Cargar producto" color="#007AFF" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
  },
});
