// app/login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable,Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { fakeUsers } from "@/components/fakerUser";
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
 const onLogin = async () => {
    try {
      const response = await fetch("http://10.0.2.2:4000/login", {
        // ⚠️ En Android Emulator usa 10.0.2.2 en lugar de localhost
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert("Bienvenido", `Hola ${data.user.name} 👋`);
        router.replace("/");
      } else {
        Alert.alert("Error", data.message || "Credenciales inválidas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Link href={"/register"} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>registrate aqui!!</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 15,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
