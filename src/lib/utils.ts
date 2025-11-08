import { clsx, type ClassValue } from "clsx";
import { getDistance } from "geolib";
import type { GeolibInputCoordinates } from "geolib/es/types";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firebaseImage(url: string | undefined) {
  return (
    import.meta.env.VITE_FIREBASE_PATH +
    url +
    import.meta.env.VITE_FIREBASE_TOKEN
  );
}

export function useDebounceLoadingState(delay = 200) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setShowLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, delay]);

  return [showLoading, setIsLoading] as const;
}

export function getDist(
  latlng: GeolibInputCoordinates,
  location: GeolibInputCoordinates
) {
  let meters = getDistance(latlng, location);
  if (meters > 1000) {
    return (meters / 1000).toFixed(1) + " km";
  } else {
    return meters + " m";
  }
}
