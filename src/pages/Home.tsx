import { MapStores, FavoriteStoresContainer } from "../containers";
import { PillGithub } from "../components/Pill/PillGithub";
import styles from "./Home.module.css";

export const Home = () => {
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
