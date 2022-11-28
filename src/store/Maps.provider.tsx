import { useState, ReactNode } from "react";
import { useLocalStorage } from "../hooks";
import { IStore } from "../types";
import { MapStoresContext } from "./Maps.context";

interface MapStoresProviderProps {
  children: ReactNode;
  stores?: IStore[];
  initialZoom?: number;
  initialCenter?: { lat: number; lng: number };
}

const defaultCenter = { lat: 0, lng: 0 };
export const MapStoresProvider = ({ children, stores = [], initialZoom = 12, initialCenter = defaultCenter }: MapStoresProviderProps) => {

  const [allStores, setAllStores] = useState(stores)
  const [activeStore, setActiveStore] = useState<IStore | null>(null)
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(initialCenter);

  const [favoriteStores, setFavoriteStores] = useLocalStorage<IStore[]>(
    "fav_stores", []
  );

  const handleRemoveFavorite = (store: IStore) => {
    const updatedFavorites = allStores.map((storeItem) => {
      if (storeItem.id === store.id) storeItem.isFavorite = false;
      return storeItem;
    })
    setFavoriteStores(favoriteStores.filter((s) => s.name !== store.name));
    setAllStores(updatedFavorites)
  };

  const handleAddFavorite = (store: IStore) => {
    if (favoriteStores.some(({ id }) => id === store.id)) return;

    const updatedFavorites = allStores.map((storeItem) => {
      if (storeItem.id === store.id) storeItem.isFavorite = true;
      return storeItem;
    })
    setFavoriteStores([...favoriteStores, store]);
    setAllStores(updatedFavorites);
  };

  return (
    <MapStoresContext.Provider value={{
      activeStore,
      allStores,
      favoriteStores,
      center,
      zoom,
      setActiveStore,
      setAllStores,
      setCenter,
      setFavoriteStores,
      setZoom,
      addFavorite: handleAddFavorite,
      removeFavorite: handleRemoveFavorite
    }}
    >
      {children}
    </MapStoresContext.Provider>
  )
}
