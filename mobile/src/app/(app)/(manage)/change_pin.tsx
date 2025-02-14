import { View, Text, TextInput } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
export default function ChangePin() {
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
            <Text className="text-xl font-AlexandriaLight">Change PIN</Text>
          </View>

          <View className="w-full px-5 mt-10">
            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">Card PIN</Text>

              <TextInput
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                placeholder="PIN"
              />

              <Text className="text-sm mt-3 font-AlexandriaLight text-[#8F8F8F]">
                Choose only four (4) numbers
              </Text>
            </View>

            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">
                Retype Card PIN
              </Text>

              <TextInput
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                placeholder="PIN"
              />
            </View>
          </View>
        </View>

        <View className="w-full  items-center justify-center">
          <View className="w-[90%]">
            <Button title="Change PIN" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
