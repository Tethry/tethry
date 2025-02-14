import { View, Text, TextInput, Image, Alert, Keyboard } from "react-native";
import React, { useState } from "react";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import BackTab from "@/src/components/ui/BackTab";
import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import { useAuth } from "@/src/contexts/auth";
import { checkPassword } from "@/src/utils/auth/checkPassword";
import { useTransfer } from "@/src/contexts/transfer";
import Loading from "@/src/components/ui/Loading";
import { userSignMessage } from "@/src/utils/transfer/signMessage";
import { decrypt } from "@/src/utils/encryptionUtils";

export default function TransferEnterPassword() {
  const [password, setPassword] = useState("");
  const { token, privateKey, address } = useAuth();
  const { address: recipient, amount, charge, setSignedData } = useTransfer();
  const [loading, setLoading] = useState(false);

  //   const [error, setError] = useState

  const getDisabled = () => {
    return !password;
  };

  const handleContinue = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      setPassword("");
      const response = await checkPassword(password, token);
      console.log(response);
      if (response.status) {
        const signMessage = await userSignMessage(
          decrypt(privateKey, password),
          address,
          recipient,
          amount,
          charge
        );

        setSignedData(signMessage);

        console.log(signMessage);

        router.replace("/(app)/(transfer)/transfer_preview");
      } else {
        //   setError("Invalid password");
        Alert.alert("Invalid password");
      }
    } catch (error) {
      console.log(error);
    } finally {
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
            <Text className="text-xl font-AlexandriaLight">Password</Text>
          </View>

          <View className="w-full items-center justify-center">
            <Image
              source={require("@/assets/images/password_request_icon.png")}
            />
          </View>

          <View className="w-full mt-5 items-center justify-center p-5">
            <View className="mb-5">
              <Text className="text-xl font-AlexandriaBold">
                Enter your password to continue
              </Text>
            </View>

            <View className="w-full bg-[#F5F5F5] rounded-lg border-2 border-[#B4B4B4]">
              <TextInput
                placeholder=""
                placeholderTextColor="#8F8F8F"
                className=" font-AlexandriaMedium text-black w-full text-center"
                style={{ padding: 10, fontSize: 30 }}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="off"
                autoFocus={false}
                keyboardType="default"
                cursorColor="#000"
                onChangeText={(text) => setPassword(text)}
                value={password}
                editable={!loading}
              />
            </View>
          </View>

          <View className="w-full mt-5 items-center justify-center">
            <View className="w-[90%]">
              <Button
                title="Continue"
                disabled={getDisabled()}
                onPress={handleContinue}
              />
            </View>
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
