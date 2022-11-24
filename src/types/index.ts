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