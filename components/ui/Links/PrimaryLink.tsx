import { cn } from "@/utils/utils";
import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { Linking, Text, TouchableOpacity, ViewStyle } from "react-native";

type PrimaryLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  size?: "sm" | "md" | "lg";
  nav?: boolean;
  style?: ViewStyle;
};

export function PrimaryLink({
  to,
  children,
  className,
  external,
  size = "md",
  nav = false,
  style,
}: PrimaryLinkProps) {
  const router = useRouter();

  const sizeMap = {
    sm: "text-xs gap-1",
    md: "text-sm gap-1.5",
    lg: "text-base gap-2",
  };

  const common = cn(
    "flex-row items-center font-medium text-foreground transition-all ",
    "hover:text-primary", // nativewind поддерживает hover в Web
    sizeMap[size],
    className
  );

  const handlePress = () => {
    if (external) {
      Linking.openURL(to);
    } else {
      router.push(to as any);
    }
  };

  return (
    <TouchableOpacity className={common} onPress={handlePress} style={style}>
      <Text className="text-inherit underline">{children}</Text>
    </TouchableOpacity>
  );
}
