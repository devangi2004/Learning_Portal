import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import client from "../api/client";

export default function CodingScreen() {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Solve here");

  const generate = async () => {
    const { data } = await client.post("/coding/problem", { topic: "graphs", difficulty: "hard" });
    setProblem(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Coding Practice</Text>
      <Pressable style={styles.button} onPress={generate}><Text style={styles.buttonText}>Generate</Text></Pressable>
      {problem && (
        <>
          <Text style={styles.heading}>{problem.title}</Text>
          <Text>{problem.problem}</Text>
          <Text>{problem.inputOutput}</Text>
          <Text>{problem.constraints}</Text>
          <TextInput multiline style={styles.editor} value={code} onChangeText={setCode} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  title: { fontSize: 20, fontWeight: "700" },
  heading: { fontSize: 16, fontWeight: "600" },
  button: { backgroundColor: "#265de3", padding: 12, borderRadius: 10 },
  buttonText: { color: "white", textAlign: "center" },
  editor: { minHeight: 180, backgroundColor: "#10131a", color: "#ecf3ff", borderRadius: 10, padding: 10 },
});
