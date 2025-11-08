import React from "react";

import { PawPrintIcon } from "lucide-react";
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Marker,
  Popup,
  Rectangle,
} from "react-leaflet";
import TourPopup from "./TourPopup";
import TourCard from "./AttractionPopupContents";
import { createMarkerIcon } from "./CustomMarkerIcon";
import { MarkerPopup } from "./MarkerPopup";
import { COLOURS } from "@/data/maps/defaults";

const iconColors = [
  "#cc1b0e",
  "#167a1d",
  "#a1a115",
  "#fcba03",
  "#ad28de",
  "#2000db",
];

const TourFeatureGroup = ({ tours, ...props }) => {
  return (
    <>
      <LayersControl position="bottomleft" collapsed={true}>
        {tours?.map((tour, index) => {
          return (
            <LayersControl.Overlay
              key={tour.tourName}
              checked
              name={tour.tourName}
            >
              <FeatureGroup>
                {tour.attractions.map((stop) => (
                  <Marker
                    key={stop.id}
                    icon={createMarkerIcon(COLOURS[index].hex)}
                    position={[stop.location.lat, stop.location.lng]}
                  >
                    <Popup keepInView={true} className="newPopup">
                      {/* <TourPopup attr={stop} /> */}
                      <TourCard attr={stop} />
                    </Popup>
                  </Marker>
                ))}
              </FeatureGroup>
            </LayersControl.Overlay>
          );
        })}
      </LayersControl>
    </>
  );
};

export default TourFeatureGroup;
