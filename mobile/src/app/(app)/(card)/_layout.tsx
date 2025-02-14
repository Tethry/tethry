import { Stack } from "expo-router";
import { CardOrderProvider } from "@/src/contexts/cardOrder";

export default function AppEntry() {
  return (
    <CardOrderProvider>
      <Stack>
        <Stack.Screen
          name="shipping_details"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="delivery_details"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="order_confirmed" options={{ headerShown: false }} />
        <Stack.Screen name="activate_card" options={{ headerShown: false }} />
        <Stack.Screen
          name="activate_card_success"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="enter_fund_amount"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="funding_enter_password"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="fund_card_success"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="card_order_password_confirmation"
          options={{ headerShown: false }}
        />
      </Stack>
    </CardOrderProvider>
  );
}
