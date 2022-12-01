import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { IStore } from "../types";

interface IStoresContext {
  activeStore: IStore | null
  setActiveStore: Dispatch<SetStateAction<IStore | null>>
  allStores: IStore[]
  setAllStores: Dispatch<SetStateAction<IStore[]>>
  favoriteStores: IStore[]
  setFavoriteStores: (store: IStore[]) => void
  removeFavorite: (store: IStore) => void
  addFavorite: (store: IStore) => void
}

export const StoresContext = createContext<IStoresContext | null>(null)

export const useStores = () => {
  const context = useContext(StoresContext)
  if (!context) {
    throw new Error("Cannot use 'useStores' outside of 'MapStoresProvider'")
  }
  return context
}