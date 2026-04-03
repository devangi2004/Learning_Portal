import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartPrep Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable style={styles.button} onPress={() => login(email, password)}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16, backgroundColor: "#f3f5f9" },
  title: { fontSize: 24, marginBottom: 12, fontWeight: "700" },
  input: { backgroundColor: "white", padding: 12, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: "#265de3", padding: 12, borderRadius: 10 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "600" },
});
