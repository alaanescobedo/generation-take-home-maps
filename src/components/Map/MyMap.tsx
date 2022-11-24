import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

interface MapProps extends google.maps.MapOptions {
  style?: CSSProperties;
  className?: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const MyMap = ({
  onClick,
  onIdle,
  children,
  style,
  className,
  center,
  zoom,
  ...options
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          ...options,
        })
      );
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
