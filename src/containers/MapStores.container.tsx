import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { AsideMap, MyMap } from "../components/Map";
import { MapStoresContainerProps } from "../types";

import styles from "./MapStores.container.module.css";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const MapLayout = ({
  children,
  center,
  zoom,
  activeStore,
  handleFavorite,
  handleCloseAside,
  onSearch,
}: MapStoresContainerProps) => {
  return (
    <div className={styles.container_map}>
      <div className={styles.container_map__main}>
        <Wrapper apiKey={import.meta.env.GOOGLE_MAPS_API_KEY} render={render}>
          <MyMap
            center={center}
            zoom={zoom}
            className={styles.map}
            onSearch={onSearch}
          >
            {children}
          </MyMap>
        </Wrapper>
      </div>
      <AsideMap
        name={activeStore?.name || null}
        address={activeStore?.address || null}
        coords={activeStore?.coords || null}
        isFavorite={activeStore?.isFavorite || false}
        handleFavorite={() => handleFavorite(activeStore!)}
        onClose={handleCloseAside}
      />
    </div>
  );
};

export default MapLayout;
