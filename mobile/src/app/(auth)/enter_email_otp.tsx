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
import BackTab from "../../components/ui/BackTab";
import Loading from "@/src/components/ui/Loading";
import { router } from "expo-router";
import { useRef, useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { useGlobal } from "../../contexts/globals";
import { API_URL } from "@/src/config/apiConfig";
import { decrypt } from "@/src/utils/encryptionUtils";

export default function EnterEmailOTP() {
  const { email, setWalletAddress, setPrivateKey, setJwtToken } = useGlobal();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState<null | string>(null);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
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
    if (numericText && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    // If it's the last input and a number was entered, verify OTP
    if (index === 5 && numericText) {
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
    console.log("Verifying OTP:", otpString);
    Keyboard.dismiss();
    setIsLoading(true);

    const response = await fetch(`${API_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: otpString }),
    });

    const data = await response.json();

    setIsLoading(false);

    console.log(data);

    if (!data.status) {
      setError(data.message);
    } else {
      const isNewUser = data.newUser;

      const decryptedPrivateKey = decrypt(
        data.wallet.privateKey,
        process.env.EXPO_PUBLIC_ENCRYPTION_KEY || ""
      );

      setWalletAddress(data.wallet.walletAddress);
      setPrivateKey(decryptedPrivateKey || "");
      setJwtToken(data.token);
      // router.push(isNewUser ? "/(auth)/new_wallet_created" : "/(auth)/wallet");

      router.replace("/(auth)/new_wallet_created");
    }

    // Your OTP verification logic here
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
              source={require("../../../assets/images/Mail.png")}
              className="w-[120px] h-[95px]"
            />
          </View>

          <View className="w-full px-5 mt-10">
            <Text className="text-2xl text-center font-AlexandriaBold text-black">
              Please enter the code sent to
            </Text>

            <Text className="text-xl text-center font-AlexandriaRegular mt-5 text-[#8F8F8F]">
              {email || ""}
            </Text>
          </View>
          <View className="w-full px-5 mt-10">
            <Pressable onPress={() => router.back()}>
              <Text className="text-md text-center underline font-AlexandriaBold text-[#8080DC]">
                Change email
              </Text>
            </Pressable>
          </View>

          <View className="w-full px-5 mt-10 flex-row justify-around">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                placeholder="-"
                placeholderTextColor="#8F8F8F"
                className="bg-[#F5F5F5] rounded-lg text-4xl font-AlexandriaBold w-[15%] h-[60px]"
                keyboardType="numeric"
                maxLength={1}
                value={otp[index]}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
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
