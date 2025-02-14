import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { router } from "expo-router";
import BackTab from "@/src/components/ui/BackTab";
import Button from "@/src/components/ui/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Loading from "@/src/components/ui/Loading";
import CopyIcon from "@/src/components/icons/CopyIcon";
import { useAuth } from "@/src/contexts/auth";
// import Clipboard from "@react-native-clipboard/clipboard";
import { useReceiveCard } from "../../../contexts/receiveCard";

export default function Receive() {
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("transferTag");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { setAmount, amount } = useReceiveCard();
  const { user } = useAuth();
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getDisabled = () => {
    return !amount;
  };

  const handleContinue = async () => {
    setLoading(true);
    setError("");
    setLoading(false);
    router.push("/(app)/(receive)/receive_card");
  };

  const handleCopy = async () => {
    // Clipboard.setString(user?.wallet?.paymentTag);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
            <Text className="text-xl font-AlexandriaLight">Receive USDT</Text>
          </View>

          <View className="w-full mt-5 px-5">
            <Text className="text-xl font-AlexandriaLight">
              Receiving from an External Wallet?
            </Text>

            <TouchableOpacity
              className="w-full mt-3"
              onPress={() => router.push("/(app)/(receive)/receive_external")}
            >
              <Text className="text-xl font-AlexandriaBold text-[#0000B9]">
                Click here
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full flex-1 px-5 mt-10">
            <View className="w-full bg-gray-200   rounded-lg flex-row items-center justify-between p-2">
              <TouchableOpacity
                onPress={() => handleTabChange("contactless")}
                className={`flex-row items-center justify-center gap-2 w-[50%] ${
                  activeTab === "contactless" ? "bg-[#0000B9]" : "bg-gray-200"
                } py-3 rounded-xl`}
              >
                <FontAwesome6 name="credit-card" size={20} color="white" />

                <Text
                  className={`text-xl font-AlexandriaMedium ${
                    activeTab === "contactless"
                      ? "text-white"
                      : "text-[#8F8F8F]"
                  }`}
                >
                  Card
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
                  Share Tag
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Input */}

          <View
            className="w-full flex-1 mt-5"
            style={{ paddingHorizontal: 20 }}
          >
            <View className="w-full">
              {activeTab === "transferTag" ? (
                <>
                  <View className="w-full bg-[#F5F5F5] rounded-lg flex-row items-center justify-between px-4">
                    <TextInput
                      placeholder="Paste Transfer Tag"
                      placeholderTextColor="#8F8F8F"
                      className="text-xl font-AlexandriaMedium text-black w-[90%] p-4"
                      value={user?.wallet?.paymentTag}
                      editable={false}
                    />

                    <TouchableOpacity onPress={handleCopy}>
                      <CopyIcon />
                    </TouchableOpacity>
                  </View>

                  <View className="w-full mt-10">
                    <Text
                      style={{ fontSize: 20 }}
                      className=" font-AlexandriaLight text-center text-black"
                    >
                      Share your tag with others to receive payments. They can
                      send USDT directly within the app.
                    </Text>
                  </View>
                </>
              ) : (
                <View className="w-full mt-10">
                  <View className="w-full">
                    <TextInput
                      placeholder="0"
                      placeholderTextColor="#8F8F8F"
                      className=" font-AlexandriaBold text-black text-center  w-fit"
                      value={amount ? amount : ""}
                      onChangeText={handleAmountChange}
                      keyboardType="numeric"
                      style={{ fontSize: 55 }}
                      maxLength={8}
                    />
                  </View>

                  {/* <View className="w-full mt-20 bg-[#F5F5F5] rounded-lg p-4 h-[150px]">
                    <TextInput
                      placeholder="Description (optional)"
                      placeholderTextColor="#8F8F8F"
                      className="w-full"
                      style={{
                        fontSize: 20,
                        height: "100%",
                        textAlignVertical: "top",
                      }}
                      multiline={true}
                      maxLength={50}
                      value={description}
                      onChangeText={setDescription}
                    />
                  </View> */}
                </View>
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
                    USDT will be sent on the ARBITRUM network.
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
          {activeTab === "contactless" && (
            <View className="w-[90%]">
              <Button
                disabled={getDisabled()}
                title="Continue"
                onPress={handleContinue}
              />
            </View>
          )}
        </View>
      </View>
    </StyledSafeView>
  );
}
