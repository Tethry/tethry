import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { View, Text, Image } from "react-native";
import Button from "@/src/components/ui/Button";
import PadlockIcon from "@/src/components/icons/PadlockIcon";
import { router } from "expo-router";

export default function BackupComplete() {
  const handleFinish = () => {
    router.replace("/(auth)/signature_request");
  };

  return (
    <StyledSafeView>
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
              source={require("../../../assets/images/backup_complete.png")}
            />
          </View>
          <View className="w-full mt-3">
            <Text className="text-center font-AlexandriaBold text-xl">
              Good to go!
            </Text>

            <Text className="text-center mt-5 font-AlexandriaLight">
              Your wallet is secured and backed up.
            </Text>
          </View>
        </View>

        <View className="w-full items-center justify-center">
          <View className="w-[90%]">
            <Button title="Finish" onPress={handleFinish} />
          </View>

          <View className="flex-row my-5">
            <PadlockIcon />
            <Text className="text-[#8F8F8F] font-AlexandriaRegular ml-3">
              100% encrypted
            </Text>
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
