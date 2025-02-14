import { View, StatusBar, SafeAreaView, ScrollView } from "react-native";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function StyledSafeView({ children }: Props) {
  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={true}
      />

      <SafeAreaView
        style={{
          paddingTop: StatusBar.currentHeight,
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="w-full flex-1"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
