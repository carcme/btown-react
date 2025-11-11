import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Compass, ArrowDown, Landmark } from "lucide-react";

import { Link } from "@tanstack/react-router";
import WikiIcon from "./WikiIcon";
import { useMap } from "react-leaflet";
import { getDistance } from "geolib";
import { useUserLocation } from "../../state/location-provider";
import { useLanguage } from "@/state/lang-provider";
import NoImage from "@/assets/no_image.png";
import CloudinaryImage from "../CloudinaryImage";

function calcDistance(latlng1, latlng2) {
  const map = useMap();
  map.stopLocate();
  map.off("locationfound");
  map.off("locationerror");
  let distance = map.distance(latlng1, latlng2);
  if (distance / 1000 > 100) {
    return ">100 km";
  } else if (distance / 1000 > 1) {
    distance = (distance / 1000).toFixed(1);
    return distance.toString() + " km";
  } else {
    return distance.toFixed(0).toString() + " m";
  }
}

const AttractionPopupContents = ({ attr }) => {
  const { location } = useUserLocation();

  const map = useMap();

  let meters = getDistance(attr.location, location);
  if (meters > 1000) {
    meters = (meters / 1000).toFixed(1) + " km";
  } else {
    meters = meters + " m";
  }

  useEffect(() => {
    meters = getDistance(attr.location, location);
  }, [location]);

  return (
    <Card className="w-56 max-w-md gap-0 py-2 pt-0 shadow-none">
      <CardHeader className="flex items-center px-2 py-2">
        <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full px-1 ">
          {/* <img src={BtownIcon} alt="" /> */}
          <WikiIcon className="fill-muted-foreground" />
        </div>
        <div className="text-start">{attr.stopInfo.title}</div>
      </CardHeader>

      <CardContent className="text-muted-foreground mt-2 px-2 text-[11px]">
        <div className="line-clamp-4 text-left text-pretty">
          <p>{attr.stopInfo.teaser}</p>
        </div>
        <div className="bg-muted mt-4 aspect-video w-full rounded-xl">
          <CloudinaryImage
            publicId={attr.stopImageFile}
            w={300}
            alt={attr.stopImageFile}
            className="aspect-video w-92 rounded-md object-cover"
          />
          {/* <img
            src={image}
            alt="Wikipedia image"
            className="aspect-video w-92 rounded-md object-cover"
          /> */}
          {/* <img src={image} /> */}
        </div>
      </CardContent>

      <CardFooter className="m-2 mb-0 gap-6 p-0 text-muted-foreground">
        <div className="flex justify-start gap-1 grow">
          <Compass size={16} className="motion-safe:animate-wiggle " />
          {attr != undefined && meters}
        </div>
        <div className="flex justify-end grow">
          <Link to={attr.wikiLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="hover"
              size="xs"
              className="bg-background px-2 text-xs text-muted-foreground"
            >
              Read More
              <ArrowDown className="motion-safe:animate-direction -rotate-90" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AttractionPopupContents;
