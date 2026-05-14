import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#06B6D4", headerStyle: { backgroundColor: "#0F172A" }, headerTintColor: "#FFFFFF" }}>
      <Tabs.Screen name="index" options={{ title: "Book", tabBarIcon: ({ color }) => <Feather name="calendar" color={color} size={20} /> }} />
      <Tabs.Screen name="jobs" options={{ title: "Jobs", tabBarIcon: ({ color }) => <Feather name="tool" color={color} size={20} /> }} />
      <Tabs.Screen name="chat" options={{ title: "Chat", tabBarIcon: ({ color }) => <Feather name="message-circle" color={color} size={20} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <Feather name="user" color={color} size={20} /> }} />
    </Tabs>
  );
}
