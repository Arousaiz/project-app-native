import { cn } from "@/utils/utils";
import React from "react";
import { Text, TextProps } from "react-native";

type LabelProps = TextProps & {
  children: React.ReactNode;
};

export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <Text
      accessibilityRole="summary"
      className={cn("block pt-2 pb-1 text-sm", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
