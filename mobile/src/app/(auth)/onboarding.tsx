import { router } from "expo-router";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleManualSwitch = (index: number) => {
    setCurrentIndex(index);
  };

  const onHandlerStateChange = () => {
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // router.replace("/get_started");
    }
  };

  const handleGetStarted = () => {
    router.replace("/(auth)/enter_email");
  };

  const onSwipeLeft = useCallback(() => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const onSwipeRight = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(2);
    }
  }, [currentIndex]);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <>
      <StatusBar
        backgroundColor="#0000B9"
        barStyle="light-content"
        translucent={true}
      />
      <SafeAreaView className="flex-1 bg-[#0000B9]">
        <View className="w-full p-5 mt-10 flex-col flex-1 justify-between">
          <View className="w-full">
            <View className="w-full">
              <Image
                className="w-full max-w-full h-[400px]"
                source={require("../../../assets/images/globe.png")}
              />
            </View>

            <View className="w-full items-center justify-center">
              <View className="">
                <Image
                  className="aspect-auto"
                  source={require("../../../assets/images/tethry-white-logo.png")}
                />
              </View>
            </View>

            <View className="mt-10">
              <Text className="text-5xl font-AlexandriaBold text-center text-white leading-normal">
                Your gateway to seamless digital payments.
              </Text>
            </View>
          </View>

          <View className="w-full">
            <TouchableOpacity activeOpacity={0.8} onPress={handleGetStarted}>
              <View className="bg-white w-full p-5 rounded-full flex-row justify-between">
                <Text className="text-xl font-bold">Get Started</Text>
                <AntDesign name="arrowright" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
