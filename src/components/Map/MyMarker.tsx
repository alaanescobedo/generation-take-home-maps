import { useEffect, useState } from "react";
import { MyMarkerProps } from "../../types";

const DEFAULT_SIZE = 50;
export const MyMarker = ({
  handleClick,
  icon,
  ...options
}: MyMarkerProps & google.maps.MarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      marker.setIcon({
        url: icon as string,
        scaledSize: new google.maps.Size(DEFAULT_SIZE, DEFAULT_SIZE),
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<p style="color: #242424; font-weight: bold;">${options.title}</p>`,
      });
      marker.addListener("click", handleClick);
      marker.addListener("mouseover", () => {
        infoWindow.open(marker.getMap(), marker);
      });
      marker.addListener("mouseout", () => {
        infoWindow.close();
      });
      infoWindow.addListener("closeclick", () => {
        infoWindow.close();
      });
    }
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setIcon({
        url: icon as string,
        scaledSize: new google.maps.Size(DEFAULT_SIZE, DEFAULT_SIZE),
      });
    }
  }, [icon]);

  return null;
};
export default MyMarker;
