import { FavoritesService } from "@/api/api.favorites";
import { Favorites } from "@/types/favorite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./authContext";

type FavoritesContextType = {
  favorites: Favorites[];
  isLoading: boolean;
  isFavorite: (menuItemId: string) => boolean;
  toggleFavorite: (menuItemId: string, restaurantId?: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchFavoritesSafe = async (): Promise<Favorites[]> => {
    try {
      return await FavoritesService.fetchFavorites();
    } catch (error) {
      console.error("Error fetching favorites", error);
      return [];
    }
  };

  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery<Favorites[]>({
    queryKey: ["favorites"],
    queryFn: fetchFavoritesSafe,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: FavoritesService.createFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: FavoritesService.deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const isFavorite = (menuItemId: string) =>
    favorites.some((f) => f.menuItem?.id === menuItemId);

  const toggleFavorite = (menuItemId: string, restaurantId?: string) => {
    const existing = favorites.find((f) => f.menuItem?.id === menuItemId);
    if (existing) {
      removeFavoriteMutation.mutate(existing.id);
    } else {
      addFavoriteMutation.mutate({ menuItemId, restaurantId });
    }
  };

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
};
