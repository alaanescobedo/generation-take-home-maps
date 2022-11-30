import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface IMapContext {
  zoom: number
  setZoom: Dispatch<SetStateAction<number>>
  center: google.maps.LatLngLiteral
  setCenter: Dispatch<SetStateAction<google.maps.LatLngLiteral>>
}

export const MapContext = createContext<IMapContext | null>(null)

export const useMap = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error("Cannot use 'useMap' outside of 'MapStoresProvider'")
  }
  return context
}