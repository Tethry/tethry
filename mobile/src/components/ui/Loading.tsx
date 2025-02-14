import { View, Text, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function Loading() {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const duration = 1000;
  const maxScale = 1.2;
  const minScale = 1;

  useEffect(() => {
    // Create animation sequence
    const scaleSequence = Animated.sequence([
      // Scale up
      Animated.timing(scaleValue, {
        toValue: maxScale,
        duration: duration,
        useNativeDriver: true,
      }),
      // Scale down
      Animated.timing(scaleValue, {
        toValue: minScale,
        duration: duration,
        useNativeDriver: true,
      }),
    ]);

    // Create infinite loop
    const infiniteScale = Animated.loop(scaleSequence);

    // Start the animation
    infiniteScale.start();

    // Clean up animation on unmount
    return () => {
      infiniteScale.stop();
    };
  }, [duration, maxScale, minScale]);

  return (
     <View
      className="flex-1 justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <Animated.Image
        source={require("../../../assets/images/token.png")}
        className="w-[120px] h-[95px]"
        style={{ transform: [{ scale: scaleValue }] }}
      />
    </View>
  );
}
