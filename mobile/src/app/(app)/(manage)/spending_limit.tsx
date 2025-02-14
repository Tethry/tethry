import { View, Text, TextInput } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";

export default function SpendingLimit() {
  const handleContinue = () => {
    router.push("/(app)/(card)/activate_card_success");
  };
  return (
    <StyledSafeView>
      <View className="w-full flex-1 justify-between pb-5">
        <View className="w-full">
          {/* Back Tab */}
          <View className="w-full flex-row items-center gap-2">
            <View className="w-[30px] mt-3 mr-3">
              <BackTab />
            </View>
            <Text className="text-xl font-AlexandriaLight">
              Spending Limits
            </Text>
          </View>

          <View className="w-full px-5 mt-10">
            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">
                Daily Limit (USDT)
              </Text>

              <TextInput
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                placeholder="500"
              />

              <Text className="text-sm mt-3 font-AlexandriaLight text-[#8F8F8F]">
                Resets at midnight (UTC)
              </Text>
            </View>

            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">
                Monthly Limit (USDT)
              </Text>

              <TextInput
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                placeholder="5000"
              />

              <Text className="text-sm mt-3 font-AlexandriaLight text-[#8F8F8F]">
                Resets at midnight on the first of each month
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full  items-center justify-center">
          <View className="w-[90%]">
            <Button title="Save Limits" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
