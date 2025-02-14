import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import BackTab from "../../components/ui/BackTab";
import Button from "../../components/ui/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { router } from "expo-router";
import { API_URL } from "../../config/apiConfig";
import { useGlobal } from "../../contexts/globals";

export default function EnterEmail() {
  const { email, setEmail } = useGlobal();
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    console.log(email);

    if (email.trim() === "") {
      Alert.alert("Please enter your email address");
      return;
    }

    const response = await fetch(`${API_URL}/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    console.log(data);

    if (!data.status && data.message !== "OTP already sent") {
      setError(data.message);
    } else {
      router.push("/(auth)/enter_email_otp");
    }

    //
  };

  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={true}
      />

      <SafeAreaView className="flex-1 bg-white justify-between">
        <View className="w-full">
          <View className="w-full mt-[50px]">
            {/* <BackTab /> */}
          </View>

          <View className="w-full t-5 p-5">
            <Text className="text-2xl font-AlexandriaBold text-black">
              Enter your email address
            </Text>
          </View>

          <View className="w-full px-5">
            <TextInput
              placeholder="Email"
              placeholderTextColor="#8F8F8F"
              className="bg-[#F5F5F5] w-full p-5 rounded-lg text-2xl font-AlexandriaRegular"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              autoFocus={true}
            />
          </View>

          <View className="w-full px-5 mt-5">
            {error && (
              <Text className="text-red-500 text-md font-AlexandriaRegular">
                {error}
              </Text>
            )}
          </View>

          <View className="w-full px-5 mt-5">
            <Button title="Continue" onPress={handleContinue} />
          </View>
        </View>

        <View className="w-full p p-5 mt-5 flex-row justify-center items-center">
          <Text className="text-md font-AlexandriaRegular text-[#8F8F8F] text-center mr-5">
            Got any complaints?
          </Text>

          <AntDesign name="right" size={20} color="#8F8F8F" />
        </View>
      </SafeAreaView>
    </>
  );
}
