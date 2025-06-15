import React from "react";
import { ActivityIndicator, View } from "react-native";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function LoadingSpinner({
  size = 24,
  color = "#3b82f6",
}: LoadingSpinnerProps) {
  return (
    <View className="items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
