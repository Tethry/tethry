import { Stack } from "expo-router";
import { ReceiveCardProvider } from "../../../contexts/receiveCard";

export default function AppEntry() {
  return (
    <ReceiveCardProvider>
      <Stack>
        <Stack.Screen name="receive" options={{ headerShown: false }} />
        <Stack.Screen
          name="receive_external"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="receive_card" options={{ headerShown: false }} />
        <Stack.Screen
          name="receive_card_preview"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="receive_card_enter_pin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="receive_card_success"
          options={{ headerShown: false }}
        />
      </Stack>
    </ReceiveCardProvider>
  );
}
