import AsyncStorage from "@react-native-async-storage/async-storage";

const CITY_KEY = "selected_city";

export async function saveCity(city: string) {
  await AsyncStorage.setItem(CITY_KEY, city);
}

export async function getCity(): Promise<string | null> {
  return await AsyncStorage.getItem(CITY_KEY);
}
