import { cn } from "@/utils/utils";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import { Image, TouchableOpacity } from "react-native";

export default function Logo({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/")}
      className={cn("-m-1.5 p-1.5", className)}
    >
      <Image
        source={require("@/assets/logo_temp.png")}
        accessibilityLabel="Food delivery"
        className="h-8 w-32 bg-transparent"
        resizeMode="contain"
      />
      {children}
    </TouchableOpacity>
  );
}
