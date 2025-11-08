import L, { type LatLngExpression } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface RML {
  from: LatLngExpression;
  to: LatLngExpression;
}

const CreateRoutineMachineLayer = ({ from, to }: RML) => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(from), L.latLng(to)],
    lineOptions: {
      styles: [{ color: "#c81002", weight: 4 }],
    },
    createMarker: function () {
      // Create own markers in mapcontainer
      return null;
    },
    router: new L.Routing.graphHopper("152de641-7154-42fa-a38d-b20d9564c7e8", {
      urlParameters: {
        profile: "foot",
        locale: "en",

        vehicle: "foot",
      },
    }),
    show: true,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(CreateRoutineMachineLayer);

export default RoutingMachine;
