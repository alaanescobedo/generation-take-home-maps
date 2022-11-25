export const CDMX_COORDS = { lat: 19.42847, lng: -99.12766 };
export const INITIAL_ZOOM = 12;
export const GO_TO_ZOOM = 15;

const iconBase = "https://maps.google.com/mapfiles/kml/paddle/";
export const icons = {
  default: {
    icon: iconBase + "red-circle.png",
  },
  favorite: {
    icon: iconBase + "blu-stars.png",
  },
  selected: {
    icon: iconBase + "orange-blank.png",
  },
};
