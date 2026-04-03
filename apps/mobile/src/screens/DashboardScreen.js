import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import client from "../api/client";

export default function DashboardScreen() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    client.get("/dashboard").then(({ data }) => setStats(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>🔥 Streak: {stats?.streakCount ?? 0}</Text>
      <Text>XP: {stats?.xp ?? 0}</Text>
      <Text>Level: {stats?.level ?? 1}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, fontWeight: "700", marginBottom: 10 } });
