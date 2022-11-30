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

  const handleRemoveFavorite = (store: IStore, displayStores: IStore[]) => {
    const updatedFavorites = displayStores.map((storeItem) => {
      if (storeItem.id === store.id) storeItem.isFavorite = false;
      return storeItem;
    })
    setFavoriteStores(favoriteStores.filter((s) => s.name !== store.name));
    setAllStores(updatedFavorites)
  };

  const handleAddFavorite = (store: IStore, displayStores: IStore[]) => {
    if (favoriteStores.some(({ id }) => id === store.id)) return;

    const updatedFavorites = displayStores.map((storeItem) => {
      if (storeItem.id === store.id) storeItem.isFavorite = true;
      return storeItem;
    })
    setFavoriteStores([...favoriteStores, store]);
    setAllStores(updatedFavorites);
  };

  return (
    <MapContext.Provider value={{
      center,
      zoom,
      setCenter,
      setZoom,
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
        removeFavorite: handleRemoveFavorite
      }}>
        {children}
      </StoresContext.Provider>
    </MapContext.Provider>
  )
}
