import { View, Text, TextInput } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import { useCardOrder } from "@/src/contexts/cardOrder";

export default function ShippingDetails() {
  const {
    fullName,
    setFullName,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    country,
    setCountry,
  } = useCardOrder();

  const handleContinue = () => {
    router.push("/(app)/(card)/delivery_details");
  };

  const getDisabled = () => {
    return (
      fullName === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      country === ""
    );
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
              Shipping Address
            </Text>
          </View>

          <View className="w-full px-5 mt-10">
            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">Full Name</Text>

              <TextInput
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
              />
            </View>

            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">
                Home address
              </Text>

              <TextInput
                value={address}
                onChangeText={setAddress}
                autoCapitalize="words"
                autoCorrect={false}
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
              />
            </View>

            <View className="w-full my-3 flex-row justify-between">
              <View className="w-[45%]">
                <Text className="text-xl font-AlexandriaMedium">State</Text>

                <TextInput
                  value={state}
                  onChangeText={setState}
                  autoCapitalize="words"
                  autoCorrect={false}
                  className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                />
              </View>

              <View className="w-[45%]">
                <Text className="text-xl font-AlexandriaMedium">City</Text>

                <TextInput
                  value={city}
                  onChangeText={setCity}
                  autoCapitalize="words"
                  autoCorrect={false}
                  className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
                />
              </View>
            </View>

            <View className="w-full my-3">
              <Text className="text-xl font-AlexandriaMedium">Country</Text>

              <TextInput
                value={country}
                onChangeText={setCountry}
                autoCapitalize="words"
                autoCorrect={false}
                className="w-full  bg-[#F5F5F5] rounded-lg p-5 text-xl font-AlexandriaLight mt-3"
              />
            </View>
          </View>
        </View>

        <View className="w-full  items-center justify-center">
          <View className="w-[90%]">
            <Button
              disabled={getDisabled()}
              title="Continue"
              onPress={handleContinue}
            />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
