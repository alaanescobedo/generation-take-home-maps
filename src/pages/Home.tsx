import { MapStores, FavoriteStoresContainer } from "../containers";
import { PillGithub } from "../components/Pill/PillGithub";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { createStore } from "../models";
import { IDataStore } from "../types";

import data from '../store_directory.json'
import { useMapStores } from "../store/Maps.context";

export const Home = () => {

  const { setAllStores, favoriteStores } = useMapStores()

  useEffect(() => {
    const dataMarkers = data.map((dataStore: IDataStore, i) => {
      const myStore = createStore(i, dataStore);

      favoriteStores.forEach((favStore) => {
        if (myStore.id === favStore.id) myStore.isFavorite = true
      })
      return myStore
    });

    setAllStores(dataMarkers)
  }, [])

  return (
    <div className={`App ${styles.container}`}>
      <MapStores />
      <FavoriteStoresContainer />
      <footer style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
        <PillGithub />
      </footer>
    </div>
  );
};

export default Home;
