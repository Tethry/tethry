import * as React from "react";
import CloudSVGIcon from "@/src/components/icons/CloudSVGIcon";
import KeySVGICon from "@/src/components/icons/KeySVGIcon";
import ShieldSVGIcon from "@/src/components/icons/ShieldSVGIcon";
import SpeedSVGIcon from "@/src/components/icons/SpeedSVGIcon";
import Button from "@/src/components/ui/Button";
import Loading from "@/src/components/ui/Loading";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { View, Text, Image, Platform } from "react-native";
import { API_URL } from "@/src/config/apiConfig";
import { router } from "expo-router";
import { useGlobal } from "@/src/contexts/globals";
import { AuthStorage } from "@/src/utils/storageUtil";

export default function BackupWallet() {
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { jwtToken, privateKey, setPrivateKey } = useGlobal();
  const [error, setError] = React.useState<string | null>(null);

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/auth/backup-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          encryptedPrivateKey: privateKey,
          refreshToken: String("refreshToken"),
          os: Platform.OS,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (!data.status) {
        setError(data.message);
      } else {
        router.replace("/(auth)/backup_complete");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to backup account");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledSafeView>
      {isLoading && <Loading />}

      <View
        className="w-full flex-1 justify-between"
        style={{ paddingBottom: 20 }}
      >
        <View className="w-full">
          <View className="w-full" style={{ marginVertical: 20 }}>
            <Text className="font-AlexandriaBold text-center text-xl">
              Secure your wallet
            </Text>
          </View>

          <View className="w-full items-center justify-center flex-row">
            <View className="w-[100px] h-2 bg-[#0000B9] rounded-full"></View>
            <View className="w-[100px] h-2 bg-[#0000B9] rounded-full ml-3"></View>
          </View>
        </View>

        <View className="mt-20">
          <View className="w-full items-center justify-center">
            <Image
              source={require("../../../assets/images/cluoud-with-lock.png")}
            />
          </View>
          <View className="w-full mt-3">
            <Text className="text-center font-AlexandriaBold text-xl">
              Backup your account
            </Text>

            <View className="w-full items-center justify-center mt-5">
              <View className=" flex-row items-center bg-[#CCCCF1] px-3  py-2 rounded-full">
                <CloudSVGIcon />
                <Text className="mx-2 font-AlexandriaRegular text-[#5555D0]">
                  Cloud Backup
                </Text>
                <SpeedSVGIcon />
                <Text className="font-AlexandriaRegular text-[#5555D0] ml-2">
                  1min
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-10 w-full">
          <View
            className="w-full flex-row items-center "
            style={{ paddingHorizontal: 5, paddingLeft: 10 }}
          >
            <View className="w-[50px] h-[50px] rounded-full items-center justify-center mr-3 p-3 bg-[#F5F5F5]">
              <ShieldSVGIcon />
            </View>

            <View className="max-w-[90%] " style={{ paddingRight: 20 }}>
              <Text className="font-AlexandriaRegular text-[#8F8F8F] text-md">
                To regain access when you log out or switch devices, you need to
                back up your account.
              </Text>
            </View>
          </View>

          <View
            className="w-full flex-row items-center mt-5"
            style={{ paddingHorizontal: 5, paddingLeft: 10 }}
          >
            <View className="w-[50px] h-[50px] rounded-full items-center justify-center mr-3 p-3 bg-[#F5F5F5]">
              <KeySVGICon />
            </View>

            <View className="max-w-[90%] " style={{ paddingRight: 20 }}>
              <Text className="font-AlexandriaRegular text-[#8F8F8F] text-md">
                You have total control over this wallet, only you can access it.
              </Text>
            </View>
          </View>

          <View className="w-full px-5 mt-5">
            {error && (
              <Text className="text-red-500 text-md font-AlexandriaRegular">
                {error}
              </Text>
            )}
          </View>
        </View>

        <View className="w-full items-center justify-center">
          <View className="w-[90%]">
            <Button title="Back up now" onPress={handleGoogleSignIn} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
