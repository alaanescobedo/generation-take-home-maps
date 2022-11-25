import { useState, useEffect } from "react";
import { FavoriteStore } from "../components/Map";
import { InputSearch } from "../components/Form";

import styles from "./FavoriteStores.container.module.css";
import { useMapStores } from "../store/Maps.context";
import { IStore } from "../types";
import { GO_TO_ZOOM } from "../constants";

export const FavoriteStoresContainer = () => {
  const { favoriteStores, activeStore, setCenter, setZoom, setActiveStore, removeFavorite } = useMapStores()
  const [isLoading, setIsLoading] = useState(false);
  const [listStores, setListStores] = useState(favoriteStores)

  useEffect(() => {
    setListStores(favoriteStores)
  }, [favoriteStores])


  const handleOnLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleOnSearch = (searchValue: string) => {
    if (searchValue === "") return setListStores(favoriteStores);
    let filteredStores = favoriteStores.filter((store) => {
      if (activeStore?.id === store.id) return true;
      let match = store.name.toLowerCase().includes(searchValue.toLowerCase());
      if (!match) match = store.address.toLowerCase().includes(searchValue.toLowerCase());
      return match;
    });
    setListStores(filteredStores);
  }

  const handleGoToStore = (store: IStore) => {
    setCenter({ lat: store.coords.lat, lng: store.coords.lng });
    setZoom(GO_TO_ZOOM);
    setActiveStore(store);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <h2 style={{ marginBottom: 0 }} >Favorite Stores</h2>
        <div className={`${styles.container_search} ${styles.ms_auto}`}>
          <InputSearch onChange={handleOnSearch} onLoading={handleOnLoading} />
        </div>
      </div>

      {isLoading && (
        <p style={{ fontSize: "1rem", color: "#fff" }}>Loading...</p>
      )}

      {listStores.length === 0 && (
        <p style={{ fontSize: "1.6rem", color: "#ccc", textAlign: "center" }}>
          Add your favorite stores
        </p>
      )}
      {listStores.length > 0 && (
        <div className={styles.container_list}>
          {listStores.map((store, i) => (
            <FavoriteStore
              key={i}
              address={store.address}
              name={store.name}
              onClickGo={() => handleGoToStore(store)}
              onClickRemove={() => removeFavorite(store)}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default FavoriteStoresContainer;

