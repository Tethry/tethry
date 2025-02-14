import { View, Text, Image } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import { useReceiveCard } from "@/src/contexts/receiveCard";

export default function ReceiveCardSuccess() {
  const { amount, cardOwner, setAmount, setCardOwner } = useReceiveCard();

  const handleContinue = () => {
    setAmount("");
    setCardOwner("");
    router.replace("/(app)/(tabs)/cards");
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
          <Text className="text-2xl font-AlexandriaBold">Successful!</Text>
        </View>

        <View
          className="w-full items-center justify-center"
          style={{ marginTop: 15, paddingHorizontal: 25 }}
        >
          <Text className="text-xl font-AlexandriaMedium text-center text-[#8F8F8F]">
            {amount} USDT has been received from {cardOwner}
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
