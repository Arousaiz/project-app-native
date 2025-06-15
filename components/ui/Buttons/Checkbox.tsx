import { Check } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type CheckBoxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export function CheckBox({
  checked = false,
  onChange,
  label,
  className = "",
  disabled = false,
}: CheckBoxProps) {
  return (
    <Pressable
      onPress={() => onChange && !disabled && onChange(!checked)}
      className={`flex flex-row items-center gap-2 ${className}`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <View
        className={`w-5 h-5 rounded border border-gray-400 justify-center items-center ${
          checked ? "bg-primary" : "bg-transparent"
        }`}
        style={{
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {checked && <Check size={16} color="white" />}
      </View>
      {label && (
        <Text
          className={`select-none ${disabled ? "text-gray-400" : "text-black"}`}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

type CheckBoxGroupProps = {
  options: { label?: React.ReactNode; value: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export function CheckBoxGroup({
  options,
  values,
  onChange,
  direction = "vertical",
  className = "",
}: CheckBoxGroupProps) {
  const toggle = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];
    onChange(newValues);
  };

  return (
    <View
      className={`gap-2 my-2 ${
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap"
      } ${className}`}
      accessibilityRole="list"
    >
      {options.map(({ label, value }) => (
        <CheckBox
          key={value}
          label={label}
          checked={values.includes(value)}
          onChange={() => toggle(value)}
        />
      ))}
    </View>
  );
}
