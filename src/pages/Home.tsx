import { useState, useEffect } from "react";
import MyMarker from "../components/Map/MyMarker";
import { IDataStore, IStore } from "../types";

import data from "../store_directory.json";
import FavoriteStoresContainer from "../layout/FavoriteStores.container";

import styles from "./Home.module.css";
import MapLayout from "../layout/MapLayout";
import { createStore } from "../models/store.model";
import { INITIAL_ZOOM, CDMX_COORDS, GO_TO_ZOOM, icons } from "../constants";

const dataMarkers = data.map((store: IDataStore, i) => {
  return createStore(i, store);
})

export const Home = () => {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(CDMX_COORDS);

  const [allStores, setAllStores] = useState<IStore[]>(dataMarkers);
  const [favoriteStores, setFavoriteStores] = useState<IStore[]>([]);
  const [listFavoriteStores, setListFavoriteStores] = useState<IStore[]>(favoriteStores);
  const [activeStore, setActiveStore] = useState<IStore | null>(null);

  const handleClickMarker = (store: IStore) => {
    setActiveStore(store);
  };

  useEffect(() => {
    setListFavoriteStores(favoriteStores);
  }, [favoriteStores])


  const handleAddFavorite = (store: IStore) => {
    const isFavorite = favoriteStores.some((favoriteStore) => favoriteStore.id === store.id);
    if (isFavorite) return
    setFavoriteStores([...favoriteStores, store]);

    setAllStores(prev => prev.map((storeItem) => {
      if (storeItem.id === store.id) storeItem.isFavorite = true;
      return storeItem;
    }))
  };
  const handleRemoveFavorite = (store: IStore) => {
    setFavoriteStores(favoriteStores.filter((s) => s.name !== store.name));
    setAllStores(prev => prev.map((storeItem) => {
      if (storeItem.id === store.id) storeItem.isFavorite = false;
      return storeItem;
    }))
  };

  const handleGoToStore = (store: IStore) => {
    setCenter({ lat: store.coords.lat, lng: store.coords.lng });
    setZoom(GO_TO_ZOOM);
  };

  const handleRemoveActiveStore = () => {
    setActiveStore(null);
  }

  const handleFavoriteSearch = (searchValue: string) => {
    if (searchValue === '') return setListFavoriteStores(favoriteStores);
    let filteredStores = favoriteStores.filter((store) => {
      let match = store.name.toLowerCase().includes(searchValue.toLowerCase())
      if(!match) match = store.address.toLowerCase().includes(searchValue.toLowerCase())
      return match;
    });
    setListFavoriteStores(filteredStores);
  }

  return (
    <div className={`App ${styles.container}`}>
      <MapLayout
        activeStore={activeStore}
        center={center}
        zoom={zoom}
        handleFavorite={activeStore?.isFavorite ? handleRemoveFavorite : handleAddFavorite}
        handleCloseAside={handleRemoveActiveStore}
      >
        {allStores.map((store, i) => (<MyMarker
          key={i}
          position={store.coords}
          title={store.name}
          clickable={true}
          icon={icons[store.isFavorite ? 'favorite' : 'default'].icon}
          handleClick={() => handleClickMarker(store)}
        />)
        )}
      </MapLayout>
      <FavoriteStoresContainer
        stores={listFavoriteStores}
        handleGoToStore={handleGoToStore}
        handleRemoveFavorite={handleRemoveFavorite}
        onSearch={handleFavoriteSearch}
      />
    </div>
  );
};

export default Home;
