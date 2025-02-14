import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import TetherLogo from "@/src/components/icons/TetherLogo";
import Button from "@/src/components/ui/Button";
import { Link, router } from "expo-router";
import { useReceiveCard } from "../../../contexts/receiveCard";
import { useAuth } from "@/src/contexts/auth";
import { TOKEN_DECIMALS } from "@/src/config/contract/contractConfig";
import { CHAIN_NAME } from "@/src/config/app/appConfig";

export default function ReceiveCardPreview() {
  const { amount, cardOwner, cardBalance } = useReceiveCard();
  const { user } = useAuth();
  const handleConfirm = () => {
    router.replace("/(app)/(receive)/receive_card_enter_pin");
  };

  const feeDenomination = 10000;
  const feePercentage = 50;

  // calculate 0.05% fee
  const fee = ((amount * feePercentage) / feeDenomination).toFixed(2);

  const parsedBalance = parseFloat(cardBalance) / 10 ** TOKEN_DECIMALS;

  console.log(parsedBalance);

  const getDisabled = () => {
    return parsedBalance < parseFloat(amount) + parseFloat(fee);
  };

  return (
    <StyledSafeView>
      <View className="w-full flex-1 justify-between pb-10">
        <View className="w-full">
          {/* <View className="w-full">
            <View className="w-full flex-row items-center gap-2">
              <View className="w-[30px] mt-3 mr-3">
                <BackTab />
              </View>
              <Text className="text-xl font-AlexandriaLight">Receive USDT</Text>
            </View>
          </View> */}

          {/* main content */}

          <View className="w-full px-5 mt-10">
            {/* Tether Logo and Amount */}

            <View className="w-full items-center justify-center">
              <TetherLogo />

              <Text className="text-3xl font-AlexandriaBold mt-5">
                {amount ? amount : ""}
              </Text>
            </View>

            <View className="w-full px-5" style={{ marginTop: 45 }}>
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-xl font-AlexandriaMedium">From</Text>
                <Text className="text-xl font-AlexandriaRegular">
                  {cardOwner}
                </Text>
              </View>

              <View
                className="w-full flex-row items-center justify-between"
                style={{ marginTop: 25 }}
              >
                <Text className="text-xl font-AlexandriaMedium">To</Text>
                <Text className="text-xl font-AlexandriaRegular">
                  {user?.wallet?.paymentTag}
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
                    {fee} USDT
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
            <Button
              disabled={getDisabled()}
              title="Confirm"
              onPress={handleConfirm}
            />

            <Link
              href="/(app)/(tabs)"
              className={` w-full p-5 rounded-full bg-[#B4B4B4] mt-3`}
            >
              <Text
                className={`"text-[#8F8F8F]" : "text-white"
                } text-2xl font-AlexandriaRegular text-center`}
              >
                Cancel
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
