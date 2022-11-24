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
  isFavorite: boolean | null;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "info" | "danger";
  size?: "sm" | "md";
}

export interface InputSearchProps {
  onChange: (value: string) => void;
  onLoading: (value: boolean) => void;
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
  onSearch: (value: string) => void;
}

export interface AsideMapProps {
  name: string | null;
  address: string | null;
  coords: { lat: number; lng: number } | null;
  isFavorite: boolean;
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
  children: React.ReactNode;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  activeStore: IStore | null;
  handleFavorite: (store: IStore) => void;
  handleCloseAside: () => void;
  onSearch: (value: string) => void;
  onLoading?: (value: boolean) => void;
}

export interface FavoriteStoresContainerProps {
  stores: IStore[];
  handleGoToStore: (store: IStore) => void;
  handleRemoveFavorite: (store: IStore) => void;
  onSearch: (value: string) => void;
}
