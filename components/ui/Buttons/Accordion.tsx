import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type AccordionProps = {
  label: string;
  id: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
};

export function Accordion({
  label,
  id,
  children,
  isOpen = false,
  onToggle,
}: AccordionProps) {
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(animatedHeight, {
      toValue: isOpen ? contentHeight : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen, contentHeight, animatedHeight]);

  const rotateAnim = animatedHeight.interpolate({
    inputRange: [0, contentHeight],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View className="my-2 rounded-xl bg-gray-200 overflow-hidden">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        className={`flex-row justify-between items-center p-4 bg-gray-400 ${
          isOpen ? "border-b border-gray-300" : ""
        }`}
      >
        <Text numberOfLines={1} className="flex-1 text-base font-semibold">
          {label}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotateAnim }] }}>
          <ChevronDown size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <AnimatedView style={{ height: animatedHeight, overflow: "hidden" }}>
        <View
          onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
          className="p-4 bg-gray-300"
        >
          <Text className="text-black">{children}</Text>
        </View>
      </AnimatedView>
    </View>
  );
}

type AccordionGroupProps = {
  children: React.ReactElement<AccordionProps>[];
  singleOpen?: boolean;
  title: string;
};

export function AccordionGroup({
  children,
  singleOpen = true,
  title,
}: AccordionGroupProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (singleOpen) newSet.clear();
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <View className="my-4">
      <Text className="indent-4 text-3xl font-bold mb-2">{title}</Text>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen: openIds.has(child.props.id),
          onToggle: () => handleToggle(child.props.id),
        })
      )}
    </View>
  );
}
