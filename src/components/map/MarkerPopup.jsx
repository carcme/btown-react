import React from "react";
import { Marker, Popup } from "react-leaflet";
import TourCard from "./AttractionPopupContents";
import { createMarkerIcon } from "./CustomMarkerIcon";

const iconColors = [
  "#cc1b0e",
  "#167a1d",
  "#a1a115",
  "#fcba03",
  "#ad28de",
  "#2000db",
];
export const MarkerPopup = ({ stop, index }) => {
  return (
    <Marker
      key={stop.id}
      icon={createMarkerIcon(iconColors[index])}
      position={[stop.location.lat, stop.location.lng]}
    >
      <Popup keepInView={true} className="newPopup">
        {/* <TourPopup attr={stop} /> */}
        <TourCard attr={stop} />
      </Popup>
    </Marker>
  );
};
