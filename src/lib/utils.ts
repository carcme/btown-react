import { useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { getDistance } from "geolib";
import type { GeolibInputCoordinates } from "geolib/es/types";
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

export function getCloudImage(filename: string | undefined, width: number) {
  if (filename === undefined) return;

  const url = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload/w_${width}/q_35/f_webp/v1678886400/${filename}`;

  return url;
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
export default function getCommonsImage(fileUrl: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!fileUrl) return;

      try {
        // Extract filename from Commons URL
        const match = fileUrl.match(/File:(.+)$/);
        if (!match) return;

        const filename = decodeURIComponent(match[1]);

        // Query Wikimedia API for the image URL
        const res = await fetch(
          `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${filename}&prop=imageinfo&iiprop=url&format=json&origin=*`
        );
        const data = await res.json();
        const pages = data?.query?.pages;
        const page = pages ? (Object.values(pages)[0] as any) : null;
        const url = page?.imageinfo?.[0]?.url ?? null;
        setImageUrl(url);
      } catch (err) {
        console.error("Failed to fetch Commons image:", err);
      } finally {
      }
    };

    fetchImage();
  }, [fileUrl]);

  return imageUrl;
}

// Converts a Wikimedia Commons "File:" page URL
// into a working thumbnail URL (default width: 330px)

export async function commonsToThumbnail(url: string, width = 330) {
  // 1. Extract filename
  const match = url.match(/File:(.*)$/);
  if (!match) throw new Error("Invalid Commons File: URL");

  const filename = decodeURIComponent(match[1]);

  // 2. MD5 hash determines the folder structure on Wikimedia servers
  const md5 = await md5Hash(filename);
  const dir1 = md5.slice(0, 1);
  const dir2 = md5.slice(0, 2);

  // 3. Construct the URL
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${dir1}/${dir2}/${encodeURIComponent(
    filename
  )}/${width}px-${encodeURIComponent(filename)}`;
}

// Small helper to compute MD5 in browser / vite
async function md5Hash(str: string) {
  const utf8 = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest("MD5", utf8);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
