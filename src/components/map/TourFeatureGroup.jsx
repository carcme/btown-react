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
import AttractionPopupContents from "./AttractionPopupContents";
import { createMarkerIcon } from "./CustomMarkerIcon";
import { MarkerPopup } from "./MarkerPopup";
import { COLOURS } from "@/data/maps/defaults";
import { MapPopup } from "./map";

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
                    <MapPopup keepInView={false} className="newPopup">
                      <AttractionPopupContents attr={stop} />
                    </MapPopup>
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
