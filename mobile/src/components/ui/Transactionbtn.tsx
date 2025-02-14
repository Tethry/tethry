import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

interface TransactionbtnProps {
  title: string;
  icon: string;
  isenabled: boolean;
  functionprop: () => void;
}

const Transactionbtn = ({
  title,
  icon,
  isenabled,
  functionprop,
}: TransactionbtnProps) => {
  const isReceive = title === "Receive";

  const handlePress = () => {
    if (functionprop) {
      functionprop();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.mybtn,
        {
          backgroundColor: isenabled
            ? isReceive
              ? "white"
              : "#0000B9"
            : "#F5F5F5",
          borderColor: isenabled ? "#0000B9" : "#B4B4B4",
        },
      ]}
      onPress={handlePress}
    >
      <Feather
        name={icon as any}
        size={24}
        color={isenabled ? (isReceive ? "#00005D" : "#FDFDFD") : "#B4B4B4"}
      />
      <Text
        style={[
          styles.btntext,
          {
            color: isenabled ? (isReceive ? "#00005D" : "#FDFDFD") : "#B4B4B4",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Transactionbtn;

const styles = StyleSheet.create({
  mybtn: {
    padding: 13,
    borderRadius: 999,
    alignItems: "center",
    borderWidth: 1,
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  btntext: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "AlexandriaRegular",
  },
});
