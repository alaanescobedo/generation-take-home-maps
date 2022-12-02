import { AsideMapProps } from "../../types";
import { Button } from "../Button";
import styles from "./AsideMap.module.css";

export const AsideMap = ({
  store,
  handleFavorite,
  handleStreetView,
  onClose,
}: AsideMapProps) => {
  const isActive = store !== null;
  const toGoogleMaps = `//maps.google.com?q=${store?.address}, ${store?.name}`;
  return (
    <div
      className={`
      ${styles.container}
      ${isActive ? styles.container__active : styles.container__inactive}`}
    >
      {store !== null && (
        <>
          <div className={styles.content}>
            <div style={{ display: "flex", alignItems: "center" }} data-testid="store-info">
              {store.isFavorite && (
                <svg
                  width="20"
                  height="20"
                  fill="#FDD50D"
                  viewBox="0 0 16 16"
                  style={{ display: "flex" }}
                  data-testid="store-star"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              )}
              <h2 className={styles.content__name}>{store.name}</h2>
              <div style={{ textAlign: "end" }}>
                <Button label="X" onClick={onClose} />
              </div>
            </div>

            <p className={styles.content__address} >{store.address}</p>
            <p className={styles.content_cords}>
              <span>Lat:{store.coords?.lat}</span> - <span>Lng:{store.coords?.lng}</span>
            </p>
            <div>
              <Button variant="primary" label="POV" onClick={handleStreetView} style={{ padding: '.6rem 2.4rem' }} />
            </div>
            <a className={styles.content_link} href={toGoogleMaps} target="_blank">
              View in Google Maps
            </a>
          </div>
          <div>
            <Button
              variant="primary"
              size="md"
              label={store.isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={handleFavorite}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AsideMap;
