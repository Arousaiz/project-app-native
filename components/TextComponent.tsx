import { Text } from "react-native";

export function TextComponent({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) {
  const defaultStyles = "";
  return <Text className={`${defaultStyles} ${className}`}></Text>;
}
