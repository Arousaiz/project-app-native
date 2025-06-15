import React from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");

type AppCarouselProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  itemWidth?: number;
  itemMargin?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function AppCarousel<T>({
  data,
  renderItem,
  itemWidth = width * 0.7,
  itemMargin = 6,
  containerStyle,
}: AppCarouselProps<T>) {
  return (
    <View style={[{ paddingVertical: 20 }, containerStyle]}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + itemMargin * 2}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: itemMargin }}
        renderItem={({ item, index }) => (
          <View style={{ width: itemWidth, marginHorizontal: itemMargin }}>
            {renderItem({ item, index, separators: {} })}
          </View>
        )}
      />
    </View>
  );
}
