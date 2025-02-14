import BellIcon from "@/src/components/icons/BellIcon";
import Button from "@/src/components/ui/Button";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import { Text, View } from "react-native";

export default function NotificationRequest() {
  return (
    <StyledSafeView>
      <View
        style={{ flex: 1, paddingBottom: 25 }}
        className="w-full justify-between"
      >
        <View className="w-full">
          <View
            className="w-full flex-row items-center justify-end"
            style={{ marginTop: 10, paddingHorizontal: 20 }}
          >
            <Text className="font-AlexandriaBold text-xl text-[#8080DC]">
              Skip
            </Text>
          </View>

          <View className="w-full items-center justify-center mt-10">
            <View className="w-[100px] h-[100px] bg-[#F5F5F5] items-center justify-center rounded-xl">
              <BellIcon />
            </View>
          </View>

          <View className="mt-10">
            <Text className="text-center text-xl font-AlexandriaRegular">
              Turn on notification
            </Text>

            <Text
              style={{ paddingHorizontal: 25 }}
              className="text-center mt-5 text-xl font-AlexandriaMedium text-[#8F8F8F]"
            >
              Stay up to date with transactions on all your wallet activity
            </Text>
          </View>
        </View>

        <View className="w-full items-center justify-center">
          <View className="w-[90%]">
            <Button title="Turn on notification" onPress={() => {}} />
          </View>
        </View>
      </View>
    </StyledSafeView>
  );
}
