import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Globe,
  BookOpen,
  Landmark,
  Image,
  Book,
  Images,
} from "lucide-react";
import axios from "axios";
import getCommonsImage from "@/lib/utils";
import { WikiIcon } from "@/assets/svgIcons";
import { useTheme } from "@/state/theme-provider";
import { Link } from "@tanstack/react-router";

const PoiPopupContents = ({ place, tourId = 2, attractionId = 23 }) => {
  const { theme } = useTheme();
  const googleImage = place?.extratags?.image?.includes("photos.app.goo.gl")
    ? place?.extratags?.image
    : null;

  let image = place?.extratags?.image?.includes("upload.wikimedia.org")
    ? place?.extratags?.image
    : getCommonsImage(place?.extratags?.image);

  if (!image) {
    image = getCommonsImage(place?.extratags?.wikimedia_commons);
    // Is this below really necessary :/
    // if (!image)
    //   image =
    //     theme === "dark"
    //       ? "https://placehold.co/600x400/000000/FFF?text=No%20Image"
    //       : "https://placehold.co/600x400/FFF/000000?text=No%20Image";
  }

  const type = place?.category || place?.addresstype || place?.type;

  return (
    <>
      <div className="bg-background ">
        <div className="relative">
          {image && (
            <img
              src={image}
              alt="Product"
              className="h-52 object-cover rounded-t-xl bg-background"
            />
          )}
          {type && (
            <span className="absolute top-2 right-2 bg-primary text-foreground px-1 py-0.5 rounded-xl text-xs capitalize">
              {type}
            </span>
          )}
        </div>

        <div className="space-y-4 flex flex-col text-left ">
          <div className="">
            <h4 className="text-base font-bold text-foreground ">
              {place.address.name}
            </h4>
            <p className="text-foreground text-base">
              {place.address.road}, {place.address.house_number},{" "}
              {place.address.suburb}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <p className="px-8 text-2xl font-bold text-foreground">
                Hours: {place.extratags.opening_hours}
              </p>
            </div>
          </div>
          <div className="flex gap-2 pb-2 justify-around">
            {googleImage && (
              <Link
                to={googleImage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80  hover:shadow-sm transition-colors text-sm font-medium"
              >
                <Images className="size-4" />
                Images
              </Link>
            )}
            <Link
              to="/wikipedia/$tourId/$attractionId"
              state={{ page: place }}
              params={{
                tourId: tourId,
                attractionId: attractionId,
              }}
              className="inline-flex items-center gap-2 px-2 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80  hover:shadow-sm transition-colors text-sm font-medium"
            >
              <BookOpen className="size-4" />
              NOT DONE YET
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoiPopupContents;
