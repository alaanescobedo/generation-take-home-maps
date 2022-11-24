import { AsideMapProps } from "../../types";
import { Button } from "../Button";
import styles from "./AsideMap.module.css";

export const AsideMap = ({
  name,
  address,
  coords,
  isFavorite,
  handleFavorite,
  onClose,
}: AsideMapProps) => {
  const isActive = address !== null;
  const toGoogleMaps = `//maps.google.com?q=${address}, ${name}`;

  return (
    <div
      className={`
      ${styles.container}
      ${isActive ? styles.container__active : styles.container__inactive}`}
    >
      <div style={{ textAlign: "end" }}>
        <Button label="X" onClick={onClose} />
      </div>
      <div className={styles.content}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {isFavorite && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FDD50D"
              viewBox="0 0 16 16"
              style={{ display: "flex" }}
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          )}
          <h2>{name}</h2>
        </div>

        <p>{address}</p>
        <p className={styles.content_cords}>
          <span>Lat:{coords?.lat}</span> - <span>Lng:{coords?.lng}</span>
        </p>
        <a className={styles.content_link} href={toGoogleMaps} target="_blank">
          View in Google Maps
        </a>
      </div>
      <div>
        <Button
          variant="primary"
          size="md"
          label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={handleFavorite}
        />
      </div>
    </div>
  );
};

export default AsideMap;
