import { StyleSheet, Text, View } from "react-native";
export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About App👤</Text>
      <Text style={styles.subText}>...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    marginTop: 10,
    color: "#666",
    fontStyle: "italic",
  },
});
