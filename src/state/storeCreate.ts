import { createStore } from ".";
import type { WikiPageType } from "@/types/WikiType";
import type { NominatimType } from "@/types/NominatimType";
import type { StopDataType } from "@/components/vbb-stations";
import type { LocationIQPlaceType } from "@/types/LocationIQ";

export const useWikiPages = createStore<WikiPageType[]>("wikiPages", []);

export const useNominatim = createStore<NominatimType[]>("nominatim", []);

export const useVbbStations = createStore<StopDataType | null>(
  "vbbstations",
  null
);

export const useIqPlaces = createStore<LocationIQPlaceType[] | null>(
  "iqplaces",
  null
);
