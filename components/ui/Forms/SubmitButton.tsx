import { cn } from "@/utils/utils";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type SubmitButtonProps = {
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function SubmitButton({
  children,
  isLoading = false,
  disabled = false,
  onPress,
  className,
}: SubmitButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading || disabled}
      className={cn(
        "flex w-full justify-center rounded-md bg-primary px-3 py-1.5 shadow-xs mt-4",
        "disabled:opacity-60 disabled:pointer-events-none",
        "hover:bg-primary/80",
        className
      )}
      accessibilityState={{ busy: isLoading, disabled: isLoading || disabled }}
      accessibilityRole="button"
    >
      <View className="flex-row items-center justify-center">
        <Text className="text-sm font-semibold text-white">{children}</Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            className="ml-2"
            animating={true}
          />
        )}
      </View>
    </Pressable>
  );
}
