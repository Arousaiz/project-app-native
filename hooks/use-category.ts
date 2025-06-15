import { useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

type Params = {
  categoryRefs: React.MutableRefObject<Record<string, number>>;
  onIntersect: (category: string) => void;
  headerHeight?: number;
};

export function useCategoryIntersectionObserver({
  categoryRefs,
  onIntersect,
  headerHeight = 50,
}: Params) {
  const lastCategoryRef = useRef<string | null>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    const visibleCategory = Object.entries(categoryRefs.current)
      .filter(([_, y]) => y <= scrollY + headerHeight)
      .sort((a, b) => b[1] - a[1]) // взять ближайшую сверху
      .at(0)?.[0];

    if (visibleCategory && lastCategoryRef.current !== visibleCategory) {
      lastCategoryRef.current = visibleCategory;
      onIntersect(visibleCategory);
    }
  };

  return { handleScroll };
}
