import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.messages}>
        <Text style={styles.incoming}>Support: Upload a photo of the indoor unit and breaker panel.</Text>
        <Text style={styles.outgoing}>Customer: Sending it now.</Text>
        <Text style={styles.typing}>Admin is typing...</Text>
      </View>
      <View style={styles.composer}>
        <TextInput style={styles.input} placeholder="Message" />
        <Pressable style={styles.send}><Text style={styles.sendText}>Send</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  messages: { flex: 1, padding: 20, gap: 12 },
  incoming: { alignSelf: "flex-start", maxWidth: "82%", borderRadius: 16, backgroundColor: "#FFFFFF", padding: 12, color: "#0F172A" },
  outgoing: { alignSelf: "flex-end", maxWidth: "82%", borderRadius: 16, backgroundColor: "#0F172A", padding: 12, color: "#FFFFFF" },
  typing: { color: "#94A3B8", fontWeight: "700" },
  composer: { flexDirection: "row", gap: 8, padding: 14, borderTopWidth: 1, borderColor: "#E2E8F0", backgroundColor: "#FFFFFF" },
  input: { flex: 1, height: 48, borderRadius: 16, backgroundColor: "#F1F5F9", paddingHorizontal: 14 },
  send: { borderRadius: 16, backgroundColor: "#06B6D4", paddingHorizontal: 16, justifyContent: "center" },
  sendText: { fontWeight: "900", color: "#0F172A" }
});
