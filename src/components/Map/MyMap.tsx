import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { MapProps } from "../../types";
import { InputSearch } from "../Form";

export const MyMap = ({
  onClick,
  onIdle,
  children,
  style,
  className,
  center,
  zoom,
  onSearch,
  isStreetView,
  activeCoords,
  ...options
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        ...options,
      });
      setMap(map);
    }
  }, [ref, map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) map.addListener("click", onClick);

      if (onIdle) map.addListener("idle", () => onIdle(map));
    }
  }, [map, onClick, onIdle]);

  useEffect(() => {
    if (map && center && zoom) {
      map.setCenter(center);
      map.setZoom(zoom);

      const panorama = map.getStreetView();
      const toogle = panorama.getVisible();
      if (toogle === true) {
        panorama.setPosition(center);
        panorama.setVisible(true);
      }
    }
  }, [map, center, zoom]);

  useEffect(() => {
    const panorama = map?.getStreetView();
    if (!panorama || !activeCoords) return;

    panorama.setPosition({ lat: activeCoords.lat, lng: activeCoords.lng });
    panorama.setPov({ heading: 265, pitch: 0, });
    const toogle = panorama?.getVisible();

    if (toogle === false) panorama.setVisible(true);
    else panorama.setVisible(false);

  }, [isStreetView]);

  return (
    <>
      <div ref={ref} className={className} style={{ ...style }} />
      {onSearch && (
        <div style={{ marginTop: '6rem', maxWidth: '160px', marginLeft: 'auto', alignSelf: 'baseline', marginRight: '1rem' }} >
          <InputSearch onChange={onSearch} />
        </div>
      )}
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};
export default MyMap;
