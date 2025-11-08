import React, { useEffect, useState } from "react";
import { Circle, CircleMarker, useMap } from "react-leaflet";

import { useUserLocation } from "../../state/location-provider";
import { useLanguage } from "../../state/lang-provider";

const UserLocation = () => {
  const { lang, setLang } = useLanguage();
  const { location, setUserLocation } = useUserLocation();

  const [userPos, setUserPosition] = useState(null);
  const [userAccuracy, setaccuracy] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setUserLocation(e.latlng);
      setUserPosition(e.latlng);
      setaccuracy(e.accuracy);
    });
  }, []);

  return userPos === null ? null : (
    <>
      <Circle
        center={userPos}
        weight={1}
        stroke={true}
        fillOpacity={0.1}
        fillRule="evenodd"
        radius={userAccuracy}
        className="dark:fill-foreground stroke-foreground stroke-0 motion-safe:animate-pulse"
      />
      <CircleMarker
        center={userPos}
        radius={5}
        fillOpacity={0.0}
        className="fill-primary stroke-primary stroke-3"
      ></CircleMarker>
    </>
  );
};

export default UserLocation;
