import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const services = ["AC Installation", "Maintenance", "Gas Refill", "Cleaning", "Diagnostics", "Relocation", "Repair"];
const slots = ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00"];

export default function BookingScreen() {
  const [service, setService] = useState(services[0]);
  const [slot, setSlot] = useState(slots[1]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Customer app</Text>
      <Text style={styles.title}>Book HVAC service</Text>
      <Text style={styles.label}>Service</Text>
      <View style={styles.wrap}>
        {services.map((item) => (
          <Pressable key={item} style={[styles.pill, service === item && styles.selected]} onPress={() => setService(item)}>
            <Text style={[styles.pillText, service === item && styles.selectedText]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Live time slots</Text>
      <View style={styles.grid}>
        {slots.map((item) => (
          <Pressable key={item} style={[styles.slot, slot === item && styles.selected]} onPress={() => setSlot(item)}>
            <Text style={[styles.pillText, slot === item && styles.selectedText]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} placeholder="Street, apartment, city" placeholderTextColor="#94A3B8" />
      <Pressable style={styles.button}><Text style={styles.buttonText}>Confirm booking</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, gap: 14 },
  eyebrow: { color: "#06B6D4", fontWeight: "800" },
  title: { fontSize: 34, fontWeight: "900", color: "#0F172A" },
  label: { marginTop: 10, fontWeight: "800", color: "#334155" },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { borderRadius: 16, borderWidth: 1, borderColor: "#CBD5E1", paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "#FFFFFF" },
  slot: { width: "30%", borderRadius: 16, borderWidth: 1, borderColor: "#A7F3D0", paddingVertical: 14, alignItems: "center", backgroundColor: "#ECFDF5" },
  selected: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  pillText: { fontWeight: "800", color: "#334155" },
  selectedText: { color: "#FFFFFF" },
  input: { height: 52, borderRadius: 16, borderWidth: 1, borderColor: "#CBD5E1", backgroundColor: "#FFFFFF", paddingHorizontal: 14 },
  button: { height: 54, borderRadius: 18, backgroundColor: "#06B6D4", alignItems: "center", justifyContent: "center", marginTop: 8 },
  buttonText: { color: "#0F172A", fontWeight: "900" }
});
