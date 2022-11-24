import { useState } from "react";
import { FavoriteStore } from "../components/Map";
import { InputSearch } from "../components/Form";

import styles from "./FavoriteStores.container.module.css";
import { FavoriteStoresContainerProps } from "../types";

const FavoriteStoresContainer = ({
  stores,
  handleGoToStore,
  handleRemoveFavorite,
  onSearch,
}: FavoriteStoresContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <h2>Favorite Stores</h2>
        <div className={styles.container_search}>
          <InputSearch onChange={onSearch} onLoading={handleOnLoading} />
        </div>
      </div>

      {isLoading && (
        <p style={{ fontSize: "1rem", color: "#fff" }}>Loading...</p>
      )}

      {stores.length === 0 && (
        <p style={{ fontSize: "1.6rem", color: "#ccc", textAlign: "center" }}>
          Add your favorite stores
        </p>
      )}
      {stores.length > 0 && (
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
      )}
    </div>
  );
};

export default FavoriteStoresContainer;
