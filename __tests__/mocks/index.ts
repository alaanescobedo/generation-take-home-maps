import { IStore } from "../../src/types";

export const storeMock: IStore = {
  id: 1,
  name: 'name',
  address: 'address',
  coords: { lat: 10, lng: 10 },
  isFavorite: false,
}