import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import CryptoJS from "crypto-js";

const Usuario = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Botón de inicio de sesión presionado");
    const hashedPassword = CryptoJS.SHA256(password).toString();
    console.log("Contraseña encriptada:", hashedPassword);

    try {
      const response = await fetch("http://192.168.1.66:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password: hashedPassword }),
      });

      console.log("Estado HTTP de la respuesta:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al iniciar sesión:", errorData.message);
        Alert.alert("Error", errorData.message || "Credenciales incorrectas.");
        return;
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.success) {
        Alert.alert("Inicio de sesión exitoso", "Bienvenido!", [
          {
            text: "OK",
            onPress: () => navigation?.navigate("Pagina"), // Navegación al componente 'Pagina'
          },
        ]);
        setUsername(""); // Limpia el campo de usuario
        setPassword(""); // Limpia el campo de contraseña
      } else {
        Alert.alert("Error", data.message || "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error en la conexión:", error.message);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor. Verifica tu red.");
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.banner} />
      <View style={styles.card}>
        <Text style={styles.header}>Iniciar Sesión</Text>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_640.png" }}
            style={styles.icon}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button title="Iniciar Sesión" color="#FF6347" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation?.navigate("Usuario")}>
          <Text style={styles.linkText}>¿No tienes cuenta? Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E1F2F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  banner: {
    position: "absolute",
    top: 0,
    height: "60%",
    width: "100%",
    backgroundColor: "#FF2856",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  card: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "#E6F7F9",
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  input: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  linkText: {
    color: "#1E90FF",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default Usuario;
