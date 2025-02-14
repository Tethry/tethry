import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackIcon from "@/src/components/icons/BackIcon";
import BackTab from "@/src/components/ui/BackTab";
import UserOutlineIcon from "@/src/components/icons/UserOutlineIcon";
import { ethers } from "ethers";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import { useAuth } from "@/src/contexts/auth";
import { fundCard } from "@/src/utils/card/fundCard";
import { formatBigInt } from "@/src/utils/contract/getUserBalance";
import { useCardOrder } from "@/src/contexts/cardOrder";
import { TOKEN_DECIMALS } from "@/src/config/contract/contractConfig";

export default function EnterFundAmount() {
  const [receiver, setReceiver] = useState("@collinsadi");
  const [amount, setAmount] = useState("");
  const { balance } = useAuth();
  const parsedBalance = parseFloat(balance) / 10 ** TOKEN_DECIMALS;
  const { setFundAmount } = useCardOrder();

  const maskAddress = (address: string) => {
    const isAddress = ethers.isAddress(address);
    if (!isAddress) return address;

    return `${address.slice(0, 10)}...${address.slice(-4)}`;
  };

  const handleAmountChange = (text: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = text.replace(/[^0-9.]/g, "");

    if (numericValue.startsWith(".")) {
      setAmount("0" + numericValue);
      return;
    }

    // Check for empty input
    // if (text.length < 2) {
    //   setAmount("");
    //   return;
    // }

    // Ensure only one decimal point and limit to 2 decimal places
    const parts = numericValue.split(".");
    if (parts.length > 2) {
      // If multiple dots, keep only first decimal portion
      const sanitizedValue = parts[0] + "." + parts[1].slice(0, 2);
      setAmount(sanitizedValue);
      return;
    }

    // If there's a decimal point, limit to 2 decimal places
    if (parts.length === 2) {
      const sanitizedValue = parts[0] + "." + parts[1].slice(0, 2);
      setAmount(sanitizedValue);
      return;
    }

    setAmount(numericValue);
  };

  const handleConfirmTransfer = () => {
    setFundAmount(amount);
    router.push("/(app)/(card)/funding_enter_password");
  };

  return (
    <StyledSafeView>
      <View className="w-full flex-1 justify-between pb-10">
        <View className="w-full">
          <View className="w-full">
            <View className="w-full flex-row items-center gap-2">
              <View className="w-[30px] mt-3 mr-3">
                <BackTab />
              </View>
              <Text className="text-xl font-AlexandriaLight">Fund Card</Text>
            </View>
          </View>

          <View className="w-full px-5 mt-5">
            <View className="w-full items-center justify-center mt-20 h-[200px] ">
              <View className="w-full my-10">
                <TextInput
                  placeholder="0"
                  placeholderTextColor="#8F8F8F"
                  className=" font-AlexandriaBold text-black text-center  w-fit"
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                  style={{ fontSize: 50 }}
                  maxLength={8}
                />
              </View>

              <View className="w-full mt-10 flex-row items-center justify-between">
                <View>
                  <Text className="text-lgs font-AlexandriaRegular text-[#8F8F8F]">
                    Available: {formatBigInt(balance)}
                  </Text>
                </View>

                <View className="border border-[#0000B9] rounded-full px-5 py-2">
                  <Text>Max</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full px-5 mt-5 items-center justify-center">
          <View className="w-[90%]">
            <Button
              title="Continue"
              onPress={handleConfirmTransfer}
              disabled={amount === "" || parseFloat(amount) === 0 || parseFloat(amount) > parsedBalance}
            />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
