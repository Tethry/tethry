import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon library

import { useColorScheme } from "../../../hooks/useColorScheme";
import { Colors } from "../../../constants/Colors";

import TabCardsIcon from "../../../components/tab/TabCardsIcon";
import TabCardsIconActive from "../../../components/tab/TabCardsIconActive";
import TabHomeIcon from "../../../components/tab/TabHomeIcon";
import TabHomeIconActive from "../../../components/tab/TabHomeIconActive";
import TabSettingsIcon from "../../../components/tab/TabSettingsIcon";
import TabSettingsIconActive from "../../../components/tab/TabSettingsIconActive";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              className={`capitalize ${
                focused ? "text-[#0000B9]" : "text-[#9FA3B3]"
              } font-AlexandriaMedium`}
            >
              {route.name === "index" ? "Home" : route.name}
            </Text>
          );
        },
        tabBarStyle: {
          paddingTop: 10,
          height: 90,
          paddingHorizontal: 30,
          backgroundColor: "white",
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) =>
            focused ? <TabHomeIconActive /> : <TabHomeIcon />,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ focused, color }) =>
            focused ? <TabCardsIconActive /> : <TabCardsIcon />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ focused, color }) =>
            focused ? <TabSettingsIconActive /> : <TabSettingsIcon />,
        }}
      />
    </Tabs>
  );
}
