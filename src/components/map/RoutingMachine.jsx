import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { useLanguage } from "@/state/lang-provider";

const RoutingMachine = ({ from, to }) => {
  const map = useMap();
  const { lang } = useLanguage();

  useEffect(() => {
    if (!map || !from || !to) return;

    const routingControl = L.Routing.control({
      router: new L.Routing.GraphHopper("152de641-7154-42fa-a38d-b20d9564c7e8", {
        urlParameters: {
          profile: "foot",
          locale: lang,
          vehicle: "foot",
        },
      }),
      waypoints: [L.latLng(from), L.latLng(to)],
      createMarker: function () {
        return null;
      },
      lineOptions: {
        styles: [{ color: "#10B981", weight: 4 }], //emerald
        extendToWaypoints: false,
        missingRouteTolerance: 0,
      },
      show: true,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      collapsible: true,
    }).addTo(map);

    const router = routingControl.getRouter();
    router.on("response", function (e) {
      console.log("This routing request consumed " + e.credits + " credit(s)");
      console.log("You have " + e.remaining + " left");
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, from, to, lang]);

  return null;
};

export default RoutingMachine;