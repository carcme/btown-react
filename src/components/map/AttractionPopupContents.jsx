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
import { useUserLocation } from "../../state/location-provider";
import { useLanguage } from "@/state/lang-provider";
import NoImage from "@/assets/no_image.png";
import CloudinaryImage from "../CloudinaryImage";
import { BtownIcon } from "@/assets/svgIcons";
import { getDist } from "@/lib/utils";
import { useIsMobile } from "@/lib/isMobile";

/**
 * Used on: Main page map,
 * @param {*} param0
 * @returns
 */
const AttractionPopupContents = ({ attr }) => {
  const { location } = useUserLocation();

  const isMobile = useIsMobile();
  const imageSize = isMobile ? 300 : 800;

  let meters = getDist(attr.location, location);

  useEffect(() => {
    meters = getDist(attr.location, location);
  }, [location]);

  console.log(attr);

  return (
    <Card className="max-w-md gap-0 py-2 pt-0 shadow-none">
      <CardHeader className="flex items-center px-2 py-2">
        <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full px-1 ">
          {/* <img src="/skyline.svg" alt="" className="rounded-full" /> */}
          <BtownIcon className="fill-muted-foreground rounded-full overflow-clip" />
        </div>
        <div className="text-start">{attr.stopInfo.title}</div>
      </CardHeader>

      <CardContent className="text-muted-foreground mt-2 px-2 text-[11px]">
        <div className="line-clamp-4 text-left text-pretty">
          <p>{attr.stopInfo.teaser}</p>
        </div>
        <div className="relative bg-muted mt-4 aspect-video w-full rounded-xl">
          <CloudinaryImage
            publicId={attr.stopImageFile}
            w={imageSize}
            alt={attr.stopImageFile}
            className="aspect-video w-92 rounded-md object-cover"
          />

          {attr.wikiLink && (
            <Link to={attr.wikiLink} target="_blank" rel="noopener noreferrer">
              <div className="absolute inset-0 ">
                <div className="absolute p-1 bottom-1 right-1 z-10 bg-background/50 rounded-full">
                  <WikiIcon className="fill-foreground" />
                </div>
              </div>
            </Link>
          )}
        </div>
      </CardContent>

      <CardFooter className="m-2 mb-0 gap-6 p-0 text-muted-foreground">
        <div className="flex justify-start gap-1 grow">
          <Compass size={16} className="motion-safe:animate-wiggle " />
          {attr != undefined && meters}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AttractionPopupContents;
