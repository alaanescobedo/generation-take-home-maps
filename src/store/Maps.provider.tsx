import { useState, ReactNode } from "react";
import { useLocalStorage } from "../hooks";
import { IStore } from "../types";
import { MapContext } from "./Maps.context";
import { StoresContext } from "./Stores.context";

interface MapStoresProviderProps {
  children: ReactNode;
  stores?: IStore[];
  initialZoom?: number;
  initialCenter?: { lat: number; lng: number };
  initialActiveStore?: IStore | null;
}

const defaultCenter = { lat: 0, lng: 0 };
const defaultZoom = 12;
export const MapStoresProvider = ({ children,
  stores = [],
  initialZoom = defaultZoom,
  initialCenter = defaultCenter,
  initialActiveStore = null }: MapStoresProviderProps) => {

  const [allStores, setAllStores] = useState(stores)
  const [activeStore, setActiveStore] = useState<IStore | null>(initialActiveStore)
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(initialCenter);

  const [favoriteStores, setFavoriteStores] = useLocalStorage<IStore[]>(
    "fav_stores", []
  );

  const handleRemoveFavorite = (storeSelected: IStore) => {
    setFavoriteStores(favoriteStores.filter((s) => s.name !== storeSelected.name));
    setAllStores((prev) => prev.map((store) => store.id === storeSelected.id ? { ...store, isFavorite: false } : store))
    setActiveStore((prev) => prev && prev.id === storeSelected.id ? { ...prev, isFavorite: false } : prev)
  };

  const handleAddFavorite = (storeSelected: IStore) => {
    if (favoriteStores.some(({ id }) => id === storeSelected.id)) return;
    setAllStores((prev) => prev.map((store) => store.id === storeSelected.id ? { ...store, isFavorite: true } : store))
    setActiveStore((prev) => prev && prev.id === storeSelected.id ? { ...prev, isFavorite: true } : prev)
    setFavoriteStores([...favoriteStores, { ...storeSelected, isFavorite: true }]);
  };

  const handleClearFavorites = () => {
    setFavoriteStores([])
    setAllStores((prev) => prev.map((store) => ({ ...store, isFavorite: false })))
    setActiveStore((prev) => prev ? { ...prev, isFavorite: false } : prev)
  }

  return (
    <MapContext.Provider value={{
      center,
      zoom,
      setCenter,
      setZoom
    }}
    >
      <StoresContext.Provider value={{
        activeStore,
        allStores,
        favoriteStores,
        setActiveStore,
        setAllStores,
        setFavoriteStores,
        addFavorite: handleAddFavorite,
        removeFavorite: handleRemoveFavorite,
        clearFavorites: handleClearFavorites
      }}>
        {children}
      </StoresContext.Provider>
    </MapContext.Provider>
  )
}
