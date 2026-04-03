import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import client from "../api/client";

export default function UploadScreen() {
  const [status, setStatus] = useState("Pick and upload notes");

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"] });
    if (result.canceled) return;

    const file = result.assets[0];
    const formData = new FormData();
    formData.append("note", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    });

    await client.post("/notes/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setStatus("Uploaded successfully");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Notes</Text>
      <Pressable onPress={pickFile} style={styles.button}><Text style={styles.buttonText}>Select file</Text></Pressable>
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  button: { backgroundColor: "#265de3", padding: 12, borderRadius: 10, marginBottom: 10 },
  buttonText: { color: "white", textAlign: "center" },
});
