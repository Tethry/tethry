import { View, Text, Image } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
export default function ActivateCardSuccess() {
  const handleContinue = () => {
    router.replace("/(app)/(tabs)/cards");
  };
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
            <Text className="text-xl font-AlexandriaMedium">Ready to go!</Text>
          </View>

          <View
            className="w-full items-center justify-center"
            style={{ marginTop: 15, paddingHorizontal: 25 }}
          >
            <Text className="text-xl font-AlexandriaMedium text-center text-[#8F8F8F]">
              Your card has been activated successfully
            </Text>
          </View>

          {/* <View className="w-full border-2 border-[#B4B4B4] bg-[#F5F5F5] p-4 rounded-lg mt-10">
            <View className="w-full flex-row justify-between mb-2 ">
              <Text className="text-xl font-AlexandriaLight">Status</Text>
              <Text className="text-xl font-AlexandriaMedium text-green-500">
                Active
              </Text>
            </View>

            <View className="w-full flex-row justify-between mt-5">
              <Text className="text-xl font-AlexandriaLight">Card number</Text>
              <Text className="text-xl font-AlexandriaMedium">*** 2233</Text>
            </View>
          </View> */}
        </View>

        <View
          className="w-full items-center justify-center"
          style={{ marginTop: 30 }}
        >
          <View className="w-[90%]">
            <Button title="Start using card" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
