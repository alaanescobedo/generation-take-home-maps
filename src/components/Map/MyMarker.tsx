import { useEffect, useState } from "react";
import { MyMarkerProps } from "../../types";

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
      marker.setIcon(icon);

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
      marker.setIcon(icon);
    }
  }, [icon]);

  return null;
};
export default MyMarker;
