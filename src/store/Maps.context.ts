import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { IStore } from "../types";

interface MapStoreContext {
  activeStore: IStore | null
  setActiveStore: Dispatch<SetStateAction<IStore | null>>
  allStores: IStore[]
  setAllStores: Dispatch<SetStateAction<IStore[]>>
  favoriteStores: IStore[]
  setFavoriteStores: (store: IStore[]) => void
  zoom: number
  setZoom: Dispatch<SetStateAction<number>>
  center: google.maps.LatLngLiteral
  setCenter: Dispatch<SetStateAction<google.maps.LatLngLiteral>>
  removeFavorite: (store: IStore) => void
  addFavorite: (store: IStore) => void
}

export const MapStoresContext = createContext<MapStoreContext | null>(null)

export const useMapStores = () => {
  const context = useContext(MapStoresContext)
  if (!context) {
    throw new Error("Cannot use 'useMapStores' outside of 'MapStoresProvider'")
  }
  return context
}