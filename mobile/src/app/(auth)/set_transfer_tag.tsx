import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "@/src/components/ui/Button";
import { useState } from "react";
import { API_URL } from "@/src/config/apiConfig";
import { useGlobal } from "@/src/contexts/globals";
import { router } from "expo-router";

export default function SetTransferTag() {
  const { jwtToken } = useGlobal();
  const [transferTag, setTransferTag] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleContinue = async () => {
    if (transferTag.length > 0) {
      setError(null);

      const response = await fetch(`${API_URL}/auth/set-payment-tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ paymentTag: transferTag.replace(/@/g, "") }),
      });

      const data = await response.json();
      console.log(data);

      if (data.status) {
        router.replace("/");
      } else {
        setError(data.message);
      }
    } else {
      console.log("Transfer tag is empty");
      setError("Transfer tag is empty");
    }
  };

  return (
    <StyledSafeView>
      <View
        style={{ flex: 1, paddingBottom: 25 }}
        className="w-full justify-betwee"
      >
        <View className="w-full">
          <View
            className="w-full flex-row items-center justify-end"
            style={{ marginTop: 10, paddingHorizontal: 20 }}
          >
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="font-AlexandriaBold text-xl text-[#8080DC]">
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20 }} className="mt-10 ">
            <View className="w-full">
              <Text className="text-xl font-AlexandriaBold">
                Set a Transfer tag
              </Text>
              <TextInput
                className="mt-3 bg-[#F5F5F5] rounded-lg p-5   text-2xl placeholder:text-md font-AlexandriaLight"
                placeholder="@me"
                textAlignVertical="center"
                style={{
                  textAlign: "left",
                  textAlignVertical: "center",
                  includeFontPadding: false,
                }}
                onChangeText={setTransferTag}
                value={transferTag}
              />
            </View>

            <View className="mt-5">
              <Text
                style={{ fontSize: 15 }}
                className=" text-[#8F8F8F] font-AlexandriaMedium"
              >
                For easy transactions, take this as your username
              </Text>
            </View>

            <View className="mt-5">
              {error && (
                <Text
                  style={{ fontSize: 15 }}
                  className=" font-AlexandriaMedium text-red-500"
                >
                  {error}
                </Text>
              )}
            </View>
          </View>
        </View>

        <View className="w-full items-center justify-center mt-10">
          <View className="w-[90%]">
            <Button title="Continue" onPress={handleContinue} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
