import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Compass, Link as htmlLink, ArrowDown, Shapes } from "lucide-react";

import WikipediaIcon from "../icons/flat-color-icons-wikipedia";

import wikiSVG from "@assets/wiki.svg";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../lang-provider";
import WikiIcon from "./WikiIcon";
import NoImage from "@/assets/no_image.png";

const WikiCard = ({ title, desc, image, pageid, dist }) => {
  const { lang } = useLanguage();

  const wikiLink = "http://" + lang + ".wikipedia.org/?curid=" + pageid;

  if (image === undefined) image = NoImage;
  return (
    <Card className="w-56 max-w-md gap-0 py-2 pt-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-3 px-2 py-2">
        <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full px-1">
          {/* <img src={BtownIcon} alt="" /> */}
          <WikiIcon className="fill-muted-foreground" />
        </div>
        <div className="text-start">{title}</div>
      </CardHeader>

      <CardContent className="text-muted-foreground mt-2 px-2 text-[11px]">
        <div className="line-clamp-4 text-left text-balance">
          <p>{desc}</p>
        </div>
        <div className="bg-muted mt-4 aspect-video w-full rounded-xl">
          <img
            src={image}
            alt="Wikipedia image"
            className="aspect-video w-92 rounded-md object-cover"
          />
          {/* <img src={image} /> */}
        </div>
      </CardContent>

      <CardFooter className="m-2 mb-0 gap-6 p-0">
        <div className="flex justify-start gap-1">
          <Compass size={16} className="motion-safe:animate-wiggle" />
          {dist}m
        </div>
        <div className="flex justify-end"></div>
        <Link to={wikiLink} target="_blank" rel="noopener noreferrer">
          <Button
            variant="hover"
            size="xs"
            className="bg-background px-2 text-xs"
          >
            Read More{" "}
            <ArrowDown className="motion-safe:animate-direction -rotate-90" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WikiCard;
