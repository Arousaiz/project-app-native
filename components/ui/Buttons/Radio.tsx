import React from "react";
import { Pressable, Text, View } from "react-native";

type RadioProps = {
  label?: React.ReactNode;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
};

export function Radio({
  label,
  value,
  checked,
  onChange,
  className,
}: RadioProps) {
  return (
    <Pressable
      onPress={() => onChange?.(value)}
      className={`flex flex-row items-center gap-2 ${className ?? ""}`}
      accessibilityRole="radio"
      accessibilityState={{ selected: checked }}
    >
      <View
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          checked ? "bg-primary border-primary" : "border-gray-400"
        }`}
      >
        {checked && (
          <View className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
        )}
      </View>
      <Text>{label ?? value}</Text>
    </Pressable>
  );
}

type RadioGroupProps = {
  options: { label?: React.ReactNode; value: string }[];
  value?: string;
  onChange: (value: string) => void;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export function RadioGroup({
  options,
  value: controlledValue,
  onChange,
  direction = "vertical",
  className = "",
}: RadioGroupProps) {
  return (
    <View
      className={`gap-2 my-2 ${
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap"
      } ${className}`}
      accessibilityRole="radiogroup"
    >
      {options.map(({ label, value }) => (
        <Radio
          key={value}
          label={label}
          value={value}
          checked={controlledValue === value}
          onChange={onChange}
        />
      ))}
    </View>
  );
}
