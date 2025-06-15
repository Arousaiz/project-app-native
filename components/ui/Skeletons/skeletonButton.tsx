import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export function SkeletonButton() {
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
      style={[
        styles.skeleton,
        {
          opacity: pulseAnim,
        },
      ]}
      className="bg-muted rounded-lg"
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    height: 40,
    width: 96,
  },
});
