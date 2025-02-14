import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  Keyboard,
} from "react-native";
import BackTab from "../../../components/ui/BackTab";
import Loading from "@/src/components/ui/Loading";
import { router } from "expo-router";
import { useRef, useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { useReceiveCard } from "@/src/contexts/receiveCard";
import { useAuth } from "@/src/contexts/auth";

import { API_URL } from "@/src/config/apiConfig";
import { decrypt } from "@/src/utils/encryptionUtils";

export default function ReceiveCardEnterPin() {
  const { cardId, amount } = useReceiveCard();
  const { token } = useAuth();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState<null | string>(null);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, "");

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = numericText;
    setOtp(newOtp);

    // If user entered a number and this isn't the last input, focus next
    if (numericText && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // If it's the last input and a number was entered, verify OTP
    if (index === 3 && numericText) {
      verifyOTP(newOtp.join(""));
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    // If backspace is pressed and current input is empty, focus previous
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyOTP = async (otpString: string) => {
    setError(null);
    Keyboard.dismiss();
    setIsLoading(true);

    const response = await fetch(`${API_URL}/card/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cardId, pin: otpString, amount }),
    });

    const data = await response.json();

    setIsLoading(false);

    console.log(data);

    if (!data.status) {
      setError(data.message);
    } else {
      router.replace("/(app)/(receive)/receive_card_success");
    }
  };

  return (
    <>
      <StyledSafeView>
        {isLoading && <Loading />}
        <View className="w-full">
          <View className="w-full">
            <BackTab />
          </View>

          <View className="w-full px-5 items-center justify-center">
            <Image
              source={require("@/assets/images/password_request_icon.png")}
            />
          </View>

          <View className="w-full px-5 mt-10">
            <Text className="text-2xl text-center font-AlexandriaBold text-black">
              Enter Card PIN
            </Text>
          </View>
          <View className="w-full px-5 mt-10"></View>

          <View className="w-full px-5 mt-10 flex-row justify-around">
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                placeholder="*"
                placeholderTextColor="#8F8F8F"
                className="bg-[#F5F5F5] rounded-lg text-4xl font-AlexandriaBold w-[15%] h-[60px]"
                keyboardType="numeric"
                maxLength={1}
                value={otp[index]}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                secureTextEntry={true}
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  includeFontPadding: false,
                  padding: 0,
                }}
              />
            ))}
          </View>

          <View className="w-full px-5 mt-5">
            {error && (
              <Text className="text-red-500 text-md font-AlexandriaRegular">
                {error}
              </Text>
            )}
          </View>
        </View>
      </StyledSafeView>
    </>
  );
}
