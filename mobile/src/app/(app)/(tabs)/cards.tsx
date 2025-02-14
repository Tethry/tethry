import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Cardsvg from "@/src/components/icons/Cardsvg";
import { router } from "expo-router";
import Button from "@/src/components/ui/Button";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import ScanIcon from "@/src/components/icons/ScanIcon";
import MessageNotificationIcon from "@/src/components/icons/MessageNotificationIcon";
import UserBalanceCard from "@/src/components/home/UserBalanceCard";
import { Platform } from "react-native";
import USDTIcon from "@/src/components/icons/USDTIcon";
import ViewEyeIcon from "@/src/components/icons/ViewEyeIcon";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import ManageIcon from "@/src/components/icons/ManageIcon";
import TransactionHistoryBlock from "@/src/components/home/TransactionHistoryBlock";
import NoCardState from "@/src/components/ui/NoCardState";
import WaitingCardState from "@/src/components/ui/WaitingCardState";
import Loading from "@/src/components/ui/Loading";
import { getUserCard } from "@/src/utils/card/getUserCard";
import { useAuth } from "@/src/contexts/auth";
import { getCardBalance } from "@/src/utils/card/getCardBalance";
import { formatBigInt } from "@/src/utils/contract/getUserBalance";
import { getCardRecentTransactions } from "@/src/utils/card/cardTransactions";

const usercards = () => {
  const { user, token } = useAuth();
  function handleContinue() {}

  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState([]);
  const [hasCard, setHasCard] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfUserHasCard = async () => {
      setLoading(true);
      const response = await getUserCard(token);
      console.log(response);
      setLoading(false);
      if (response.status) {
        setHasCard(response?.isUserHasCard);
        setIsWaiting(response?.isUserHasCardOrder);
      } else {
        setHasCard(false);
      }
    };
    checkIfUserHasCard();
  }, []);

  useEffect(() => {
    const getUserCardBalance = async () => {
      const response = await getCardBalance(token);

      if (response.status) {
        setBalance(response.balance);
      }
    };
    getUserCardBalance();
  }, []);

  useEffect(() => {
    const getUserCardRecentTransactions = async () => {
      const response = await getCardRecentTransactions(token);

      console.log(response);
      if (response.status) {
        setTransactions(response.transactions);
      }
    };
    getUserCardRecentTransactions();
  }, [token]);

  if (loading) {
    return (
      <StyledSafeView>
        <View className="w-full flex-1">
          <Loading />
        </View>
      </StyledSafeView>
    ); // a better loading state will be added here
  }

  return (
    <>
      {hasCard ? (
        <>
          <StatusBar
            backgroundColor="#CCCCF1"
            barStyle="dark-content"
            translucent={true}
          />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{
              backgroundColor: "white",
            }}
          >
            <View className="w-full">
              <View
                style={{
                  height: 230,
                  backgroundColor: "#CCCCF1",
                  overflow: "visible",
                  paddingTop:
                    Platform.OS === "ios" ? 50 : StatusBar.currentHeight,
                }}
                className="relative"
              >
                <View
                  style={{ paddingHorizontal: 15 }}
                  className="w-full justify-between mt-10"
                >
                  <View className="">
                    <Text className="text-2xl  font-AlexandriaBold">
                      My Card
                    </Text>
                  </View>

                  {/* <View className="mt-3 w-full flex-row items-center">
                    <Text className="text-md font-AlexandriaRegular text-[#5555D0]">
                      $50 Limit Left for this Month
                    </Text>
                    <View className="ml-2">
                      <AntDesign name="right" size={20} color="#8F8F8F" />
                    </View>
                  </View> */}
                </View>

                <View
                  style={{
                    height: 200,
                    position: "absolute",
                    width: "100%",
                    bottom: Platform.OS === "ios" ? -120 : -105,
                    zIndex: 1,
                  }}
                  className="flex-row items-center justify-center"
                >
                  <View
                    className="w-full"
                    style={{ paddingHorizontal: 0, flex: 1 }}
                  >
                    {/* <UserBalanceCard /> */}

                    <View className="w-full h-full p-5 justify-between">
                      <View className="bg-[#251833] w-full h-[200px] rounded-xl p-5">
                        <View className="w-full h-full justify-between">
                          <View className="w-full flex-row items-center justify-end">
                            <View className="w-fit border border-white rounded-full px-2 py-1 flex-row items-center">
                              <View className="mr-2">
                                <Octicons
                                  name="dot-fill"
                                  size={24}
                                  color="green"
                                />
                              </View>
                              <Text className="text-[#F5F5F5] font-AlexandriaRegular">
                                Active
                              </Text>
                            </View>
                          </View>

                          <View>
                            <Text className="text-md mb-2 text-white font-AlexandriaMedium">
                              Current Card Balance
                            </Text>

                            <Text className="text-4xl text-white font-AlexandriaBold">
                              {formatBigInt(BigInt(balance))}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 160 }} className="w-full px-5">
                <View className="w-full flex-row items-center justify-center">
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(app)/(card)/enter_fund_amount")
                    }
                  >
                    <View className="bg-[#0000B9] rounded-full px-5 py-3 flex-row items-center justify-center">
                      <AntDesign name="plus" size={25} color="white" />
                      <Text className="text-white text-2xl font-AlexandriaRegular text-center ml-2">
                        Fund
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push("/(app)/(manage)/manage")}
                  >
                    <View className="border-[#0000B9] border-2 rounded-full px-5 py-3 flex-row items-center justify-center ml-3">
                      <ManageIcon />
                      <Text className="text-[#00005D] text-2xl font-AlexandriaRegular text-center ml-2">
                        Manage
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="w-full flex-row items-center justify-between">
                  <TransactionHistoryBlock transactions={transactions || []} />
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      ) : !isWaiting ? (
        <StyledSafeView>
          <View className="w-full flex-1">
            <NoCardState />
          </View>
        </StyledSafeView>
      ) : (
        <StyledSafeView>
          <View className="w-full flex-1">
            <WaitingCardState />
          </View>
        </StyledSafeView>
      )}
    </>
  );
};

export default usercards;

const styles = StyleSheet.create({});
