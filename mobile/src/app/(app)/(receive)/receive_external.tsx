import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAuth } from "@/src/contexts/auth";
import QRCode from "react-native-qrcode-svg";
// import Clipboard from "@react-native-clipboard/clipboard";
import { CHAIN_NAME } from "@/src/config/app/appConfig";

export default function ReceiveExternal() {
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useAuth();
  const handleCopy = async () => {
    // Clipboard.setString(user?.wallet?.walletAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <StyledSafeView>
      <View className="w-full flex-1 justify-between pb-10">
        <View className="w-full">
          <View className="w-full flex-row items-center gap-2">
            <View className="w-[30px] mt-3 mr-3">
              <BackTab />
            </View>
            <Text className="text-xl font-AlexandriaLight">Receive USDT</Text>
          </View>

          {/* Warning message */}

          <View className="w-full px-5 mt-5">
            <View className="w-full bg-orange-100 rounded-lg p-5">
              <View className="flex-row items-center gap-2">
                <FontAwesome5
                  name="exclamation-circle"
                  size={20}
                  color="black"
                />

                <Text className="text-xl font-AlexandriaRegular">
                  Important
                </Text>
              </View>
              <View className="ml-2" style={{ paddingLeft: 25 }}>
                <Text className="mt-2 font-AlexandriaLight">
                  Send only USDT on the {CHAIN_NAME} network to this deposit
                  address to avoid losing your funds
                </Text>
              </View>
            </View>
          </View>

          {/* QR code */}

          <View className="w-full px-5 mt-5 items-center justify-center">
            <View className=" bg-[#F5F5F5] rounded-xl p-5">
              <QRCode value={user?.wallet?.walletAddress} size={150} />
            </View>
          </View>

          {/* Address */}

          <View className="w-full px-5 mt-10">
            <Text className="text-xl font-AlexandriaRegular text-center">
              My USDT Address
            </Text>
            <Text className="text-xl font-AlexandriaLight mt-3 text-center">
              {user?.wallet?.walletAddress}
            </Text>
          </View>

          {/* Copy button */}

          <View className="w-full px-5 mt-10 items-center justify-center">
            <TouchableOpacity
              className="w-full items-center justify-center"
              onPress={handleCopy}
              disabled={isCopied}
            >
              <View className="w-[100px] flex-row items-center justify-center gap-2 bg-[#0000B9] rounded-xl py-4 px-5">
                {!isCopied ? (
                  <FontAwesome6 name="copy" size={24} color="white" />
                ) : (
                  <FontAwesome6 name="check" size={24} color="white" />
                )}
                <Text className="text-xl font-AlexandriaMedium text-white">
                  {isCopied ? "Copied" : "Copy"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
