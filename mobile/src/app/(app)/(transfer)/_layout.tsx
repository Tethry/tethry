import { Stack } from "expo-router";
import { TransferProvider } from "@/src/contexts/transfer";

export default function AppEntry() {
  return (
    <TransferProvider>
      <Stack>
        <Stack.Screen name="transfer" options={{ headerShown: false }} />

        <Stack.Screen
          name="transfer_confirm"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="transfer_preview"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="transfer_success"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="transfer_error" options={{ headerShown: false }} />
        <Stack.Screen
          name="transfer_enter_password"
          options={{ headerShown: false }}
        />
      </Stack>
    </TransferProvider>
  );
}
