import { useEffect, useState } from "react";
import { Wrapper } from "../components/Map";
import { AsideMap, MyMap, MyMarker } from "../components/Map";
import { icons } from "../constants";

import styles from "./MapStores.container.module.css";
import { useMap, useStores } from "../store";
import { IStore } from "../types";
import { searchStore } from "../utils/search-store";
import { Spinner } from "../components/Feedback";

export const MapStores = () => {

  const { activeStore, setActiveStore, allStores, addFavorite, removeFavorite } = useStores()
  const { center, zoom } = useMap();

  const [results, setResults] = useState<IStore[]>(allStores)
  const [searchValue, setSearchValue] = useState<string>("")
  const [isStreetView, setIsStreetView] = useState<boolean>(false)

  useEffect(() => {
    if (!searchValue) return setResults(allStores)
    const results = searchStore(searchValue, allStores, activeStore)
    setResults(results)
  }, [searchValue, allStores, activeStore])

  return (
    <div className={styles.container_map}>
      <div className={styles.container_map__main}>
        <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY!} render={Spinner}>
          <MyMap
            center={center}
            zoom={zoom}
            className={styles.map}
            isStreetView={isStreetView}
            onSearch={setSearchValue}
            activeCoords={activeStore?.coords}
          >
            {results.map((store) => (
              <MyMarker
                key={store.id}
                position={store.coords}
                title={store.name}
                clickable={true}
                icon={icons[
                  store.id === activeStore?.id
                    ? "selected"
                    : store.isFavorite
                      ? "favorite"
                      : "default"
                ]}
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
        handleStreetView={() => setIsStreetView(!isStreetView)}
      />
    </div>
  );
};

export default MapStores;
