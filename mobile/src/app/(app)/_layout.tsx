import { Stack } from "expo-router";

export default function AppEntry() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(transfer)" options={{ headerShown: false }} />
      <Stack.Screen name="(requests)" options={{ headerShown: false }} />
      <Stack.Screen name="(receive)" options={{ headerShown: false }} />
      <Stack.Screen name="(card)" options={{ headerShown: false }} />
      <Stack.Screen name="(manage)" options={{ headerShown: false }} />
    </Stack>
  );
}
