import { View, Text } from "react-native";

export default function ResultsScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>Results</Text>
      <Text>Review coding performance, interview scores, and progress trends.</Text>
    </View>
  );
}
