import { FavoriteStoreProps } from "../../types";
import { Button } from "../Button";

import styles from './FavoriteStore.module.css'

export const FavoriteStore = ({
  name,
  address,
  onClickGo,
  onClickRemove,
}: FavoriteStoreProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__info}>
        <div style={{ fontWeight: "bold" }}>{name}</div>
        <div>{address}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
        <Button
          size="sm"
          variant="primary"
          label="Go To Place"
          onClick={onClickGo}
        />
        <Button
          size="sm"
          variant="danger"
          label="Remove"
          onClick={onClickRemove}
        />
      </div>
    </div>
  );
};

export default FavoriteStore;
