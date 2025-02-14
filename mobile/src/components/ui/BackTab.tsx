import BackIcon from "../icons/BackIcon";
import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function BackTab() {
  return (
    <View
      style={{
        padding: 10,
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <BackIcon />
      </TouchableOpacity>
    </View>
  );
}
