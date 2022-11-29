import Home from "./pages/Home";
import "./App.css";
import { MapStoresProvider } from "./store/Maps.provider";
import { CDMX_COORDS, INITIAL_ZOOM } from "./constants";

function App() {

  return (
    <>
      <MapStoresProvider initialZoom={INITIAL_ZOOM} initialCenter={CDMX_COORDS}>
        <Home />
      </MapStoresProvider>
    </>
  );
}

export default App;
