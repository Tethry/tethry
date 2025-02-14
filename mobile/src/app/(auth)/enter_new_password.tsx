import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { Text, TextInput, View, Pressable } from "react-native";
import Button from "@/src/components/ui/Button";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import Loading from "@/src/components/ui/Loading";
import { encrypt } from "@/src/utils/encryptionUtils";
import { useGlobal } from "@/src/contexts/globals";
import { router } from "expo-router";
import { API_URL } from "@/src/config/apiConfig";

export default function EnterNewPassword() {
  const [checked, setChecked] = useState(false);
  const { password, setPassword, privateKey, setPrivateKey, jwtToken } =
    useGlobal();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleSetPassword = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/auth/add-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!data.status) {
        setError(data.message);
      } else {
        const encryptedPrivateKey = encrypt(privateKey, password);
        setPrivateKey(encryptedPrivateKey);

        router.replace("/(auth)/backup_wallet");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to encrypt private key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledSafeView>
      {isLoading && <Loading />}

      <View className="w-full flex-1 justify-between">
        <View className="w-full">
          <View className="w-full" style={{ marginVertical: 20 }}>
            <Text className="font-AlexandriaBold text-center text-xl">
              Secure your wallet
            </Text>
          </View>

          <View className="w-full items-center justify-center flex-row">
            <View className="w-[100px] h-2 bg-[#0000B9] rounded-full"></View>
            <View className="w-[100px] h-2 bg-[#CCCCF1] rounded-full ml-3"></View>
          </View>

          <View className="w-full mt-10 px-5">
            <View className="w-full">
              <Text className="text-xl font-AlexandriaRegular">Password</Text>
              <TextInput
                className="mt-3 bg-[#F5F5F5] rounded-lg p-5   text-2xl placeholder:text-md font-AlexandriaBold"
                placeholder=""
                secureTextEntry
                textAlignVertical="center"
                style={{
                  textAlign: "left",
                  textAlignVertical: "center",
                  includeFontPadding: false,
                }}
                onChangeText={setPassword}
                value={password}
              />
            </View>

            <View className="w-full mt-10">
              <Text className="text-xl font-AlexandriaRegular">
                Confirm Password
              </Text>
              <TextInput
                className="mt-3 bg-[#F5F5F5] rounded-lg p-5  text-2xl font-AlexandriaBold"
                placeholder=""
                secureTextEntry
                textAlignVertical="center"
                style={{
                  textAlign: "left",
                  textAlignVertical: "center",
                  includeFontPadding: false,
                }}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
            </View>

            <View className="w-full px-5 mt-5">
              {error && (
                <Text className="text-red-500 text-md font-AlexandriaRegular">
                  {error}
                </Text>
              )}
            </View>

            {/* <View className="w-full mt-10">
              <View className="">
                <Text className="text-xl font-AlexandriaRegular">Hints:</Text>

                <View className="w-full flex-row items-center">
                  <Entypo name="dot-single" size={24} color="black" />
                  <Text className=" font-AlexandriaLight text-xl">
                    Use a strong Password
                  </Text>
                </View>
                <View className="w-full flex-row items-center">
                  <Entypo name="dot-single" size={24} color="black" />
                  <Text className=" font-AlexandriaLight text-xl">
                    Securely Store in a Password Manager
                  </Text>
                </View>
              </View>
            </View> */}
          </View>
        </View>

        <View
          className="w-full items-center justify-center"
          style={{ paddingBottom: 25 }}
        >
          <View className="w-full flex-row p-5">
            {/* <Pressable onPress={handleCheck} className="w-full flex-row">
              <View className="w-[30px]">
                {!checked && (
                  <FontAwesome name="square-o" size={25} color="black" />
                )}
                {checked && (
                  <FontAwesome6 name="square-check" size={24} color="black" />
                )}
              </View>

              <View className="max-w-[90%]">
                <Text className="text-md font-AlexandriaLight">
                  I Acknowledge that if I loose my password without backing up
                  my private key, even Tethry can not recover my wallet for me
                </Text>
              </View>
            </Pressable> */}
          </View>

          <View className="w-[90%]">
            <Button title="Set Password" onPress={handleSetPassword} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
