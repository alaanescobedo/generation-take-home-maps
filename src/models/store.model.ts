import { IDataStore, IStore } from "../types";

export const createStore = (id: number, store: IDataStore): IStore => {
  const myStore = {
    id: id,
    name: store.Name,
    address: store.Address,
    coords: store.Coordinates,
    isFavorite: false,
  };
  return myStore;
};
