import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Voice from "react-native-voice";
import client from "../api/client";

export default function PracticeScreen() {
  const [question, setQuestion] = useState("Tell me about your strengths.");
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");

  Voice.onSpeechResults = (event) => {
    setTranscript(event.value?.[0] || "");
  };

  const startListening = async () => {
    await Voice.start("en-US");
  };

  const analyze = async () => {
    const { data } = await client.post("/interview/evaluate", { question, transcript });
    setFeedback(JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interview Practice</Text>
      <TextInput style={styles.input} value={question} onChangeText={setQuestion} />
      <Pressable style={styles.button} onPress={startListening}><Text style={styles.buttonText}>Record Voice</Text></Pressable>
      <TextInput style={[styles.input, { height: 120 }]} multiline value={transcript} onChangeText={setTranscript} />
      <Pressable style={styles.button} onPress={analyze}><Text style={styles.buttonText}>Analyze</Text></Pressable>
      <Text>{feedback}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  input: { backgroundColor: "white", borderRadius: 10, padding: 10, marginBottom: 10 },
  button: { backgroundColor: "#265de3", padding: 12, borderRadius: 10, marginBottom: 10 },
  buttonText: { color: "white", textAlign: "center" },
});
