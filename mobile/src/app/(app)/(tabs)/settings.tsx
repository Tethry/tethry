import { View, Text, TouchableOpacity, Image } from "react-native";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import TethryTokenIcon from "@/src/components/icons/TethryTokenIcon";
import CopyIcon from "@/src/components/icons/CopyIcon";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@/src/contexts/auth";

export default function TabTwoScreen() {
  const { signOut } = useAuth();
  return (
    <StyledSafeView>
      <View className="w-full flex-1  px-5 pb-10">
        <View className="w-full bg-[#F1E4FF] rounded-xl p-5 mt-10 flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View>
              <TethryTokenIcon />
            </View>

            <View>
              <Text className="text-lg font-AlexandriaRegular text-[#8F8F8F]">
                Tethry transfer tag
              </Text>
              <Text className="text-xl font-AlexandriaBold">@collinsadi</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity>
              <CopyIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}

        <View className="w-full mt-10">
          <Text className="text-xl font-AlexandriaBold text-[#8F8F8F]">
            Account
          </Text>

          <View className="mt-5 border border-[#D2D2D2] rounded-xl p-5">
            <View className="my-5 w-full flex-row items-center justify-between pb-5 border-b border-[#D2D2D2]">
              <View className="flex-row items-center gap-4">
                <View>
                  <Image
                    source={require("../../../../assets/images/settings_user_icon.png")}
                  />
                </View>

                <View>
                  <Text className="text-xl font-AlexandriaBold">
                    Personal Details
                  </Text>
                  <Text className="text-lg text-[#8F8F8F] font-AlexandriaRegular">
                    Personal, delete account
                  </Text>
                </View>
              </View>

              <View>
                <AntDesign name="right" size={24} color="#8F8F8F" />
              </View>
            </View>

            <View className="my-5 w-full flex-row items-center justify-between pb-5 border-b border-[#D2D2D2]">
              <View className="flex-row items-center gap-4">
                <View>
                  <Image
                    source={require("../../../../assets/images/settings_wallet_icon.png")}
                  />
                </View>

                <View>
                  <Text className="text-xl font-AlexandriaBold">
                    Wallet Details
                  </Text>
                  <Text className="text-lg text-[#8F8F8F] font-AlexandriaRegular">
                    Wallet address, Balance, Backup
                  </Text>
                </View>
              </View>

              <View>
                <AntDesign name="right" size={24} color="#8F8F8F" />
              </View>
            </View>

            <View className="my-5 w-full flex-row items-center justify-between pb-5 border-b border-[#D2D2D2]">
              <View className="flex-row items-center gap-4">
                <View>
                  <Image
                    source={require("../../../../assets/images/settings_security_icon.png")}
                  />
                </View>

                <View>
                  <Text className="text-xl font-AlexandriaBold">Security</Text>
                  <Text className="text-lg text-[#8F8F8F] font-AlexandriaRegular">
                    2FA, Password reset
                  </Text>
                </View>
              </View>

              <View>
                <AntDesign name="right" size={24} color="#8F8F8F" />
              </View>
            </View>
          </View>
        </View>

        <View className="w-full mt-10">
          <Text className="text-xl font-AlexandriaBold text-[#8F8F8F]">
            Others
          </Text>

          <View className="mt-5 border border-[#D2D2D2] rounded-xl p-5">
            <View className=" w-full flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View>
                  <Image
                    source={require("../../../../assets/images/settings_support_icon.png")}
                  />
                </View>

                <View>
                  <Text className="text-xl font-AlexandriaBold">Help Desk</Text>
                  <Text className="text-lg text-[#8F8F8F] font-AlexandriaRegular">
                    Chat, FAQs, website
                  </Text>
                </View>
              </View>

              <View>
                <AntDesign name="right" size={24} color="#8F8F8F" />
              </View>
            </View>
          </View>
        </View>

        <View className="w-full mt-3">
          <TouchableOpacity onPress={signOut}>
            <View className="mt-5 border border-[#D2D2D2] rounded-xl p-5">
              <View className=" w-full flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <View>
                    <Image
                      source={require("../../../../assets/images/settings_logout_icon.png")}
                    />
                  </View>

                  <View>
                    <Text className="text-xl font-AlexandriaBold">Logout</Text>
                  </View>
                </View>

                <View>
                  <AntDesign name="right" size={24} color="#8F8F8F" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </StyledSafeView>
  );
}
