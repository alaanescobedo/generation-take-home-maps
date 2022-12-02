import { FavoriteStore } from "../components/Map";
import { InputSearch } from "../components/Form";

import styles from "./FavoriteStores.container.module.css";
import { IStore } from "../types";
import { GO_TO_ZOOM } from "../constants";
import { useMap, useStores } from "../store";
import { useEffect, useState } from "react";
import { searchStore } from "../utils/search-store";
import { Button } from "../components/Button";

export const FavoriteStoresContainer = () => {
  const { favoriteStores, setActiveStore, removeFavorite, clearFavorites } = useStores()
  const { setCenter, setZoom } = useMap()

  const [results, setResults] = useState<IStore[]>(favoriteStores)
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    if (!searchValue) return setResults(favoriteStores)
    const results = searchStore(searchValue, favoriteStores, null)
    setResults(results)
  }, [searchValue, favoriteStores])

  const handleGoToStore = (store: IStore) => {
    setCenter({ lat: store.coords.lat, lng: store.coords.lng });
    setZoom(GO_TO_ZOOM);
    setActiveStore(store);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <h2 className={styles.title} >Favorite Stores</h2>
        <div className={`${styles.container_search}`}>
          <Button variant="primary" size="md" label="Clear all" onClick={clearFavorites} />
          <div style={{ flex: 1 }}>
            <InputSearch onChange={setSearchValue} />
          </div>
        </div>
      </div>

      {results.length === 0 && (
        <p style={{ fontSize: "1.6rem", color: "#ccc", textAlign: "center" }}>
          Add your favorite stores
        </p>
      )}
      {results.length > 0 && (
        <div className={styles.container_list}>
          {results.map((store, i) => (
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

