import Home from "./pages/Home";
import "./App.css";
import { MapStoresProvider } from "./store/Maps.provider";

function App() {

  return (
    <>
      <MapStoresProvider>
        <Home />
      </MapStoresProvider>
    </>
  );
}

export default App;
