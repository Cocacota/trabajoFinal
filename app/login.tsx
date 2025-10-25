// app/login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable,Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { loginUser } from "@/src/api/usuarios";
export default function LoginScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    email:"",
    password:""
  });
  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };
  
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Por favor ingresa tu email y contraseña.");
      return;
    }

    try {
      const result = await loginUser(form);

      if (result.message?.includes("✅")) {
        Alert.alert("Bienvenido", `Hola ${result.user.nombre} 👋`);
        // Navegar al Home o Dashboard
        router.navigate("/")
      } else {
        Alert.alert("Error", result.message || "Credenciales incorrectas");
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
        value={form.email}
       onChangeText={(Text)=> handleChange("email",Text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={form.password}
        onChangeText={(Text)=> handleChange("password",Text)}
        
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleLogin}>
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
