import { View, Text, Image } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";

export default function TransferSuccess() {
  const handleContinue = () => {
    router.replace("/(app)/(tabs)");
  };

  return (
    <StyledSafeView>
      <View className="w-full flex-1">
        <View
          className="w-full items-center justify-center"
          style={{ marginTop: 100 }}
        >
          <Image
            source={require("@/assets/images/transaction_success.png")}
            className="w-[100px] h-[100px]"
          />
        </View>

        <View className="w-full items-center justify-center">
          <Text className="text-2xl font-AlexandriaBold">Payment Sent</Text>
        </View>

        <View
          className="w-full items-center justify-center"
          style={{ marginTop: 15, paddingHorizontal: 25 }}
        >
          <Text className="text-xl font-AlexandriaMedium text-center text-[#8F8F8F]">
            A confirmation mail will be sent to you when payment is complete
          </Text>
        </View>

        <View
          className="w-full items-center justify-center"
          style={{ marginTop: 30 }}
        >
          <View className="w-[90%]">
            <Button title="Done" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
