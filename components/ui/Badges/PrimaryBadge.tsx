import React from "react";
import { Text, View, ViewProps } from "react-native";

type BadgeVariant = "primary" | "secondary" | "destructive" | "outline";

type BadgeProps = ViewProps & {
  variant?: BadgeVariant;
  children: React.ReactNode;
};

const variantStyles = {
  primary: "bg-primary border-transparent text-primary-foreground",
  secondary: "bg-secondary border-transparent text-secondary-foreground",
  destructive:
    "bg-destructive border-transparent text-white dark:bg-destructive/60",
  outline: "border border-foreground text-foreground",
};

export default function PrimaryBadge({
  variant = "primary",
  children,
  style,
  ...props
}: BadgeProps) {
  return (
    <View
      className={`${variantStyles[variant]} inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 gap-1`}
      style={style}
      {...props}
    >
      <Text className={`text-xs font-medium`} selectable={false}>
        {children}
      </Text>
    </View>
  );
}
