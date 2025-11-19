import React, { useState } from "react";
import { View, Text, TextInput,  StyleSheet, Pressable,Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import {registerUser} from "../src/api/usuarios"

export default function RegisterScreen(){
    const router = useRouter();
    const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });
 const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };
  const handleRegister = async () => {
    Alert.alert("procede","los campos completados correctamente");
    if (!form.nombre || !form.apellido || !form.email || !form.password) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios.");
     return;
    
      
    }try {
      const result = await registerUser(form);

      if (result.message?.includes("✅")) {
        Alert.alert("Éxito", "Usuario registrado correctamente.");
        router.navigate("/login") // si tienes una pantalla de login
      } else {
        Alert.alert("Error", result.message || "No se pudo registrar.");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al conectar con el servidor.");
    }
  };


    
     return (
        <View style={styles.container}>
          <Text style={styles.title}>Registrarse</Text>
    
            <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={form.nombre}
            onChangeText={(text) => handleChange("nombre", text)}
            autoCapitalize="none"
            
          /><TextInput
            style={styles.input}
            placeholder="apellido"
            value={form.apellido}
            onChangeText={(Text)=> handleChange("apellido",Text)}
            autoCapitalize="none"
            
          />
          <TextInput
            style={styles.input}
            placeholder="telefono"
            value={form.telefono}
            onChangeText={(Text)=> handleChange("telefono",Text)}
            autoCapitalize="none"
            
          />
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            value={form.direccion}
            onChangeText={(Text)=> handleChange("direccion",Text)}
            autoCapitalize="none"
            
          /> 
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
    
          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>registrame</Text>
          </Pressable>
          <Link href={"/login"} asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>ya tengo cuenta</Text>
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
        margin:15,
        justifyContent:"center",
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
      },
    });