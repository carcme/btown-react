import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/state/lang-provider";
import { useTours } from "@/state/tours";
import Header from "@/components/Header";

import { BERLIN_CENTER } from "@/data/maps/defaults";

import Card from "@/components/Card";
import TourFeatureGroup from "@/components/map/TourFeatureGroup";
// import { MapZoomControl } from "@/components/mapControls";
import UserLocation from "@/components/map/UserLocation";
import { Map, MapTileLayer, MapZoomControl } from "@/components/map/map";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { lang } = useLanguage();
  const { data } = useTours();
  const tours = lang === "en" ? data?.en.tours : data?.de.tours;

  // const arr = Object.values(dummyWiki.query.pages);

  const onMapReady = () => {
    console.log("MAP READY: ");
  };

  return (
    <>
      {/* <div className="h-14 bg-yellow-400"></div> */}
      <Header />

      <Map
        center={BERLIN_CENTER}
        zoom={BERLIN_CENTER.zoom}
        scrollWheelZoom={false}
        whenReady={onMapReady}
        closePopupOnClick={true}
        className="h-96 md:min-h-96 "
      >
        <MapTileLayer />
        <MapZoomControl
          crosshair
          showLocation={false}
          className="top-auto right-4 bottom-4 left-auto"
        />

        {tours != undefined && <TourFeatureGroup tours={tours} />}

        <UserLocation />
      </Map>
      <div className="h-fi">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 flex-col md:flex-row justify-center lg:max-w-6xl md:max-w-4xl mx-auto">
          {/* <div className="md:grid md:grid-cols-3 md:items-start justify-center gap-4 p-4 md:max-w-6xl md:mx-auto"> */}
          {tours?.map((tour) => {
            return (
              <Card
                key={tour.id}
                id={tour.id}
                title={tour.tourName}
                desc={tour.tourDesc}
                type={tour.tourType}
                img={tour.tourCoverImageFile}
                alt={tour.tourCoverImageFileAlt}
                brief={tour.tourBrief}
                latlng={tour.attractions[0].location}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
