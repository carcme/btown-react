"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Heart,
  Info,
  Share2Icon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { getAttraction, type Attraction } from "@/state/tours";
import { InfoBox } from "./info-box";

export function InteractiveButtonGroup({
  tour,
  attrInfo,
  currentId,
}: {
  tour: number;
  currentId: number;
  attrInfo: Attraction | undefined;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
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
          >
            <ChevronLeft />
          </Link>
        </Button>
        {/* Middle Buttons */}
        <div className="flex gap-2 flex-1 justify-center">
          {/* Reveal Button */}
          <Button
            variant={isRevealed ? "berlin" : "outline"}
            size="default"
            onClick={() => setIsRevealed(!isRevealed)}
            aria-label="Toggle reveal"
            aria-expanded={isRevealed}
          >
            <Info className="h-4 w-4" />
            Info
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Like"
            disabled={true}
          >
            <Heart className="h-4 w-4" />
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
          >
            <ChevronRight />
          </Link>
        </Button>
        {/* Right Arrow Button */}
      </div>

      {/* Revealed Content */}

      <div
        className={`overflow-hidden transition-all duration-800 ease-in-out ${
          isRevealed ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-px rounded-none bg-background">
          <InfoBox infoData={data} />
        </div>
      </div>
    </div>
  );
}
