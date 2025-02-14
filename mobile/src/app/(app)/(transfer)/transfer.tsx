import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { router } from "expo-router";
import BackTab from "@/src/components/ui/BackTab";
import EthereumSvgIcon from "@/src/components/icons/EthereumSvgIcon";
import Button from "@/src/components/ui/Button";
import { ethers } from "ethers";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Loading from "@/src/components/ui/Loading";
import { useTransfer } from "@/src/contexts/transfer";
import { checkTag } from "@/src/utils/transfer/checkTag";
import { useAuth } from "@/src/contexts/auth";
import { CHAIN_NAME } from "@/src/config/app/appConfig";

export default function Transfer() {
  // const [transferTag, setTransferTag] = useState("");
  // const [address, setAddress] = useState("");
  const [activeTab, setActiveTab] = useState("transferTag");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { transferTag, setTransferTag, address, setAddress, setMethod } =
    useTransfer();
  const { token } = useAuth();
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getDisabled = () => {
    if (activeTab === "transferTag") {
      return transferTag.length === 0;
    } else {
      return !ethers.isAddress(address);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    setError("");

    if (activeTab === "transferTag") {
      try {
        const response = await checkTag(transferTag, token);
        if (!response.status) {
          setError(response.message);
        } else {
          router.push("/(app)/(transfer)/transfer_confirm");
          setMethod("transferTag");
          setAddress(response.address);
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      router.push("/(app)/(transfer)/transfer_confirm");
      setMethod("address");
      setLoading(false);
    }
  };

  return (
    <StyledSafeView>
      {loading && <Loading />}
      <View className="w-full flex-1 justify-between pb-10">
        <View className="w-full">
          <View className="w-full flex-row items-center gap-2">
            <View className="w-[30px] mt-3 mr-3">
              <BackTab />
            </View>
            <Text className="text-xl font-AlexandriaLight">Transfer USDT</Text>
          </View>

          <View className="w-full flex-1 px-5 mt-10">
            <View className="w-full bg-gray-200   rounded-lg flex-row items-center justify-between p-2">
              <TouchableOpacity
                onPress={() => handleTabChange("address")}
                className={`flex-row items-center justify-center gap-2 w-[50%] ${
                  activeTab === "address" ? "bg-[#0000B9]" : "bg-gray-200"
                } py-3 rounded-xl`}
              >
                <EthereumSvgIcon
                  color={activeTab === "address" ? "#fff" : "#8F8F8F"}
                  fill={activeTab === "address" ? "#fff" : "#8F8F8F"}
                />

                <Text
                  className={`text-xl font-AlexandriaMedium ${
                    activeTab === "address" ? "text-white" : "text-[#8F8F8F]"
                  }`}
                >
                  Address
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange("transferTag")}
                className={`flex-row items-center justify-center gap-2 w-[50%] ${
                  activeTab === "transferTag" ? "bg-[#0000B9]" : "bg-gray-200"
                } py-3 rounded-xl`}
              >
                <Image
                  source={require("../../../../assets/images/Transfer USDT - Tap/icon/at.png")}
                  className="w-[20px] h-[20px]"
                />

                <Text
                  className={`text-xl font-AlexandriaMedium ${
                    activeTab === "transferTag"
                      ? "text-white"
                      : "text-[#8F8F8F]"
                  }`}
                >
                  Transfer Tag
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Input */}

          <View className="w-full flex-1 px-5 mt-5">
            <View className="w-full bg-[#F5F5F5] rounded-lg">
              {activeTab === "transferTag" ? (
                <TextInput
                  placeholder="Paste Transfer Tag"
                  placeholderTextColor="#8F8F8F"
                  className="text-xl font-AlexandriaMedium text-black w-full p-4"
                  value={transferTag}
                  onChangeText={setTransferTag}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                />
              ) : (
                <TextInput
                  placeholder="Paste Address"
                  placeholderTextColor="#8F8F8F"
                  className="text-xl font-AlexandriaMedium text-black w-full p-4"
                  value={address}
                  onChangeText={setAddress}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                />
              )}
            </View>

            {activeTab === "address" && (
              <View className="w-full mt-10 bg-orange-100 rounded-lg p-5">
                <View className="flex-row items-center gap-2">
                  <FontAwesome5
                    name="exclamation-circle"
                    size={24}
                    color="black"
                  />

                  <Text className="text-xl font-AlexandriaBold">Important</Text>
                </View>
                <View className="ml-2" style={{ paddingLeft: 25 }}>
                  <Text className="mt-2 font-AlexandriaRegular">
                    USDT will be sent on the {CHAIN_NAME} network.
                  </Text>
                </View>
              </View>
            )}

            {error && (
              <View className="w-full mt-10 bg-red-200 rounded-lg p-5">
                <View className="flex-row items-center gap-2">
                  <FontAwesome5
                    name="exclamation-triangle"
                    size={24}
                    color="black"
                  />

                  <Text className="text-xl font-AlexandriaBold">Oops</Text>
                </View>
                <View className="ml-2" style={{ paddingLeft: 25 }}>
                  <Text className="mt-2 font-AlexandriaRegular">{error}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View className="w-full px-5 items-center justify-center">
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
