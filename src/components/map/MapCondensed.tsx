import { Map, MapTileLayer, MapZoomControl } from "@/components/map/map";
import { BERLIN_CENTER } from "@/data/maps/defaults";

import TourFeatureGroup from "@/components/map/TourFeatureGroup";
import UserLocation from "@/components/map/UserLocation";
import { type En } from "@/state/tours";

const MapCondensed = ({ tours }: En) => {
  //   const { lang } = useLanguage();
  //   const { data } = useTours();
  //   const tours = lang === "en" ? data?.en.tours : data?.de.tours;

  const onMapReady = () => {
    console.log("MAP READY: ");
  };

  return (
    <Map
      center={BERLIN_CENTER}
      zoom={BERLIN_CENTER.zoom}
      scrollWheelZoom={false}
      whenReady={onMapReady}
      closePopupOnClick={true}
      className="h-96 md:min-h-1/3"
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
  );
};

export default MapCondensed;
