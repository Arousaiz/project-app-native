import React, { useState } from "react";
import { Switch, Text, View } from "react-native";

export default function ToggleExample() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <View className="flex-row items-center">
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#ea580c" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text className="ml-2 text-base">{isEnabled ? "On" : "Off"}</Text>
    </View>
  );
}
