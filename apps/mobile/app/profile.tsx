import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.name}>AeroFlow User</Text>
        <Text style={styles.meta}>Push notifications enabled</Text>
        <Text style={styles.meta}>Email and phone verification ready</Text>
        <Text style={styles.meta}>Offline booking cache enabled</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC", padding: 20 },
  title: { fontSize: 34, fontWeight: "900", color: "#0F172A" },
  card: { marginTop: 18, padding: 16, borderRadius: 18, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0" },
  name: { fontWeight: "900", fontSize: 20 },
  meta: { marginTop: 8, color: "#64748B", fontWeight: "700" }
});
