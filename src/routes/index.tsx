import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/state/lang-provider";
import { useTours } from "@/state/tours";
import Header from "@/components/nav/Header";

import { useTourMapView } from "@/state/show-tour-map-provider";
import { PWAPopup } from "@/components/PWAPopup";
import MapCondensed from "@/components/map/MapCondensed";
import MapFullScreen from "@/components/map/MapFullScreen";
import Card from "@/components/Card";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { lang } = useLanguage();
  const { data } = useTours();
  const tours = lang === "en" ? data?.en.tours : data?.de.tours;
  const { showMap } = useTourMapView();

  // const arr = Object.values(dummyWiki.query.pages);

  return (
    <>
      {/* <div className="h-14 bg-yellow-400"></div> */}
      <Header />
      <PWAPopup />

      {showMap === "half" && <MapCondensed tours={tours} />}
      {showMap === "full" && <MapFullScreen tours={tours} />}

      {/* Display the tour cards */}
      <div className="h-fit">
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
