import React, { useContext } from "react";
import { Redirect, Slot } from "expo-router";
import { AuthContext } from "@/components/contexto/contex-usuario";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Slot />; // <-- Aquí se renderizan las pantallas hijas (tabs)
}
