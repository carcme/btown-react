import React, {
  useEffect,
  useState,
  useRef,
  type Ref,
  type Dispatch,
  type SetStateAction,
} from "react";
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
  useMapEvents,
  Marker,
} from "react-leaflet";

import {
  DivIcon,
  Popup as LeafletPopup,
  type ErrorEvent,
  type LeafletMouseEvent,
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

import ReactLeafletRightClick from "@/components/map/MapRightClick";

import axios from "axios";
import type { LocationIQPlaceType } from "@/types/LocationIQ";
import { createIqMarkerIcon } from "./CustomMarkerIcon";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

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

interface MapWikiButtonProps extends React.ComponentProps<"div"> {
  lang: string;
  displaying: boolean;
  onResult?: (data: any) => void; // optional callback with result
}

export function MapWikiButton({
  lang,
  displaying,
  className,
  onResult,
  ...props
}: MapWikiButtonProps) {
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
        const center = map.getCenter(); //const center = location ? location : map.getCenter();
        const centerLatLng = center as L.LatLng;
        const lat = centerLatLng.lat;
        const lng = centerLatLng.lng;
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

interface MapRightClickProps extends React.ComponentProps<"div"> {
  onResult?: (data: any) => void; // optional callback with result
}

export function MapRightClick({ onResult }: MapRightClickProps) {
  const [loading, setLoading] = useState(false);

  const onRightClick = async (e: LeafletMouseEvent) => {
    if (!loading)
      try {
        setLoading(true);
        // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&osm_type=N&extratags=1&namedetails=1&lat=${e.latlng.lat}&lon=${e.latlng.lng}`;

        // const key = `e1Y1qB424txGqd3LyXpwSR55pPQpuv5l`;
        // const url = `https://api.geocodify.com/v2/reverse?api_key=${key}&lat=${e.latlng.lat}&lng=${e.latlng.lng}`;

        const key = `pk.5f135066b99b7087d417752281fed2f3`;

        const url = `https://us1.locationiq.com/v1/reverse?key=${key}&lat=${e.latlng.lat}&lon=${e.latlng.lng}&namedetails=1&extratags=1&normalizeaddress=1&showdistance=1&format=json&`;

        //  const url = `https://us1.locationiq.com/v1/reverse?key=${key}&lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json&lang=en`;

        const response = await fetch(url);
        const data = await response.json();

        console.log("🚀 ~ onRightClick ~ data:", data);

        if (onResult) onResult(data);
      } catch (error) {
        console.error("Reverse geolookup failed:", error);
      } finally {
        setLoading(false);
      }
  };

  return <ReactLeafletRightClick onRightClick={onRightClick} />;
}

/*
interface MapWikiButtonProps extends React.ComponentProps<"div"> {
  lang: string;
  displaying: boolean;
  onResult?: (data: any) => void; // optional callback with result
}
*/

interface DummyProps extends React.ComponentProps<"div"> {
  showing: boolean;
  radius?: number; // in meters
  limit?: number;
  onResult: (data: LocationIQPlaceType[] | null) => void; // Updated type
}

/**
 *
 * @param showing: has previous data (used to show & remove markers )
 * @param radius:  search area
 * @param limit:   how many result to return
 * @returns
 */
export const LocationFinderDummy = ({
  showing,
  radius = 500, // in m
  limit = 50, // # results
  onResult,
}: DummyProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [locationIQPlaces, setLocationIQPlaces] = useState<
    LocationIQPlaceType[] | null
  >();
  const { theme } = useTheme();

  useMapEvents({
    async click(e) {
      if (loading) return; // Don't do anything if a fetch is already in progress

      // If there are already places showing, clear them
      if (showing) {
        onResult(null);
        setLocationIQPlaces(null);
        return;
      }

      // what to search for
      const tags =
        "toilet,pub,restaurant,atm,tourism:*,!tourism:hotel,!tourism:guest_house,!tourism:hostel,!tourism:apartment";

      const { lat, lng } = e.latlng;
      try {
        setLoading(true);
        const response = await axios.get(
          "https://eu1.locationiq.com/v1/nearby.php",
          {
            params: {
              key: import.meta.env.VITE_LOCATION_IQ_API_KEY,
              lat: lat,
              lon: lng,
              radius: radius,
              limit: limit,
              tag: tags,
              format: "json",
            },
          }
        );

        const places = response.data?.map((place: LocationIQPlaceType) => {
          return {
            ...place,
            icon: createIqMarkerIcon(theme, place.type),
          };
        });
        onResult(places);
        setLocationIQPlaces(places);
        console.log("🚀 ~ LocationFinderDummy ~ response:", response.data);
      } catch (err) {
        console.error("Error fetching LocationIQ places:", err);
        onResult(null); // Pass null on error
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {locationIQPlaces !== null && null}
      {locationIQPlaces?.map((place: LocationIQPlaceType) => (
        <Marker
          key={place.osm_id + place.place_id}
          icon={place.icon}
          position={
            [parseFloat(place.lat), parseFloat(place.lon)] as LatLngExpression
          }
        >
          <MapPopup>
            <PlaceCard
              title={place.name}
              address={place.address.road + ", " + place.address.suburb}
              badgeText={place.type}
              icon={place.icon}
            />
          </MapPopup>
        </Marker>
      ))}
    </>
  );
};

interface PlaceCardProps {
  title: string;
  address: string;
  badgeText?: string;
  buttonText?: string;
  icon?: DivIcon;
  onButtonClick?: () => void;
}
export default function PlaceCard({
  title,
  address,
  badgeText = "Featured",
  buttonText = "View All",
  icon,
  onButtonClick,
}: PlaceCardProps) {
  console.log("🚀 ~ PlaceCard ~ title:", title);
  let svg: string | false | HTMLElement | undefined;
  if (icon) svg = icon?.options.html;

  return (
    <Card className="relative w-full max-w-sm border rounded-xl overflow-hidden">
      {/* Badge */}
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="text-xs uppercase tracking-wide">
          {badgeText}
        </Badge>
      </div>

      {/* Header */}
      <CardHeader className="pt-2">
        <CardTitle className="text-xl font-semibold leading-tight text-left ">
          <div className="flex justify-start items-center gap-2">
            {svg && <SvgIcon className="text-amber-300" svg={svg} size={24} />}
            {title !== undefined ? title : address}
          </div>
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm text-left">
          {title !== undefined && address}
        </CardDescription>
      </CardHeader>

      {/* Footer / Button */}
      <CardFooter className="pt-2">
        <Button
          variant={"outline"}
          className="w-full font-medium"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface SvgIconProps {
  svg: string | HTMLElement;
  size?: number;
  className?: string;
}

function SvgIcon({ svg, size = 24, className }: SvgIconProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing contents
    container.innerHTML = "";

    if (typeof svg === "string") {
      svg = svg.replace("fill=#0070F3", "fill=#000000");
      svg = svg.replace("stroke-width=2", "stroke-width=1.5");
      container.innerHTML = svg;
    } else if (svg instanceof HTMLElement) {
      // append a clone so we don't move the original element out of the Leaflet icon
      container.appendChild(svg.cloneNode(true));
    }
  }, [svg]);

  return (
    <div
      ref={containerRef}
      className={cn("inline-block ", className)}
      style={{ width: size, height: size }}
    />
  );
}
