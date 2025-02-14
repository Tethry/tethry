import { Text, View } from "react-native";
import ViewEyeIcon from "../icons/ViewEyeIcon";
import SmallEthereumIcon from "../icons/SmallEthereumIcon";
import USDTIcon from "../icons/USDTIcon";

export default function HomeBalanceCard() {
  return (
    <View className="w-full h-full p-5 justify-between">
      <View></View>

      <View>
        <View className="w-full mb-5">
          <View className="flex-row">
            <USDTIcon />
            <Text className="text-xl text-[#AAAAE8] font-AlexandriaRegular ml-3">
              USDT Balance
            </Text>
          </View>
        </View>

        <View className="w-full flex-row items-center">
          <View>
            <Text className="font-AlexandriaBold text-5xl text-white">
              $0.00
            </Text>
          </View>

          <View className="ml-4">
            <ViewEyeIcon />
          </View>
        </View>
      </View>
    </View>
  );
}
