import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function ProductCard({ item, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(item)}>
      <Image
        source={{ uri: item.imagen || "https://via.placeholder.com/300" }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.descripcion}
        </Text>
        <Text style={styles.price}>💲 {item.precio}/día</Text>
        <Text style={styles.owner}>👤 {item.usuario?.nombre || "Anónimo"}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    overflow: "hidden",
    elevation: 4,
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
  },
  image: {
    width: "100%",
    height: 150,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
    marginTop: 4,
  },
  owner: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
});
