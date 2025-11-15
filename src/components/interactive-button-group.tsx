"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Info,
  Share2Icon,
} from "lucide-react";

import { Link } from "@tanstack/react-router";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { getAttraction, type Attraction } from "@/state/tours";
import { InfoBox } from "./info-box";
import VbbStations from "./vbb-stations";
import { BerlinUBahn } from "@/assets/svgIcons";

export function InteractiveButtonGroup({
  tour,
  attrInfo,
  currentId,
  lang,
}: {
  tour: number;
  currentId: number;
  attrInfo: Attraction | undefined;
  lang: string;
}) {
  const [infoRevealed, setInfoRevealed] = useState(false);
  const [bvgRevealed, setBvgRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const data = getAttraction(tour, currentId, "en");

  const next = currentId + 1;
  const prev = currentId - 1;

  const start = attrInfo?.start ? true : false;
  const end = attrInfo?.end ? true : false;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="w-full max-w-3xl space-y-4 mx-auto">
      <Toaster />
      {/* Button Group */}
      <div className="flex gap-2 w-full">
        {/* Left Arrow Button */}
        <Button
          asChild
          variant="outline"
          disabled={start == true}
          size="icon"
          className={`shrink-0 bg-transparent rounded-full ${start ? "text-muted" : ""}`}
          aria-label="Prev"
        >
          <Link
            to="/attractions/$tourId/$attractionId"
            params={{ tourId: tour.toString(), attractionId: prev.toString() }}
            search={{ osm_id: null, lat: null, lng: null }} // close popup so api not called unless asked
            onClick={() => setBvgRevealed(false)}
          >
            <ChevronLeft />
          </Link>
        </Button>
        {/* Middle Buttons */}
        <div className="flex gap-2 flex-1 justify-center">
          {/* Reveal Button */}
          <Button
            variant={infoRevealed ? "berlin" : "outline"}
            size="default"
            onClick={() => setInfoRevealed(!infoRevealed)}
            aria-label="Toggle reveal"
            aria-expanded={infoRevealed}
          >
            <Info className="h-4 w-4" />
            Info
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="share"
            className={`${copied ? "bg-primary" : ""}`}
            onClick={() => {
              handleCopy();
              toast("URL copied to clipboard", {
                description: "Open any app and paste to share this page",
                position: "top-center",
                style: {
                  gap: "1rem",
                },
                icon: <ClipboardCheck />,
              });
            }}
          >
            <Share2Icon className="size-4" />
          </Button>

          <Button
            variant={bvgRevealed ? "berlin" : "outline"}
            size="default"
            onClick={() => setBvgRevealed(!bvgRevealed)}
            aria-label="Toggle reveal"
            aria-expanded={bvgRevealed}
          >
            BVG
            <BerlinUBahn className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          disabled={end == true}
          size="icon"
          className={`shrink-0 bg-transparent rounded-full ${end ? "text-muted" : ""}`}
          aria-label="Next"
        >
          <Link
            to="/attractions/$tourId/$attractionId"
            params={{ tourId: tour.toString(), attractionId: next.toString() }}
            // close popup so api not called unless asked
            onClick={() => setBvgRevealed(false)}
            search={{ osm_id: null, lat: null, lng: null }}
          >
            <ChevronRight />
          </Link>
        </Button>
        {/* Right Arrow Button */}
      </div>
      {/* Revealed Content */}

      <div
        className={`overflow-hidden transition-all duration-800 ease-in-out ${
          infoRevealed ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-px rounded-none bg-background">
          <InfoBox infoData={data} />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-800 ease-in-out ${
          bvgRevealed ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {data?.vbb && (
          <div className="p-px rounded-none bg-background">
            {bvgRevealed && <VbbStations stopId={data.vbb} lang={lang} />}
          </div>
        )}
      </div>
    </div>
  );
}
