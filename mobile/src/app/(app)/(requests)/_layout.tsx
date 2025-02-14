import { Stack } from "expo-router";

export default function AppEntry() {
  return (
    <Stack>
      <Stack.Screen
        name="notification_request"
        options={{ headerShown: false }}
      />

      <Stack.Screen name="password_request" options={{ headerShown: false }} />
    </Stack>
  );
}
