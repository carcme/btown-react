import { Link } from "@tanstack/react-router";
import { useDistance } from "../lib/mapsUtils";
import { useUserLocation } from "../state/location-provider";
import { useEffect } from "react";
import { getDistance } from "geolib";
import { getCloudImage } from "@/lib/utils";
import CloudinaryImage from "./CloudinaryImage";

const Card = ({ id, title, desc, brief, type, img, alt, latlng }) => {
  const { location } = useUserLocation();

  useEffect(() => {}, [location]);

  let meters = getDistance(latlng, location);
  if (meters > 1000) {
    meters = (meters / 1000).toFixed(1) + " km";
  } else {
    meters = meters + " m";
  }

  return (
    <div className="p-4 lg:max-w-96 mx-auto">
      <div className="border-opacity-60 h-full overflow-hidden rounded-t-xl border border-muted">
        <Link
          to="/tour/$tourId"
          params={{
            tourId: id.toString(),
          }}
          // search={{ tour: 0, attr: id }}
        >
          {/* <Link to="/toursummary" state={{ tourId: id }}> */}
          <div className="relative">
            <CloudinaryImage
              publicId={img}
              w={600}
              alt={alt}
              className="h-60 w-full object-cover object-center"
            />
            <h1 className="absolute inset-0 mb-2 flex items-end justify-start pl-2 text-xl text-white">
              {title}
            </h1>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="title-font mb-1 text-sm font-medium tracking-widest text-muted-foreground uppercase">
                {type}
              </h2>
              <h2 className="title-font mb-1 text-xs font-medium text-muted-foreground">
                {meters}
              </h2>
            </div>
            {/* <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {title}
            </h1> */}
            <p className="mb-3 leading-relaxed text-gray-700">{desc}</p>
            <div className="flex w-full flex-wrap items-center text-sm text-gray-300 ">
              {brief.map((txt, index) => {
                return (
                  <p className="pb-2 text-pretty text-gray-500" key={index}>
                    {txt}
                  </p>
                );
              })}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
