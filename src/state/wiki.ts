import { createStore } from ".";
import type { WikiPageType } from "@/types/WikiType";
import type { NominatimType } from "@/types/NominatimType";
import type { StopData } from "@/components/vbb-stations";

export const useWikiPages = createStore<WikiPageType[]>("wikiPages", []);

export const useNominatim = createStore<NominatimType[]>("nominatim", []);

export const useVbbStations = createStore<StopData | null>("vbbstations", null);
