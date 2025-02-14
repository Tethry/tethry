import { View, Text } from "react-native";
import React from "react";
import Cardsvg from "@/src/components/icons/Cardsvg";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";

export default function WaitingCardState() {
  function handleContinue() {
    router.push("/(app)/(card)/activate_card");
  }
  return (
    <View className="w-full">
      <View style={{ alignItems: "center", gap: 15, paddingBlock: 20 }}>
        <Cardsvg props={{ width: 233, height: 233 }} />
        <View />

        <View className="w-full px-5">
          <Text className="text-2xl font-AlexandriaBold text-center my-5 text-[#8F8F8F]">
            Your card is on it way!
          </Text>
          <Text className="text-xl font-AlexandriaRegular text-center text-[#8F8F8F]">
            Expected time of delivery is 7th January, 2025.
          </Text>
        </View>
      </View>
      <View className="w-full items-center justify-center">
        <View className="w-[90%] items-center justify-center">
          <Button title="Activate Card" onPress={handleContinue} />
        </View>
      </View>
    </View>
  );
}
