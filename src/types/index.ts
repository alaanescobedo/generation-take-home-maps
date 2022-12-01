import type { CSSProperties } from "react";

export interface IDataStore {
  Name: string;
  Address: string;
  Coordinates: { lat: number; lng: number };
}
export interface IStore {
  id: number;
  name: string;
  address: string;
  coords: { lat: number; lng: number };
  isFavorite: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "info" | "danger";
  size?: "sm" | "md";
}

export interface InputSearchProps {
  onChange: (value: string) => void;
}

export interface MyMarkerProps {
  handleClick: () => void;
}

export interface MapProps extends google.maps.MapOptions {
  style?: CSSProperties;
  className?: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  onSearch?: (value: string) => void;
}

export interface AsideMapProps {
  store: IStore | null;
  handleFavorite: () => void;
  onClose: () => void;
}

export interface FavoriteStoreProps {
  name: string;
  address: string;
  onClickRemove?: () => void;
  onClickGo?: () => void;
}

export interface MapStoresContainerProps {

}

export interface FavoriteStoresContainerProps {
  handleGoToStore: (store: IStore) => void;
  handleRemoveFavorite: (store: IStore) => void;
}
