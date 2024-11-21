import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Pagina = () => {
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Introducción a la Ciberseguridad</Text>
      
      <Image
        source={{
          uri: "https://www.ciscopress.com/common/images/content/generic-ebook/cybersecurity-cyber-threats.jpg",
        }}
        style={styles.image}
      />
      
      <Text style={styles.paragraph}>
        La ciberseguridad se refiere a la práctica de proteger sistemas, redes y programas de
        ataques digitales. Estos ataques suelen estar destinados a acceder, cambiar o destruir información sensible,
        extorsionar a los usuarios o interrumpir la normalidad de los servicios.
      </Text>

      <Text style={styles.subtitle}>Principales Amenazas de Ciberseguridad:</Text>
      <View style={styles.list}>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>1. Phishing</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>2. Malware (software malicioso)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>3. Ransomware</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>4. Ataques de denegación de servicio (DDoS)</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>5. Ataques a la privacidad y robo de identidad</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Prácticas recomendadas para protegerse:</Text>
      <View style={styles.list}>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>1. Usar contraseñas fuertes y únicas</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>2. Mantener el software actualizado</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>3. Utilizar autenticación de dos factores</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>4. No hacer clic en enlaces sospechosos</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>5. Realizar copias de seguridad periódicas</Text>
        </View>
      </View>
      
      <Button title="Volver" color="#4682B4" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 2,
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "justify",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  list: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    color: "#FF6347",
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
});

export default Pagina;
