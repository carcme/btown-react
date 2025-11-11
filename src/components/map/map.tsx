import React, { useEffect, useState, type Ref } from "react";
import { useTheme } from "@/state/theme-provider";
import {
  MapContainer,
  TileLayer,
  Popup,
  type MapContainerProps,
  type PopupProps,
  useMap,
  CircleMarker,
  Circle,
} from "react-leaflet";

import {
  Popup as LeafletPopup,
  type ErrorEvent,
  type LocateOptions,
  type LocationEvent,
} from "leaflet";

import { DEFAULT_MAP, DEFAULT_MAP_DARK } from "@/data/maps/defaults";
import { type LatLngExpression, type Map as LeafletMap } from "leaflet";
import { cn, useDebounceLoadingState } from "@/lib/utils";
import { Plus, Crosshair, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { useUserLocation } from "@/state/location-provider";
import WikiIcon from "./WikiIcon";

export function Map({
  zoom = 15,
  className,
  ...props
}: Omit<MapContainerProps, "zoomControl"> & {
  center: LatLngExpression;
  ref?: Ref<LeafletMap>;
}) {
  return (
    <MapContainer
      zoom={zoom}
      attributionControl={false}
      zoomControl={false}
      className={cn("size-full min-h-96 flex-1 rounded-md", className)}
      {...props}
    />
  );
}

export const MapTileLayer = () => {
  const { theme } = useTheme();
  return (
    <>
      {theme === "light" && (
        <TileLayer
          url={`${DEFAULT_MAP.url}`}
          attribution={`${DEFAULT_MAP.attr}`}
        />
      )}
      {theme === "dark" && (
        <TileLayer
          url={`${DEFAULT_MAP_DARK.url}`}
          attribution={`${DEFAULT_MAP_DARK.attr}`}
        />
      )}
    </>
  );
};

export function MapPopup({
  className,
  ...props
}: Omit<PopupProps, "content"> & { ref?: Ref<LeafletPopup> }) {
  return (
    <Popup
      className={cn(
        "flex flex-col bg-popover text-popover-foreground w-72 rounded-md border p-4 font-grotesk shadow-md outline-hidden",
        className
      )}
      {...props}
    />
  );
}

interface MapZoomControlProps extends React.ComponentProps<"div"> {
  crosshair?: boolean;
  showLocation?: boolean;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onToggleCrosshair?: () => void;
}

export function MapZoomControl({
  className,
  crosshair = true,
  watch = false,
  showLocation = true,
  onZoomIn,
  onZoomOut,
  onToggleCrosshair,
  onLocationFound,
  onLocationError,
  ...props
}: MapZoomControlProps &
  Pick<LocateOptions, "watch"> & {
    onLocationFound?: (location: LocationEvent) => void;
    onLocationError?: (error: ErrorEvent) => void;
  }) {
  const { setUserLocation } = useUserLocation();

  const [position, setUserPosition] = useState<LatLngExpression | null>(null);
  const [userAccuracy, setaccuracy] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useDebounceLoadingState(200);

  const map = useMap();

  function startLocating() {
    setIsLocating(true);
    map.locate();

    map.on("locationfound", (location: LocationEvent) => {
      setUserLocation(location.latlng);
      setUserPosition(location.latlng);
      setaccuracy(location.accuracy);
      setIsLocating(false);
      onLocationFound?.(location);
    });
    map.on("locationerror", (error: ErrorEvent) => {
      setUserPosition(null);
      setIsLocating(false);
      onLocationError?.(error);
    });
  }

  function stopLocating() {
    map.stopLocate();
    map.off("locationfound");
    map.off("locationerror");
    setUserPosition(null);
    setIsLocating(false);
  }

  useEffect(() => {
    return () => stopLocating();
  }, []);

  return (
    <>
      {position && userAccuracy && (
        <>
          <Circle
            center={position}
            weight={1}
            stroke={true}
            fillOpacity={0.2}
            fillRule="evenodd"
            radius={map.getZoom() > 13 ? userAccuracy : 2000}
            className="fill-location stroke-foreground stroke-0 motion-safe:animate-[pulse_3s_ease-in-out_infinite]"
          />
          <CircleMarker
            center={position}
            radius={8}
            fillOpacity={0.3}
            className="fill-location stroke-location stroke-3"
          >
            <MapPopup>
              <div className="flex flex-col rounded bg-background p-4 w-36">
                <p className="text-lg">Your Location</p>
              </div>
            </MapPopup>
            {/* <MapPopup>You Are Here</MapPopup> */}
          </CircleMarker>
        </>
      )}
      {crosshair && (
        <div
          className={
            "absolute inset-[50%] z-400 size-4 rotate-45 pointer-events-none"
          }
        >
          <Plus className="text-foreground " strokeWidth="0.5" />
        </div>
      )}

      <ButtonGroup
        orientation="uniform"
        aria-label="Map controls"
        className={cn(
          "absolute flex flex-col items-center gap-2 rounded-2xl bg-background/60 p-2 shadow-lg transition-all duration-200 z-400 top-auto right-4 bottom-4 left-auto",
          position && "ring-1 ring-location/40",
          className
        )}
        {...props}
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            map.zoomIn();
          }}
          className=""
        >
          <ZoomIn className="size-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            map.zoomOut();
          }}
          className=""
        >
          <ZoomOut className="size-4" />
        </Button>
        {showLocation && (
          <Button
            size="icon"
            variant={position ? "secondary" : "outline"}
            onClick={position ? stopLocating : startLocating}
            disabled={isLocating}
            title={
              isLocating
                ? "Locating..."
                : position
                  ? "Stop location"
                  : "Track location"
            }
            aria-label={
              isLocating
                ? "Locating..."
                : position
                  ? "Stop location tracking"
                  : "Start location tracking"
            }
            className={cn(
              "",
              position &&
                "ring dark:ring-location/40 ring-location dark:bg-location/40 bg-location rounded-full"
            )}
          >
            {isLocating ? (
              <Crosshair className="animate-fadePulse" />
            ) : (
              <Crosshair className="size-4" />
            )}
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

interface MapLookupButtonProps extends React.ComponentProps<"div"> {
  lang: string;
  displaying: boolean;
  onResult?: (data: any) => void; // optional callback with result
}

export function MapLookupButton({
  lang,
  displaying,
  className,
  onResult,
  ...props
}: MapLookupButtonProps) {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(displaying);
  const { location } = useUserLocation();
  const map = useMap();

  const handleLookup = async () => {
    if (hasData) {
      setHasData(false);
      if (onResult) onResult(null);
    } else
      try {
        setLoading(true);
        const center = location ? location : map.getCenter();
        const { lat, lng } = center;
        const thumbsize = 480;
        const radius = 300;
        const CORS = "origin=*&"; // !!!IMPORTANT!!!

        // Wikipedia Geosearch API (JSON)
        const url = `https://${lang}.wikipedia.org/w/api.php?format=json&action=query&formatversion=2&redirects=1&generator=geosearch&prop=extracts|coordinates|pageterms|pageimages&piprop=thumbnail&wbptterms=description&ggscoord=${lat}|${lng}&coprop=type|dim|globe&exlimit=20&pilimit=50&${CORS}explaintext=1&ggsradius=${radius}&pithumbsize=${thumbsize}&codistancefrompoint=${lat}|${lng}&exintro=1&ggslimit=10&colimit=10`;

        const response = await fetch(url);
        const data = await response.json();

        setHasData(true);
        if (onResult) onResult(data);
      } catch (error) {
        console.error("Reverse geolookup failed:", error);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div
      className={cn(
        "absolute flex flex-col items-center gap-2 rounded-2xl bg-background/60 p-2 shadow-lg transition-all duration-200 z-1000 top-auto left-4 bottom-4 right-auto",
        loading && "ring-1 ring-location/40",
        className
      )}
      {...props}
    >
      <Button
        size="icon"
        variant="outline"
        onClick={handleLookup}
        disabled={loading || !location}
        aria-label="Search Wikipedia in this area"
        className={cn(
          "hover:scale-105 transition-transform ",

          hasData &&
            "ring dark:ring-location/40 ring-location dark:bg-location/40 bg-location rounded-full"
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <WikiIcon className="size-5 fill-foreground" />
          // <Compass className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
