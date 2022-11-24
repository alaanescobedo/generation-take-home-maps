import { FavoriteStoreProps } from "../../types";
import { Button } from "../Button";

export const FavoriteStore = ({
  name,
  address,
  onClickGo,
  onClickRemove,
}: FavoriteStoreProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#26547C",
        padding: ".8rem",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <div style={{ textAlign: "left" }}>
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
