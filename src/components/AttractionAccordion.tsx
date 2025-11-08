import { useEffect, useState } from "react";
import {
  type LatLngBoundsExpression,
  type LatLngExpression,
} from "leaflet";
import { Accordion } from "./ui/accordion";
import InnerHTMLTxt from "@/components/InnerHTMLTxt";
import { getAttraction, type Attraction } from "@/state/tours";

import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import { MapZoomControl } from "@/components/mapControls";
import { MapTileLayer } from "@/components/map/map";
import RoutingMachine from "@/components/map/RoutingMachine";
import { createMarkerIcon } from "@/components/map/CustomMarkerIcon";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { ChevronRight, Route } from "lucide-react";
import { Link } from "@tanstack/react-router";
import UserLocation from "./map/UserLocation";

interface AttractionAccordionProps {
  tourId: number;
  attractionId: number;
  lang: string;
}

export interface AccordionProps {
  array: string[];
  title: string;
  nextStop?: Attraction;
}

const AttractionAccordion = ({
  tourId = 0,
  attractionId = 0,
  lang = "en",
}: AttractionAccordionProps) => {
  const attr = getAttraction(tourId, attractionId, lang);
  const nextStop = getAttraction(tourId, attractionId + 1, lang);
  const extrasTitle = tourId === 0 ? "Myths and Legends" : "Extra";

  const values = [
    "History",
    "Quite Interesting",
    "Eyes Open",
    extrasTitle,
    "Next Stop",
  ];
  return (
    <>
      <Accordion type="multiple" className="w-full " defaultValue={values}>
        {attr?.stopInfo.history && (
          <InnerHTMLTxt array={attr?.stopInfo.history} title="History" />
        )}

        {attr?.stopInfo.qi && (
          <InnerHTMLTxt array={attr?.stopInfo.qi} title="Quite Interesting" />
        )}

        {attr?.stopInfo.look_out && (
          <InnerHTMLTxt array={attr?.stopInfo.look_out} title="Eyes Open" />
        )}

        {attr?.stopInfo.extra?.length != undefined &&
          attr?.stopInfo.extra?.length > 0 && (
            <InnerHTMLTxt array={attr?.stopInfo.extra} title={extrasTitle} />
          )}

        {attr?.stopInfo.next_stop && (
          <div>
            <InnerHTMLTxt array={attr?.stopInfo.next_stop} title="Next Stop" />
          </div>
        )}
        {attr?.stopInfo && (
          <NextStopMap tourId={tourId} attr={attr} nextStop={nextStop} />
        )}
      </Accordion>
    </>
  );
};

export default AttractionAccordion;

interface MapProps {
  tourId: number;
  attr: Attraction;
  nextStop: Attraction | undefined;
}

const NextStopMap = ({ tourId, attr, nextStop }: MapProps) => {
  const [routing, setRouting] = useState<boolean>(false);

  const performRouting = () => {
    setRouting(true);
  };

  const resetRouting = () => {
    setRouting(false);
  };

  return (
    nextStop && (
      <div>
        <MapContainer
          className="h-56 md:h-96 md:w-3xl mx-auto z-10"
          center={attr.location}
          zoom={18}
          zoomControl={false}
          scrollWheelZoom={true}
        >
          <FitBounds
            southWest={attr?.location}
            northEast={nextStop?.location}
          />

          <UserLocation />
          <MapTileLayer />
          <MapZoomControl
            crosshair
            className="top-auto right-4 bottom-4 left-auto"
          />
          <Marker
            key={attr.stopName}
            position={attr.location as LatLngExpression}
            title={attr.stopName}
            icon={createMarkerIcon("#e95900", "")}
            riseOnHover={true}
          >
            <Popup>
              <div className="flex flex-col rounded bg-orange-500 p-4 dark:bg-orange-700 w-36">
                <p className="text-lg">
                  <b>{attr.stopName}</b>
                </p>
                <p className="text-xs">{attr.busStop}</p>
              </div>
            </Popup>
          </Marker>
          {nextStop && (
            <Marker
              key={nextStop.stopName}
              position={nextStop.location as LatLngExpression}
              title={nextStop.stopName}
              icon={createMarkerIcon("#008000", "")}
              riseOnHover={true}
            >
              <Popup>
                <div className="flex flex-col rounded bg-orange-500 p-4 dark:bg-orange-700 w-36">
                  <p className="text-lg">
                    <b>{nextStop.stopName}</b>
                  </p>
                  <p className="text-xs">{nextStop.busStop}</p>
                </div>
              </Popup>
            </Marker>
          )}
          {routing && nextStop && (
            <RoutingMachine
              from={attr.location}
              to={nextStop.location}
            />
          )}
        </MapContainer>
        <div className="flex justify-end pt-2 max-w-3xl mx-auto">
          <ButtonGroup>
            <Button
              variant="outline"
              disabled={routing}
              onClick={performRouting}
              className={`shrink-0 bg-transparent rounded-full ${attr.end ? "text-muted hover:text-muted " : ""}`}
            >
              <Route />
            </Button>
            <ButtonGroupSeparator />
            <Button
              asChild
              size="icon"
              variant="outline"
              disabled={attr.end}
              onClick={resetRouting}
              className={`shrink-0 bg-transparent rounded-full ${attr.end ? "text-muted hover:text-muted " : ""}`}
            >
              <Link
                to="/attractions/$tourId/$attractionId"
                params={{
                  tourId: tourId.toString(),
                  attractionId: (attr.id + 1).toString(),
                }}
              >
                <ChevronRight />
              </Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    )
  );
};

const FitBounds = ({
  southWest,
  northEast,
}: {
  southWest: LatLngExpression;
  northEast: LatLngExpression;
}) => {
  const box = [southWest, northEast] as LatLngBoundsExpression;

  const map = useMap();
  useEffect(() => {
    if (!box) return;
    map.flyToBounds(box);
  }, [map, box]);

  return null;
};
