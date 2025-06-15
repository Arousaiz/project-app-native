import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export function SkeletonCard() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={{ opacity: pulseAnim }}
      className="bg-gray-300 rounded-xl shadow-md p-4 min-w-40"
    >
      <View className="bg-gray-400 h-40 rounded-lg mb-4" />

      <View className="bg-gray-400 h-5 w-5/6 rounded-md mb-2" />
      <View className="bg-gray-400 h-4 w-4/6 rounded-md" />
    </Animated.View>
  );
}
