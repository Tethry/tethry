import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import USDTIcon from "../icons/USDTIcon";
import Octicons from '@expo/vector-icons/Octicons';
import {
  getUserBalance,
  formatBigInt,
} from "../../utils/contract/getUserBalance";
import { useAuth } from "@/src/contexts/auth";
const UserBalanceCard = () => {
  const { address, balance, setBalance } = useAuth();
  const [hideBalance, setHideBalance] = useState(false);

  const handleHideBalance = () => {
    setHideBalance(!hideBalance);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getUserBalance(address || "");

      setBalance(balance);
    };
    fetchBalance();
  }, [address]);

  return (
    <ImageBackground
      source={require("@/assets/images/spiral.png")}
      style={styles.userbalancecard as ViewStyle}
      imageStyle={{
        resizeMode: "contain", // Ensures the image scales correctly
        top: -12,
        bottom: 0,
        right: 0,
        left: 210,

        // Positions the image to the right
      }}
    >
      <View style={styles.userbalancecarddata as ViewStyle}>
        <View className="flex-row mb-4 items-center">
          <USDTIcon />
          <Text className="text-md text-[#AAAAE8] font-AlexandriaRegular ml-2">
            USDT Balance
          </Text>
        </View>
        <View className="w-full flex-row items-center">
          <TouchableOpacity
            onPress={handleHideBalance}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <View className="fle">
              <Text className="font-AlexandriaRegular text-5xl text-white">
                {hideBalance
                  ? "0000"
                  : formatBigInt(BigInt(balance))}
              </Text>
            </View>

            <View className="ml-4">
              <Octicons
                name={hideBalance ? "eye-closed" : "eye"}
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserBalanceCard;

const styles = StyleSheet.create({
  userbalancecard: {
    marginTop: 20,
    backgroundColor: "#00005D",
    paddingLeft: 10,
    paddingRight: 10,
    resizeMode: "contain",
    backgroundSize: "50%",
    minHeight: 160,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 7,
  },
  userbalancecarddata: {
    padding: 10,
    marginTop: "auto",
    alignSelf: "baseline",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
