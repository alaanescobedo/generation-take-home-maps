import { useState, ReactNode } from "react";
import { CDMX_COORDS, INITIAL_ZOOM } from "../constants";
import { useLocalStorage } from "../hooks";
import { IStore } from "../types";
import { MapStoresContext } from "./Maps.context";

export const MapStoresProvider = ({ children, stores }: { children: ReactNode, stores: IStore[] }) => {

  const [allStores, setAllStores] = useState(stores ?? [])
  const [activeStore, setActiveStore] = useState<IStore | null>(null)
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(CDMX_COORDS);

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





  // const handleAddFavorite = (store: IStore) => {
  //   const isFavorite = favoriteStores.some(({ id }) => id === store.id);
  //   if (isFavorite) return;
  //   setFavoriteStores([...favoriteStores, store]);

  //   setAllStores((prev) =>
  //     prev.map((storeItem) => {
  //       if (storeItem.id === store.id) storeItem.isFavorite = true;
  //       return storeItem;
  //     })
  //   );
  // };

  // const handleRemoveFavorite = (store: IStore) => {
  //   setFavoriteStores(favoriteStores.filter((s) => s.name !== store.name));
  //   setAllStores((prev) =>
  //     prev.map((storeItem) => {
  //       if (storeItem.id === store.id) storeItem.isFavorite = false;
  //       return storeItem;
  //     })
  //   );
  // };

  // const handleGoToStore = (store: IStore) => {
  //   setCenter({ lat: store.coords.lat, lng: store.coords.lng });
  //   setZoom(GO_TO_ZOOM);
  //   // setActiveStore(store);
  // };