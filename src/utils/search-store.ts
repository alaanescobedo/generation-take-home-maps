import { IStore } from "../types";

export const searchStore = (searchValue: string, list: IStore[], activeStore: IStore | null) => {
  if (!searchValue) return list;
  return list.filter((store) => {
    if (activeStore?.id === store.id) return true;
    let match = store.name.toLowerCase().includes(searchValue.toLowerCase());
    if (!match) match = store.address.toLowerCase().includes(searchValue.toLowerCase());
    return match;
  });
}