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
import inputStyles from "../../containers/FavoriteStores.container.module.css";

export const MyMap = ({
  onClick,
  onIdle,
  children,
  style,
  className,
  center,
  zoom,
  onSearch,
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
    }
  }, [map, center, zoom]);

  return (
    <>
      <div ref={ref} className={className} style={{ ...style }} />
      <div className={inputStyles.container_search}>
        <InputSearch onChange={onSearch} onLoading={() => {}} />
      </div>
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
