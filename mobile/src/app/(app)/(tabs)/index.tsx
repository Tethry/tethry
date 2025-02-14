import { Image, Platform, View, StatusBar, ScrollView } from "react-native";

import { Redirect, router } from "expo-router";
import StyledSafeView from "@/src/components/ui/StyledSafeView";
import MessageNotificationIcon from "@/src/components/icons/MessageNotificationIcon";
import Loading from "@/src/components/ui/Loading";
import Transactionbtn from "@/src/components/ui/Transactionbtn";
import TransactionHistoryBlock from "@/src/components/home/TransactionHistoryBlock";
import UserBalanceCard from "@/src/components/home/UserBalanceCard";
import ScanIcon from "@/src/components/icons/ScanIcon";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/auth";
import { useEffect, useState } from "react";
import { getRecentTransactions } from "@/src/utils/transactions";
export default function HomeScreen() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);

  const router = useRouter();
  const redirecttotransfer = () => {
    router.push("/(app)/(transfer)/transfer");
  };

  const redirecttoreceive = () => {
    router.push("/(app)/(receive)/receive");
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getRecentTransactions(token);
      console.log(data);
      if (data.status) {
        setTransactions(data.transactions);
      }
    };
    fetchTransactions();
  }, [token]);

  return (
    <>
      <StatusBar
        backgroundColor="#F1E4FF"
        barStyle="dark-content"
        translucent={true}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            height: 230,
            backgroundColor: "#F1E4FF",
            overflow: "visible",
            paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight,
          }}
          className="relative"
        >
          <View
            style={{ marginTop: 50, paddingHorizontal: 10 }}
            className="w-full flex-row justify-between"
          >
            <View>
              <Image
                source={require("@/assets/images/tethry-colored-logo.png")}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {/* <View className="w-[32px] h-[32px] rounded-full bg-[#E8D2FF] items-center justify-center">
                <ScanIcon />
              </View>
              <View className="w-[32px] h-[32px] rounded-full bg-[#E8D2FF] items-center justify-center">
                <MessageNotificationIcon />
              </View> */}
            </View>
          </View>

          <View
            style={{
              height: 200,
              position: "absolute",
              width: "100%",
              bottom: Platform.OS === "ios" ? -80 : -65,
              zIndex: 1,
            }}
            className="flex-row items-center justify-center"
          >
            {/* <View
              style={{
                height: "100%",
                width: "90%",
                backgroundColor: "#00005D",
              }}
              className="rounded-xl"
            >
              <HomeBalanceCard />
            </View> */}
            <View style={{ paddingHorizontal: 18, flex: 1 }}>
              <UserBalanceCard />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: Platform.OS === "ios" ? 64 : 74,
            paddingHorizontal: 18,
            gap: 25,
          }}
          className="flex-1 bg-white"
        >
          <View style={{ gap: 10, flexDirection: "row", marginTop: 30 }}>
            <Transactionbtn
              title={"Transfer"}
              icon={"arrow-up-right"}
              functionprop={redirecttotransfer}
              isenabled={true}
            />
            <Transactionbtn
              functionprop={redirecttoreceive}
              isenabled={true}
              title={"Receive"}
              icon={"arrow-down-left"}
            />
          </View>

          <TransactionHistoryBlock transactions={transactions || []} />
        </View>
      </ScrollView>
    </>
  );
}
