import Home from "./pages/Home";
import "./App.css";
import { MapStoresProvider } from "./store/Maps.provider";
import data from "./store_directory.json";
import { createStore } from "./models";
import { IDataStore } from "./types";

const dataMarkers = data.map((store: IDataStore, i) => {
  return createStore(i, store);
});
function App() {

  return (
    <>
      <MapStoresProvider stores={dataMarkers}  >
        <Home />
      </MapStoresProvider>
    </>
  );
}

export default App;
