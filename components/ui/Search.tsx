import { RestaurantService } from "@/api/api.restaurant";
import { getCity } from "@/storage/city";
import { MenuItems } from "@/types/menuItem";
import { Restaurants } from "@/types/restaurant";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import SearchModal from "../Modals/searchModal";
import PrimaryButton from "./Buttons/PrimaryButton";

export default function Search() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const savedCity = await getCity();
      setCity(savedCity);
    })();
  }, []);
  //   const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading, isError, error } = useQuery<
    { menuItems: MenuItems[]; restaurants: Restaurants[] },
    AxiosError
  >({
    queryKey: ["search", query],
    queryFn: () => RestaurantService.searchCombined(city || "", query),
    enabled: !!query.trim(),
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mr-3">
      <PrimaryButton
        variant="ghost"
        size="icon"
        className="flex items-center space-x-2 rounded-lg"
        onPress={() => setIsOpen(true)}
      >
        <SearchIcon className="size-5" />
      </PrimaryButton>
      <SearchModal
        query={query}
        isMobileSearchOpen={isOpen}
        setIsMobileSearchOpen={setIsOpen}
        setQuery={setQuery}
        isLoading={isLoading}
        results={data}
      ></SearchModal>
    </View>
  );
}
