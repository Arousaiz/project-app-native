import { cn } from "@/utils/utils";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
} from "react-native";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "text";

type ButtonSize = "sm" | "md" | "lg" | "icon";

type PrimaryButtonProps = PressableProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
  style?: StyleProp<TextStyle>;
};

export default function PrimaryButton({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  onPress,
  children,
  className,
  textClassName,
  ...pressableProps
}: PrimaryButtonProps) {
  const variantStyles = {
    primary: "bg-primary text-primary-foreground shadow-xs",
    destructive: "bg-destructive text-white shadow-xs dark:bg-destructive/60",
    outline:
      "border bg-background shadow-xs dark:bg-input/30 dark:border-input",
    secondary: "bg-secondary text-secondary-foreground shadow-xs",
    ghost: "hover:bg-accent dark:hover:bg-accent/50 ",
    text: "",
  };

  const sizeStyles = {
    md: "h-9 px-4 py-2",
    sm: "h-8 px-3 py-1.5",
    lg: "h-10 px-6",
    icon: "h-9 w-9 rounded-full justify-center items-center",
  };

  const disabledStyles = isLoading || disabled ? "opacity-70" : "";

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading || disabled}
      className={cn(
        "inline-flex flex-row items-center justify-center rounded-md",
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        className
      )}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          className={cn(
            "text-sm font-medium",
            variant === "outline" || variant === "ghost"
              ? "text-foreground"
              : "text-background",
            textClassName
          )}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
