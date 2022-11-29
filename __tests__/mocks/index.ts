import { IStore } from "../../src/types";

export const storeMock: IStore = {
  id: 1,
  name: 'name',
  address: 'address',
  coords: { lat: 10, lng: 10 },
  isFavorite: false
}

export const storeMock2: IStore = {
  id: 2,
  name: 'name2',
  address: 'address2',
  coords: { lat: 20, lng: 20 },
  isFavorite: true
}

export const storeMockArr: IStore[] = [storeMock, storeMock2];
