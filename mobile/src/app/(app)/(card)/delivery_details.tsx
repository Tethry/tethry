import { View, Text, TextInput } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import { useCardOrder } from "@/src/contexts/cardOrder";
import { useAuth } from "@/src/contexts/auth";
import { TOKEN_DECIMALS } from "@/src/config/contract/contractConfig";

export default function DeliveryDetails() {
  const { fullName, address, city, state, country } = useCardOrder();
  const { balance } = useAuth();
  const parsedBalance = parseFloat(balance) / 10 ** TOKEN_DECIMALS;
  const handleContinue = () => {
    router.replace("/(app)/(card)/card_order_password_confirmation");
  };

  const getDisabled = () => {
    return parsedBalance < 10;
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
              Delivery details
            </Text>
          </View>

          <View className="w-full px-5 mt-5">
            <View className="w-full border-2 border-[#B4B4B4] bg-[#F5F5F5] p-4 rounded-lg my-5">
              <View className="w-full flex-row justify-between mb-2">
                <Text className="text-xl font-AlexandriaLight">
                  Card Number
                </Text>
                <Text className="text-xl font-AlexandriaMedium">
                  ************
                </Text>
              </View>

              <View className="w-full flex-row justify-between my-2">
                <Text className="text-xl font-AlexandriaLight">
                  Card holder name
                </Text>
                <Text className="text-xl font-AlexandriaMedium">
                  {fullName}
                </Text>
              </View>

              <View className="w-full flex-row justify-between mt-2">
                <Text className="text-xl font-AlexandriaLight">
                  Valid until
                </Text>
                <Text className="text-xl font-AlexandriaMedium">00/00</Text>
              </View>
            </View>

            <View className="w-full border-2 border-[#B4B4B4] bg-[#F5F5F5] p-4 rounded-lg my-5">
              <View className="w-full flex-row justify-between mb-2">
                <Text className="text-xl font-AlexandriaLight">Country</Text>
                <Text className="text-xl font-AlexandriaMedium">{country}</Text>
              </View>

              <View className="w-full flex-row justify-between my-2">
                <Text className="text-xl font-AlexandriaLight">State</Text>
                <Text className="text-xl font-AlexandriaMedium">{state}</Text>
              </View>

              <View className="w-full flex-row justify-between my-2">
                <Text className="text-xl font-AlexandriaLight">City</Text>
                <Text className="text-xl font-AlexandriaMedium">{city}</Text>
              </View>

              <View className="w-full flex-row justify-between mt-2">
                <Text className="text-xl font-AlexandriaLight">Address</Text>
                <Text className="text-xl font-AlexandriaMedium max-w-[200px]">
                  {address}
                </Text>
              </View>
            </View>

            <View className="w-full border-2 border-[#B4B4B4] bg-[#F5F5F5] p-4 rounded-lg my-5">
              <View className="w-full flex-row justify-between mb-2">
                <Text className="text-xl font-AlexandriaLight">
                  Card selection
                </Text>
                <Text className="text-xl font-AlexandriaMedium">Default</Text>
              </View>

              <View className="w-full flex-row justify-between my-2">
                <Text className="text-xl font-AlexandriaLight">
                  Delivery fee
                </Text>
                <Text className="text-xl font-AlexandriaMedium">$8.9</Text>
              </View>

              <View className="w-full flex-row justify-between mt-2">
                <Text className="text-xl font-AlexandriaLight">
                  Design charge
                </Text>
                <Text className="text-xl font-AlexandriaMedium max-w-[200px]">
                  $1.0
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full  items-center justify-center">
          <View className="w-[90%]">
            <Button
              disabled={getDisabled()}
              title="Pay $9.9"
              onPress={handleContinue}
            />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
