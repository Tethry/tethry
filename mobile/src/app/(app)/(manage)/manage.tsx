import { View, Text, TouchableOpacity, Image } from "react-native";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import TethryTokenIcon from "@/src/components/icons/TethryTokenIcon";
import CopyIcon from "@/src/components/icons/CopyIcon";
import AntDesign from "@expo/vector-icons/AntDesign";
import BackTab from "@/src/components/ui/BackTab";
import { router } from "expo-router";

export default function Manage() {
  return (
    <StyledSafeView>
      <View className="w-full flex-row items-center gap-2 mt-2">
        <View className="w-[30px] mt-3 mr-3">
          <BackTab />
        </View>
        <Text className="text-xl font-AlexandriaLight">Card Management</Text>
      </View>
      <View className="w-full flex-1  px-5 pb-10">
        {/* Account Settings */}

        <View className="w-full mt-10">
          <Text className="text-xl font-AlexandriaBold text-[#8F8F8F]">
            Security
          </Text>

          <View className="mt-5 border border-[#D2D2D2] rounded-xl p-5">
            <TouchableOpacity
              onPress={() => router.push("/(app)/(manage)/change_pin")}
            >
              <View className="my-5 w-full flex-row items-center justify-between pb-5 border-b border-[#D2D2D2]">
                <View className="flex-row items-center gap-4">
                  <View>
                    <Image
                      source={require("../../../../assets/images/change_pin_icon.png")}
                    />
                  </View>

                  <View>
                    <Text className="text-xl font-AlexandriaBold">
                      Change Pin
                    </Text>
                    <Text className="text-lg text-[#8F8F8F] font-AlexandriaRegular">
                      Update your card PIN
                    </Text>
                  </View>
                </View>

                <View>
                  <AntDesign name="right" size={24} color="#8F8F8F" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(app)/(manage)/spending_limit")}
            >
              <View className="mt-5 w-full flex-row items-center justify-between pb-5">
                <View className="flex-row items-center gap-4">
                  <View>
                    <Image
                      source={require("../../../../assets/images/shield_icon.png")}
                    />
                  </View>

                  <View>
                    <Text className="text-xl font-AlexandriaBold">
                      Spending limits
                    </Text>
                    <Text className="text-lg text-[#8F8F8F] font-AlexandriaRegular">
                      Set daily/monthly limits
                    </Text>
                  </View>
                </View>

                <View>
                  <AntDesign name="right" size={24} color="#8F8F8F" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full mt-10">
          <Text className="text-xl font-AlexandriaBold text-[#8F8F8F]">
            Extreme actions
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/(app)/(manage)/delete_card")}
          >
            <View className="mt-5 border border-red-500 rounded-xl p-5">
              <View className=" w-full flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <View>
                    <Image
                      source={require("../../../../assets/images/red_trash.png")}
                    />
                  </View>

                  <View>
                    <Text className="text-xl font-AlexandriaBold text-red-500">
                      Delete Card
                    </Text>
                    <Text className="text-lg text-red-500 font-AlexandriaRegular">
                      Remove card and withdraw funds
                    </Text>
                  </View>
                </View>

                <View className="px-2">
                  <AntDesign name="right" size={24} color="red" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </StyledSafeView>
  );
}
