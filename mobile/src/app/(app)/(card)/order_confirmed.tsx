import { View, Text, Image } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import { useCardOrder } from "@/src/contexts/cardOrder";

export default function OrderConfirmed() {
  const { orderId, estimatedDelivery } = useCardOrder();

  const handleContinue = () => {
    router.replace("/(app)/(tabs)/cards");
  };

  const formattedEstimatedDelivery = new Date(estimatedDelivery).toLocaleDateString();

  return (
    <StyledSafeView>
      <View className="w-full flex-1 justify-between pb-5">
        <View className="w-full px-5">
          <View
            className="w-full items-center justify-center"
            style={{ marginTop: 100 }}
          >
            <Image
              source={require("@/assets/images/transaction_success.png")}
              className="w-[100px] h-[100px]"
            />
          </View>

          <View className="w-full items-center justify-center mt-5">
            <Text className="text-xl font-AlexandriaMedium">
              Order confirmed!
            </Text>
          </View>

          <View
            className="w-full items-center justify-center"
            style={{ marginTop: 15, paddingHorizontal: 25 }}
          >
            <Text className="text-xl font-AlexandriaMedium text-center text-[#8F8F8F]">
              Your card is on it way
            </Text>
          </View>

          <View className="w-full border-2 border-[#B4B4B4] bg-[#F5F5F5] p-4 rounded-lg my-5">
            <View className="w-full flex-row justify-between mb-2">
              <Text className="text-xl font-AlexandriaLight">Order ID</Text>
              <Text className="text-xl font-AlexandriaMedium uppercase">
                {orderId}
              </Text>
            </View>

            <View className="w-full flex-row justify-between mt-5">
              <Text className="text-xl font-AlexandriaLight">Order Date</Text>
              <Text className="text-xl font-AlexandriaMedium">
                {new Date().toLocaleDateString()}
              </Text>
            </View>

            <View className="w-full flex-row justify-between mt-5">
              <Text className="text-xl font-AlexandriaLight">
                Estimated Delivery
              </Text>
              <Text className="text-xl font-AlexandriaMedium">
                {formattedEstimatedDelivery}
              </Text>
            </View>
          </View>
        </View>

        <View
          className="w-full items-center justify-center"
          style={{ marginTop: 30 }}
        >
          <View className="w-[90%]">
            <Button title="Proceed" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
