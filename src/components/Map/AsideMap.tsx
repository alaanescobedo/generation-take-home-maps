import Button from "../Button/Button";

import styles from "./AsideMap.module.css";

interface AsideMapProps {
  name: string | null;
  address: string | null;
  coords: { lat: number, lng: number } | null;
  isFavorite: boolean;
  handleFavorite: () => void;
  onClose: () => void;
}
const AsideMap = ({ name, address, coords, isFavorite, handleFavorite, onClose }: AsideMapProps) => {
  const isActive = address !== null;
  const toGoogleMaps = `//maps.google.com?q=${address}, ${name}`

  return (
    <div
      className={`
      ${styles.container}
      ${isActive ? styles.container__active : styles.container__inactive}`
      }
    >
      <div style={{ textAlign: 'end' }}>
        <Button variant="danger" label="X" onClick={onClose} />
      </div>
      <div className={styles.content}>
        <h2>{name}</h2>
        <p>{address}</p>
        <p className={styles.content_cords}>
          <span>Lat:{coords?.lat}</span> - <span>Lng:{coords?.lng}</span>
        </p>
        <a className={styles.content_link} href={toGoogleMaps} target="_blank">View in Google Maps</a>
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
