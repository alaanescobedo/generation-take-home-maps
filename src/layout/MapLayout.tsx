import { Status, Wrapper } from "@googlemaps/react-wrapper";
import AsideMap from "../components/Map/AsideMap";
import MyMap from "../components/Map/MyMap";
import { IStore } from "../types";
import styles from "./MapLayout.module.css";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MapLayoutProps {
  children: React.ReactNode;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  activeStore: IStore | null;
  handleFavorite: (store: IStore) => void;
  handleCloseAside: () => void;
}
const MapLayout = ({
  children,
  center,
  zoom,
  activeStore,
  handleFavorite,
  handleCloseAside
}: MapLayoutProps) => {
  return (
    <div className={styles.container_map}>
      <div className={styles.container_map__main}>
        <Wrapper apiKey={import.meta.env.GOOGLE_MAPS_API_KEY} render={render}>
          <MyMap center={center} zoom={zoom} className={styles.map}>
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
