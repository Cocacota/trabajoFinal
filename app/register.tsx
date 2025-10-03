import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { fakeUsers } from "@/components/fakerUser";

export default function RegisterScreen(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName]=useState("");

    const onLogin=()=>{
        fakeUsers.push({
        id: String(fakeUsers.length + 1),
        name: name,
        email: email,
        password: password,
});
      alert("registrado");
      router.navigate("/login")
    }
     return (
        <View style={styles.container}>
          <Text style={styles.title}>Registrarse</Text>
    
            <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            
          />
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