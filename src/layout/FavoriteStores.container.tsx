import { useState } from "react";

import styles from "./FavoriteStores.container.module.css";
import FavoriteStore from "../components/Map/FavoriteStore";
import { IStore } from "../types";
import InputSearch from "../components/Form/Search/InputSearch";

interface FavoriteStoresContainerProps {
  stores: IStore[];
  handleGoToStore: (store: IStore) => void;
  handleRemoveFavorite: (store: IStore) => void;
  onSearch: (value: string) => void;
}
const FavoriteStoresContainer = ({
  stores,
  handleGoToStore,
  handleRemoveFavorite,
  onSearch,
}: FavoriteStoresContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnLoading = (value: boolean) => {
    setIsLoading(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <h2>Fav Stores</h2>
        <div className={styles.container_search} >
          <InputSearch
            onChange={onSearch}
            onLoading={handleOnLoading}
          />
        </div>
      </div>

      {isLoading && <p style={{ fontSize: '1rem', color: '#fff' }}>Loading...</p>}

      <div className={styles.container_list}>
        {stores.map((store, i) => (
          <FavoriteStore
            key={i}
            address={store.address}
            name={store.name}
            onClickGo={() => handleGoToStore(store)}
            onClickRemove={() => handleRemoveFavorite(store)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteStoresContainer;
