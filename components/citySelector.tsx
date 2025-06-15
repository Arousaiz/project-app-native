import { getCity, saveCity } from "@/storage/city";
import { ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CitySelectModal from "./Modals/CitySelectModal";
import PrimaryButton from "./ui/Buttons/PrimaryButton";

export function CitySelector() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const savedCity = await getCity();
      if (savedCity) {
        setCity(savedCity);
      } else {
        setMobileMenuOpen(true);
      }
    })();
  }, []);

  return (
    <View>
      <PrimaryButton
        variant="ghost"
        onPress={() => setMobileMenuOpen(true)}
        className=""
      >
        <View className="flex flex-row justify-center items-center">
          <Text>{city}</Text>
          <ChevronDown className="ml-1 my-0.5 size-5" />
        </View>
      </PrimaryButton>
      <CitySelectModal
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        city={city}
        setCity={(str: string) => {
          setCity(str);
          saveCity(str);
        }}
      ></CitySelectModal>
    </View>
  );
}
