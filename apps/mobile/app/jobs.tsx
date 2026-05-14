import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const jobs = [
  { id: "BK-1048", address: "214 Pine Street, Brooklyn", status: "Assigned", time: "09:30", pay: "$180" },
  { id: "BK-1049", address: "88 Market Avenue, Jersey City", status: "In Progress", time: "13:00", pay: "$95" }
];

export default function JobsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Technician app</Text>
      <Text style={styles.title}>Assigned jobs</Text>
      {jobs.map((job) => (
        <View key={job.id} style={styles.card}>
          <Text style={styles.job}>{job.id}</Text>
          <Text style={styles.meta}>{job.address}</Text>
          <Text style={styles.meta}>{job.time} · {job.status} · {job.pay}</Text>
          <View style={styles.actions}>
            <Pressable style={styles.secondary} onPress={() => Linking.openURL("https://maps.google.com")}>
              <Text style={styles.secondaryText}>Navigate</Text>
            </Pressable>
            <Pressable style={styles.primary}><Text style={styles.primaryText}>Update</Text></Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, gap: 14 },
  eyebrow: { color: "#06B6D4", fontWeight: "800" },
  title: { fontSize: 34, fontWeight: "900", color: "#0F172A" },
  card: { padding: 16, borderRadius: 18, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", gap: 8 },
  job: { fontWeight: "900", fontSize: 18 },
  meta: { color: "#64748B", fontWeight: "600" },
  actions: { flexDirection: "row", gap: 10, marginTop: 8 },
  primary: { flex: 1, height: 44, borderRadius: 14, backgroundColor: "#0F172A", alignItems: "center", justifyContent: "center" },
  primaryText: { color: "#FFFFFF", fontWeight: "900" },
  secondary: { flex: 1, height: 44, borderRadius: 14, backgroundColor: "#ECFEFF", alignItems: "center", justifyContent: "center" },
  secondaryText: { color: "#0891B2", fontWeight: "900" }
});
