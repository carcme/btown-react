import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L, { Polyline } from "leaflet";
import axios from "axios";
import polyline from "@mapbox/polyline";
import type { Location } from "@/state/tours";

interface GHR_Types {
  from: Location;
  to: Location;
  vehicle?: string;
}

const GraphHopperRouting = ({ from, to, vehicle = "foot" }: GHR_Types) => {
  const map = useMap();
  const routeLayerRef = useRef<Polyline | any>(null);

  useEffect(() => {
    if (!map || !from || !to) return;

    const apiKey = import.meta.env.VITE_GRAPHHOPPER_KEY; // Your GraphHopper API key
    const url = `https://graphhopper.com/api/1/route?point=${from.lat},${from.lng}&point=${to.lat},${to.lng}&vehicle=${vehicle}&key=${apiKey}&points_encoded=true`;

    axios
      .get(url)
      .then((response) => {
        if (routeLayerRef.current) {
          map.removeLayer(routeLayerRef.current);
        }

        const points = response.data.paths[0].points;
        const decodedPoints = polyline.decode(points);
        const latLngs = decodedPoints.map((point) =>
          L.latLng(point[0], point[1])
        );

        routeLayerRef.current = L.polyline(latLngs, {
          color: "#10B981",
          weight: 4,
        }).addTo(map);
        map.fitBounds(routeLayerRef.current.getBounds());

        // Log GraphHopper credit information from response headers
        console.log(
          "GraphHopper Rate Limit Limit:",
          response.headers["x-ratelimit-limit"]
        );
        console.log(
          "GraphHopper Rate Limit Remaining:",
          response.headers["x-ratelimit-remaining"]
        );
      })
      .catch((error) => {
        console.error("Error fetching route from GraphHopper:", error);
      });

    return () => {
      if (routeLayerRef.current) {
        map.removeLayer(routeLayerRef.current);
      }
    };
  }, [map, from, to, vehicle]);

  return null;
};

export default GraphHopperRouting;
