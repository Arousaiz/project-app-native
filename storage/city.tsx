import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const DEFAULT_CITY = "Гродно";

const CITY_KEY = "selected_city";

type CityContextType = {
  city: string | null;
  setCity: (city: string) => void;
};

const CityContext = createContext<CityContextType>({
  city: null,
  setCity: () => {},
});

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCityState] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(CITY_KEY).then((storedCity) => {
      if (storedCity) {
        setCityState(storedCity);
      } else {
        setCityState(DEFAULT_CITY);
        AsyncStorage.setItem(CITY_KEY, DEFAULT_CITY);
      }
    });
  }, []);

  const setCity = async (newCity: string) => {
    await AsyncStorage.setItem(CITY_KEY, newCity);
    setCityState(newCity);
  };

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
