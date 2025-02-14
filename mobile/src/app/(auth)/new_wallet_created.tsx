import AtSVGIcon from "@/src/components/icons/AtIcon";
import CopyIcon from "@/src/components/icons/CopyIcon";
import LockIcon from "@/src/components/icons/LockIcon";
import MoneySVGIcon from "@/src/components/icons/MoneyIcon";
import TethryTokenIcon from "@/src/components/icons/TethryTokenIcon";
import Button from "@/src/components/ui/Button";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { Text, View, Image, Pressable } from "react-native";
import { useGlobal } from "@/src/contexts/globals";
import { router } from "expo-router";

export default function NewWallet() {
  const { walletAddress, jwtToken } = useGlobal();

  const maskedWalletAddress = walletAddress
    ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
    : "";

  const handleCopyWalletAddress = () => {};

  const handleContinue = () => {
    router.replace("/(auth)/enter_new_password");
  };

  return (
    <StyledSafeView>
      <View
        className="w-full items-center justify-center"
        style={{ marginVertical: 50 }}
      >
        <Image source={require("../../../assets/images/wallet-icon.png")} />
      </View>

      <View className="w-full">
        <Text className="text-2xl text-center font-AlexandriaBold">
          Your Wallet is Here!
        </Text>
      </View>

      <View
        className="w-full items-center justify-center"
        style={{ marginVertical: 40 }}
      >
        <View className="w-[90%] flex-row items-center justify-between bg-[#F5F5F5] px-5 py-4 rounded-full">
          <View className="flex-row items-center">
            <TethryTokenIcon />

            <View className="ml-5">
              <Text className="font-AlexandriaRegular text-[#8F8F8F] text-xl">
                Your wallet address
              </Text>
              <Text className="font-AlexandriaBold text-[#1E1E1E] text-xl">
                {maskedWalletAddress}
              </Text>
            </View>
          </View>

          <Pressable onPress={handleCopyWalletAddress}>
            <CopyIcon />
          </Pressable>
        </View>
      </View>

      <View className="mt-5 w-full">
        <View
          className="w-full flex-row items-center "
          style={{ paddingHorizontal: 5, paddingLeft: 10 }}
        >
          <View className="w-[50px] h-[50px] rounded-full items-center justify-center mr-3 p-3 bg-[#F5F5F5]">
            <MoneySVGIcon />
          </View>

          <View className="max-w-[90%] px-4">
            <Text className="font-AlexandriaRegular text-[#8F8F8F] text-md">
              like a traditional bank ‘account number’, your wallet address will
              be used to receive funds.
            </Text>
          </View>
        </View>

        <View
          className="w-full flex-row items-center mt-5"
          style={{ paddingHorizontal: 5, paddingLeft: 10 }}
        >
          <View className="w-[50px] h-[50px] rounded-full items-center justify-center mr-3 p-3 bg-[#F5F5F5]">
            <LockIcon />
          </View>

          <View className="max-w-[90%] px-4">
            <Text className="font-AlexandriaRegular text-[#8F8F8F] text-md">
              You have total control over your funds.
            </Text>
          </View>
        </View>

        <View
          className="w-full flex-row items-center mt-5"
          style={{ paddingHorizontal: 5, paddingLeft: 10 }}
        >
          <View className="w-[50px] h-[50px] rounded-full items-center justify-center mr-3 p-3 bg-[#F5F5F5]">
            <AtSVGIcon />
          </View>

          <View className="max-w-[90%] px-4">
            <Text className="font-AlexandriaRegular text-[#8F8F8F] text-md">
              You can rename your wallet address to a personalized @tag.
            </Text>
          </View>
        </View>
      </View>

      <View className="w-full items-center justify-center mt-10">
        <View className="w-[90%]">
          <Button title="Secure Wallet" onPress={handleContinue} />
        </View>
      </View>
    </StyledSafeView>
  );
}
