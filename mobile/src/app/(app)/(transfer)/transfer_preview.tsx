import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import TetherLogo from "@/src/components/icons/TetherLogo";
import Button from "@/src/components/ui/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTransfer } from "@/src/contexts/transfer";
import { useAuth } from "@/src/contexts/auth";
import { API_URL } from "@/src/config/apiConfig";
import Loading from "@/src/components/ui/Loading";
import { CHAIN_NAME } from "@/src/config/app/appConfig";

export default function TransferPreview() {
  const { address: recipient, amount, charge, signedData } = useTransfer();
  const { address, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    console.log(signedData);

    try {
      const { signature, message } = signedData;

      const response = await fetch(`${API_URL}/transfer/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ signature, message }),
      });

      const data = await response.json();
      if (data.status) {
        router.push("/(app)/(transfer)/transfer_success");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const maskAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  return (
    <StyledSafeView>
      {loading && <Loading />}
      <View className="w-full flex-1 justify-between pb-10">
        <View className="w-full">
          <View className="w-full">
            <View className="w-full flex-row items-center gap-2">
              <View className="w-[30px] mt-3 mr-3">
                <BackTab />
              </View>
              <Text className="text-xl font-AlexandriaLight">
                Transfer USDT
              </Text>
            </View>
          </View>

          {/* main content */}

          <View className="w-full px-5 mt-5">
            {/* Tether Logo and Amount */}

            <View className="w-full items-center justify-center">
              <TetherLogo />

              <Text className="text-3xl font-AlexandriaBold mt-5">
                {amount || 0} USDT
              </Text>
            </View>

            <View className="w-full px-5" style={{ marginTop: 45 }}>
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-xl font-AlexandriaMedium">From</Text>
                <Text className="text-xl font-AlexandriaRegular">
                  {maskAddress(address)}
                </Text>
              </View>

              <View
                className="w-full flex-row items-center justify-between"
                style={{ marginTop: 25 }}
              >
                <Text className="text-xl font-AlexandriaMedium">To</Text>
                <Text className="text-xl font-AlexandriaRegular">
                  {maskAddress(recipient)}
                </Text>
              </View>

              <View
                className="w-full flex-row items-center justify-between"
                style={{ marginTop: 25 }}
              >
                <View>
                  <Text className="text-xl font-AlexandriaMedium">Network</Text>
                </View>
                <View className=" flex-row items-center gap-2">
                  {/* <Image
                    source={require("@/assets/images/arbitrum_image.png")}
                    className="w-10 h-10"
                  /> */}

                  <Text className="text-xl font-AlexandriaRegular">
                    {CHAIN_NAME}
                  </Text>
                </View>
              </View>

              <View
                className="w-full flex-row items-center justify-between"
                style={{ marginTop: 25 }}
              >
                <View>
                  <Text className="text-xl font-AlexandriaMedium">Fee</Text>
                </View>
                <View className=" flex-row items-center gap-2">
                  <Text className="text-xl font-AlexandriaRegular">
                    {charge} USDT
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full items-center justify-center">
          {/* <View className="w-[90%] my-10 bg-red-200 rounded-lg p-5">
            <View className="flex-row items-center gap-2">
              <FontAwesome5
                name="exclamation-triangle"
                size={24}
                color="black"
              />

              <Text className="text-xl font-AlexandriaBold">Oops</Text>
            </View>
            <View className="ml-2" style={{ paddingLeft: 25 }}>
              <Text className="mt-2 font-AlexandriaRegular">
                Insufficient funds
              </Text>
            </View>
          </View> */}

          <View className="w-[90%]">
            <Button title="Confirm" onPress={handleConfirm} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
