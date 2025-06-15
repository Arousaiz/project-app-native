import { cn } from "@/utils/utils";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View } from "react-native";

type SelectProps = {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
  className?: string;
};

export default function Select({
  options,
  selectedValue,
  onValueChange,
  error,
  className,
}: SelectProps) {
  return (
    <View className={cn("flex flex-col gap-1", className)}>
      <View
        className={cn(
          "border rounded-md bg-transparent px-3 py-1.5",
          error ? "border-destructive" : "border-border"
        )}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{ color: error ? "#dc2626" : "#000" }}
          dropdownIconColor={error ? "#dc2626" : "#000"}
        >
          {options.map((opt) => (
            <Picker.Item key={opt} label={opt} value={opt} />
          ))}
        </Picker>
      </View>
      {error && (
        <Text className="mt-1 text-destructive" accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
}
