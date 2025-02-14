import { Stack } from "expo-router";

export default function AppEntry() {
  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="enter_email" options={{ headerShown: false }} />
      <Stack.Screen name="enter_email_otp" options={{ headerShown: false }} />
      <Stack.Screen name="new_wallet_created" options={{ headerShown: false }} />
      <Stack.Screen name="enter_new_password" options={{ headerShown: false }} />
      <Stack.Screen name="backup_wallet" options={{ headerShown: false }} />
      <Stack.Screen name="backup_complete" options={{ headerShown: false }} />
      <Stack.Screen name="signature_request" options={{ headerShown: false }} />
      <Stack.Screen name="set_transfer_tag" options={{ headerShown: false }} />
 



      
</Stack>
  );
}
