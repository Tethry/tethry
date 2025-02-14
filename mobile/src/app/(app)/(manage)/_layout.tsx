import { Stack } from "expo-router";

export default function AppEntry() {
  return (
    <Stack>
      <Stack.Screen name="manage" options={{ headerShown: false }} />
      <Stack.Screen name="change_pin" options={{ headerShown: false }} />
      <Stack.Screen name="spending_limit" options={{ headerShown: false }} />
      <Stack.Screen name="delete_card" options={{ headerShown: false }} />
    </Stack>
  );
}
