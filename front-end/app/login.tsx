// app/login.tsx
import React, { useState ,useContext} from "react";
import { View, Text, TextInput, StyleSheet, Pressable,Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { loginUser } from "@/src/api/usuarios";
import { AuthContext } from "@/components/contexto/contex-usuario";
export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [form, setForm] = useState({
    email:"",
    password:""
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };
  
  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(form.email,form.password);
      router.replace("/");
    } catch {
      Alert.alert("Error", "Credenciales incorrectas o servidor no disponible.");
    } finally {
      setLoading(false);
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
