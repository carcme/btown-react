import { useEffect, useState } from "react";
import { useLanguage } from "@/state/lang-provider";
import { getAttraction } from "@/state/tours";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapTileLayer,
  Map,
  MapPopup,
  MapZoomControl,
  MapLookupButton,
} from "@/components/map/map";
import { Marker } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import AttractionAccordion from "@/components/AttractionAccordion";
import {
  createMarkerIcon,
  createWikiMarkerIcon,
} from "@/components/map/CustomMarkerIcon";
import { InteractiveButtonGroup } from "@/components/interactive-button-group";
import ToggleDark from "@/components/nav/ToggleDark";
import { cn, firebaseImage } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { BERLIN_CENTER } from "@/data/maps/defaults";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { ArrowLeft, CircleX, Expand, Shrink, MapPin } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { useLocalStorage } from "@/state/useLocalStorage";
import type { WikiPage } from "@/components/map/WikiType";
import WikiPopup from "@/components/map/WikiPopup";

export const Route = createFileRoute("/attractions/$tourId/$attractionId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      tour: Number(params.tourId),
      attraction: Number(params.attractionId),
    };
  },

  pendingComponent: () => {
    <div>Loading....</div>;
  },
  errorComponent: () => {
    <div>Error!!</div>;
  },
});

function RouteComponent() {
  const { tour, attraction } = Route.useLoaderData();
  const [fullScreen, setFullScreen] = useLocalStorage("mapFullScreen", false);
  const { lang } = useLanguage();
  const [position, setPosition] = useState<number>(window.pageYOffset);
  const [visible, setVisible] = useState<boolean>(true);
  const [wikiPages, setWikiPages] = useState<WikiPage[] | null>(null);

  const [openMap, setMapOpen] = useState(false);

  const data = getAttraction(tour, attraction, lang);

  const stopImage = firebaseImage(data?.stopImageFile);

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const center: LatLngExpression | undefined =
    data?.location && data.location.lat != null && data.location.lng != null
      ? { lat: data.location.lat, lng: data.location.lng }
      : undefined;
  const headerCSS = visible ? "top-0" : "-top-20";

  useEffect(() => {}, [tour, lang]);

  const showHeader = true; // debug

  return (
    <div className="relative">
      {showHeader && (
        <div className="max-w-3xl ">
          <header
            className={`p-2 z-10 bg-black/50 flex fixed w-full transition-[top] duration-700 ${headerCSS}`}
          >
            <div className="relative pl-2 mx-auto max-w-3xl flex justify-between w-3xl">
              <Button
                variant="secondary"
                size="icon"
                className="z-10 rounded-full hover:scale-110 transition-transform"
                aria-label="back to tour summary"
              >
                <Link
                  to="/tour/$tourId"
                  params={{
                    tourId: tour.toString(),
                  }}
                >
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <div className="p-1.5 text-base text-white text-ellipsis font-spinnaker">
                {data?.stopName}
              </div>
              <div className="pr-2 flex justify-end gap-2 ">
                <div className="">
                  <ToggleDark />
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="hover:scale-110 transition-transform rounded-full"
                  aria-label="Open Map"
                  disabled={openMap}
                  onClick={() => setMapOpen(true)}
                >
                  <MapPin className="size-4" />
                </Button>
              </div>
            </div>
          </header>
        </div>
      )}

      <div className="m-auto flex items-center gap-4">
        <div className="relative w-full max-w-3xl mx-auto">
          <img
            className="h-96 w-full object-cover"
            src={stopImage}
            onClick={() => setMapOpen(true)}
          />
          <div className="absolute start-4 top-84 text-2xl text-white font-spinnaker">
            {data?.stopName}
          </div>
        </div>
        <div className="absolute flex h-96 items-end justify-end p-8 text-2xl">
          <Drawer
            handleOnly={true}
            fixed={true}
            direction="right"
            aria-describedby="Open Map"
            open={openMap}
            dismissible={true}
            onOpenChange={setMapOpen}
          >
            <DrawerContent
              className={`${fullScreen ? "data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-full" : ""}`}
            >
              <DrawerDescription></DrawerDescription>
              <DrawerHeader className="sr-only">
                <DrawerTitle>{data?.stopName}</DrawerTitle>
              </DrawerHeader>
              <div className="relative h-full">
                <Map
                  className="z-10 h-full"
                  center={center || BERLIN_CENTER}
                  zoom={16}
                  scrollWheelZoom={true}
                >
                  <MapTileLayer />
                  <MapZoomControl className="top-auto right-4 bottom-4 left-auto" />

                  <MapLookupButton
                    lang={lang}
                    displaying={wikiPages != null}
                    onResult={(data) => {
                      if (data === null) {
                        setWikiPages(null);
                        return;
                      }
                      const wikiPages = data?.query?.pages;
                      if (wikiPages) {
                        setWikiPages(wikiPages);
                        console.log(wikiPages);
                      } else {
                        alert("No nearby Wikipedia articles found!");
                      }
                    }}
                  />
                  <Marker
                    key={data?.stopName}
                    position={center || BERLIN_CENTER}
                    title={data?.stopName}
                    icon={createMarkerIcon("#C2410C", "")}
                    riseOnHover={true}
                  >
                    <MapPopup>
                      <div className="flex flex-col">
                        <p className="text-lg">
                          <b>{data?.stopName}</b>
                        </p>
                        <p className="text-xs">{data?.busStop}</p>
                      </div>
                    </MapPopup>
                  </Marker>
                  {/* // show the poi markers */}
                  {data?.pois.map((poi) => {
                    return (
                      <Marker
                        key={poi.title}
                        title={poi.title}
                        position={[poi.lat, poi.lng]}
                        icon={createMarkerIcon("#F59E0B88", "000", "0.3")}
                        riseOnHover={true}
                      >
                        <MapPopup>
                          <div className="flex flex-col">
                            <p className="text-lg">
                              <b>{poi.title}</b>
                            </p>
                          </div>
                        </MapPopup>
                      </Marker>
                    );
                  })}
                  {/* Wikipedia lookup Markers */}

                  {wikiPages?.map((page) => {
                    return (
                      <Marker
                        key={page.pageid}
                        title={page.title}
                        position={[
                          page.coordinates[0].lat,
                          page.coordinates[0].lon,
                        ]}
                        icon={createWikiMarkerIcon()}
                        riseOnHover={true}
                      >
                        <MapPopup>
                          <WikiPopup page={page} />
                        </MapPopup>
                      </Marker>
                    );
                  })}
                </Map>

                <ButtonGroup
                  orientation="uniform"
                  aria-label="Map display controls"
                  className={cn(
                    "absolute top-4 right-4 left-auto bottom-auto z-10 flex flex-col items-center gap-2 rounded-2xl bg-background/60 p-2 shadow-lg transition-all duration-200",
                    fullScreen && "ring-1 ring-location/40"
                  )}
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-md"
                    onClick={() => {
                      setMapOpen(false);
                    }}
                  >
                    <CircleX className="size-4 " />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className={cn(
                      "rounded-md",
                      fullScreen &&
                        "ring dark:ring-location/40 ring-location dark:bg-location/40 bg-location rounded-full"
                    )}
                    onClick={() => setFullScreen(!fullScreen)}
                  >
                    {!fullScreen && <Expand className="size-4 " />}
                    {fullScreen && <Shrink className="size-4 " />}
                  </Button>
                </ButtonGroup>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="p-4">
        <InteractiveButtonGroup
          tour={tour}
          currentId={attraction}
          attrInfo={data}
        />

        <AttractionAccordion
          tourId={tour}
          attractionId={attraction}
          lang={lang}
        />
      </div>
    </div>
  );
}
