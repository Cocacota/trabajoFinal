import React from "react";
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function ProductModal({ visible, product, onClose }) {
  if (!product) return null;

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Image
              source={{ uri: product.imagen || "https://via.placeholder.com/300" }}
              style={styles.image}
            />
            <Text style={styles.title}>{product.nombre}</Text>
            <Text style={styles.price}>💲 {product.precio}/día</Text>

            <Text style={styles.sectionTitle}>Descripción:</Text>
            <Text style={styles.text}>{product.descripcion}</Text>

            <Text style={styles.sectionTitle}>Propietario:</Text>
            <Text style={styles.text}>{product.usuario?.nombre}</Text>

            <Text style={styles.sectionTitle}>Ubicación:</Text>
            <Text style={styles.text}>{product.ubicacion}</Text>

            <Text style={styles.sectionTitle}>Estado:</Text>
            <Text style={[styles.text, { color: product.disponible ? "green" : "red" }]}>
              {product.disponible ? "Disponible ✅" : "No disponible ❌"}
            </Text>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 16,
    maxHeight: "80%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  price: {
    textAlign: "center",
    fontSize: 18,
    color: "#007bff",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    marginHorizontal: 10,
    color: "#444",
  },
  closeButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
  },
  closeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
  