"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const stock = [
  {
    url: "https://placehold.co/400x600/222/ccc?text=Loading...",
    alt: "Slide 1",
  },
];

export interface CoverImages {
  url: string;
  alt: string;
}
interface ImageSliderProps {
  images?: CoverImages[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  buttonClassName?: string;
  indicatorClassName?: string;
  children: React.ReactNode;
}

export function ImageSlider({
  images = stock,
  className,
  containerClassName = "",
  imageClassName = "",
  buttonClassName,
  indicatorClassName,
  children,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Minimum distance for a swipe to register

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swiped left - go to next
      goToNext();
    } else {
      // Swiped right - go to previous
      goToPrevious();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };
  const maxDots = 5;
  const getVisibleDots = () => {
    if (images.length <= maxDots) {
      return images.map((_, index) => index);
    }

    const halfWindow = Math.floor(maxDots / 2);
    let start = currentIndex - halfWindow;
    let end = currentIndex + halfWindow;

    // Adjust if we're near the beginning
    if (start < 0) {
      end += Math.abs(start);
      start = 0;
    }

    // Adjust if we're near the end
    if (end >= images.length) {
      start -= end - images.length + 1;
      end = images.length - 1;
    }

    // Ensure we always show exactly maxDots
    start = Math.max(0, start);
    end = Math.min(images.length - 1, start + maxDots - 1);

    const dots = [];
    for (let i = start; i <= end; i++) {
      dots.push(i);
    }
    return dots;
  };

  const visibleDots = getVisibleDots();
  return (
    <div className={cn("relative w-fit max-w-4xl mx-auto", className)}>
      {children}
      {/* Main Image Container */}
      <div
        className={cn("relative overflow-hidden bg-muted mx-auto", className)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex].url || "https://placehold.co/600x400"}
          alt={images[currentIndex].alt}
          className={cn("w-full h-full object-cover ", className)}
        />

        {/* Navigation Buttons */}
        <Button
          variant="scale"
          size="icon"
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 ",
            buttonClassName
          )}
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="scale"
          size="icon"
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90",
            buttonClassName
          )}
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Slide Counter */}
        <Badge
          variant="outline"
          className="absolute top-4 right-4 rounded-full text-sm bg-background/30 text-foreground"
        >
          {currentIndex + 1} / {images.length}
        </Badge>
      </div>
      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 mt-4">
        {visibleDots.map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              indicatorClassName
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
