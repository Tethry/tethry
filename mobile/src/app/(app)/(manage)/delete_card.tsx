import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export default function DeleteCard() {
  const [error, setError] = useState(
    "This action is irreversible. Your remaining balance will be transferred back to your wallet."
  );
  const handleContinue = () => {
    // router.push("/(app)/(card)/activate_card_success");
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
            <Text className="text-xl font-AlexandriaLight">Delete Card</Text>
          </View>

          <View className="w-full mt-10">
            <View className="w-full px-5 justify-between">
              <View className="bg-[#251833] w-full h-[200px] rounded-xl p-5">
                <View className="w-full h-full justify-between">
                  <View className="w-full flex-row items-center justify-end">
                    <View className="w-fit border border-white rounded-full px-2 py-1 flex-row items-center">
                      <View className="mr-2">
                        <Octicons name="dot-fill" size={24} color="green" />
                      </View>
                      <Text className="text-[#F5F5F5] font-AlexandriaRegular">
                        Active
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text className="text-md mb-2 text-white font-AlexandriaMedium">
                      Current Card Balance
                    </Text>

                    <Text className="text-4xl text-white font-AlexandriaBold">
                      $100
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="w-full px-5">
              <View className="w-full mt-10 bg-red-200 rounded-lg p-5">
                <View className="ml-2" style={{ paddingLeft: 25 }}>
                  <Text className="mt-2 font-AlexandriaRegular text-[#E88282]">
                    {error}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full  items-center justify-center">
          <View className="w-[90%]">
            <TouchableOpacity
              onPress={handleContinue}
              activeOpacity={0.8}
              className={` w-full p-5 rounded-full bg-red-500`}
            >
              <Text className="text-white text-2xl font-AlexandriaRegular text-center">
                Delete Card
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
