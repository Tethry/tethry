import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import Loading from "@/src/components/ui/Loading";
import { activateCard } from "@/src/utils/card/activateCard";
import { useAuth } from "@/src/contexts/auth";

export default function ActivateCard() {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  const handleContinue = async () => {
    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const response = await activateCard(cardNumber, pin, token);

      if (response.status) {
        router.push("/(app)/(card)/activate_card_success");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }

    // router.push("/(app)/(card)/activate_card_success");
  };

  const getDisabled = () => {
    return !cardNumber || !pin || !confirmPin;
  };

  return (
    <StyledSafeView>
      {loading && <Loading />}

      <View className="w-full flex-1 justify-between pb-5">
        <View className="w-full">
          {/* Back Tab */}
          <View className="w-full flex-row items-center gap-2">
            <View className="w-[30px] mt-3 mr-3">
              <BackTab />
            </View>
            <Text className="text-xl font-AlexandriaLight">Activate Card</Text>
          </View>

          <View className="w-full px-5 mt-10">
            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">
                Enter card number
              </Text>

              <TextInput
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                placeholder="Card number"
                value={cardNumber}
                onChangeText={setCardNumber}
              />

              <Text className="text-sm mt-3 font-AlexandriaLight text-[#8F8F8F]">
                16 digit card number at the back
              </Text>
            </View>

            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">Card PIN</Text>

              <TextInput
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                placeholder="PIN"
                keyboardType="numeric"
                maxLength={4}
                value={pin}
                onChangeText={setPin}
                secureTextEntry={true}
              />

              <Text className="text-sm mt-3 font-AlexandriaLight text-[#8F8F8F]">
                Choose only four (4) numbers
              </Text>
            </View>

            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">
                Confirm Card PIN
              </Text>

              <TextInput
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                placeholder="Confirm PIN"
                keyboardType="numeric"
                maxLength={4}
                value={confirmPin}
                onChangeText={setConfirmPin}
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>

        <View className="w-full  items-center justify-center">
          <View className="w-[90%]">
            <Button
              title="Set PIN"
              disabled={getDisabled()}
              onPress={handleContinue}
            />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
