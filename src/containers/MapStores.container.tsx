import { useEffect, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { AsideMap, MyMap, MyMarker } from "../components/Map";
import { icons } from "../constants";
import { IStore, MapStoresContainerProps } from "../types";

import styles from "./MapStores.container.module.css";
import { useMapStores } from "../store/Maps.context";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

export const MapStores = () => {

  const { activeStore, setActiveStore, allStores, center, zoom, addFavorite, removeFavorite } = useMapStores()
  const [listStores, setListStores] = useState<IStore[]>(allStores)

  const handleSearch = (searchValue: string) => {
    if (searchValue === "") return setListStores(allStores);
    let filteredStores = allStores.filter((store) => {
      if (activeStore?.id === store.id) return true;
      let match = store.name.toLowerCase().includes(searchValue.toLowerCase());
      if (!match) match = store.address.toLowerCase().includes(searchValue.toLowerCase());
      return match;
    });
    setListStores(filteredStores);
  };

  useEffect(() => setListStores(allStores), [allStores]);
  
  return (
    <div className={styles.container_map}>
      <div className={styles.container_map__main}>
        <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY!} render={render}>
          <MyMap
            center={center}
            zoom={zoom}
            className={styles.map}
            onSearch={handleSearch}
          >
            {listStores.map((store) => (
              <MyMarker
                key={store.id}
                position={store.coords}
                title={store.name}
                clickable={true}
                icon={
                  icons[
                    store.id === activeStore?.id
                      ? "selected"
                      : store.isFavorite
                        ? "favorite"
                        : "default"
                  ].icon
                }
                handleClick={() => setActiveStore(store)}
              />
            ))}
          </MyMap>
        </Wrapper>
      </div>
      <AsideMap
        store={activeStore || null}
        handleFavorite={() => activeStore?.isFavorite ? removeFavorite(activeStore) : addFavorite(activeStore!)}
        onClose={() => setActiveStore(null)}
      />
    </div>
  );
};

export default MapStores;
