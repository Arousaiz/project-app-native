import { cn } from "@/utils/utils";
import { View, ViewProps } from "react-native";

export function Card({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        "bg-card text-card-foreground rounded-xl border border-border shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn("px-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View className={cn("flex-row items-center px-4", className)} {...props} />
  );
}
