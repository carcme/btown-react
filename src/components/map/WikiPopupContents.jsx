import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Compass, ArrowDown } from "lucide-react";

import { Link } from "@tanstack/react-router";
import WikiIcon from "./WikiIcon";
import { useMap } from "react-leaflet";
import { useUserLocation } from "../../state/location-provider";
import { firebaseImage, getDist } from "@/lib/utils";
import { useLanguage } from "@/state/lang-provider";
import NoImage from "@/assets/no_image.png";

const WikiPopupContents = ({ page, tourId, attractionId }) => {
  const { location } = useUserLocation();
  const { lang } = useLanguage();

  const latlng = { lat: page.coordinates[0].lat, lng: page.coordinates[0].lon };
  const linkUrl = `https://${lang}.wikipedia.org/wiki?curid=${page.pageid}`;

  const map = useMap();

  let meters = getDist(latlng, location);

  useEffect(() => {
    meters = getDist(latlng, location);
  }, [location]);

  return (
    <Card className="w-full max-w-md gap-0 py-2 pt-0 shadow-none">
      <CardHeader className="flex items-center px-2 py-2">
        <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full px-1 ">
          <WikiIcon className="fill-muted-foreground" />
        </div>
        <div className="text-start">{page.title}</div>
      </CardHeader>

      <CardContent className="text-muted-foreground mt-2 px-2 text-[11px]">
        <div className="line-clamp-4 text-left text-pretty">
          <p>{page.extract}</p>
        </div>
        <div className="bg-muted mt-4 aspect-video w-full rounded-xl">
          <Link
            to="/wikipedia/$tourId/$attractionId"
            state={{ page: page }}
            params={{
              tourId: tourId,
              attractionId: attractionId,
            }}
          >
            <img
              src={page.thumbnail ? page.thumbnail.source : NoImage}
              alt={page.title}
              className="aspect-video w-92 rounded-md object-cover"
            />
          </Link>
        </div>
      </CardContent>

      <CardFooter className="m-2 mb-0 gap-6 p-0 text-muted-foreground">
        <div className="flex justify-start gap-1 grow">
          <Compass size={16} className="motion-safe:animate-wiggle " />
          {page != undefined && meters}
        </div>
        <div className="flex justify-end grow">
          <Link to={linkUrl} target="_blank" rel="noopener noreferrer">
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

export default WikiPopupContents;
