import { toursCreate } from ".";

export const useTours = toursCreate<Root>("tours");

export const getTour = (id: number, lang: string) => {
  const { data } = useTours();

  if (lang === "en") return data?.en.tours[id];
  if (lang === "de") return data?.de.tours[id];

  throw new Error("getTour() Unsupported langauage");
};

export const getAttraction = (tour: number, attr: number, lang: string) => {
  const { data } = useTours();

  if (lang === "en") {
    const tourAttractions = data?.en.tours[tour].attractions;
    return tourAttractions?.find((item) => item.id === attr);
  }

  if (lang === "de") {
    const tourAttractions = data?.de.tours[tour].attractions;
    return tourAttractions?.find((item) => item.id === attr);
  }

  throw new Error("getAttraction() Unsupported langauage");
};

export interface Root {
  filename: string;
  version: number;
  en: En;
  de: De;
}

export interface En {
  tours: Tour[];
}

export interface De {
  tours: Tour[];
}

export interface Tour {
  id: number;
  tourName: string;
  busStop: string;
  bahn: string;
  tourDistance: number;
  tourType: string;
  tourTime: number;
  tourRating: number;
  tourDesc: string;
  tourBrief: string[];
  tourCoverImageFile: string;
  tourCoverImageFileAlt: string;
  coverImages: CoverImage[];
  attractions: Attraction[];
  highlights: Highlights;
}

export interface Highlights {
  stops: string;
  text: string[];
  tips: string[];
}

export interface CoverImage {
  url: string;
  alt: string;
}

export interface Attraction {
  id: number;
  start?: boolean;
  end?: boolean;
  stopName: string;
  busStop: string;
  bahn?: string;
  tram?: string;
  stopTag?: string;
  facebookPageId?: number;
  wikiLink?: string;
  web?: string;
  stopImageFile: string;
  stopImagesource: string;
  stopRating: number;
  stopType: string;
  location: Location;
  pois: Poi[];
  stopInfo: StopInfo;
  address?: string;
  hours?: string;
  stopCost?: number;
  tel?: string;
  email?: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Poi {
  title: string;
  lat: number;
  lng: number;
  tag?: string;
}

export interface StopInfo {
  title: string;
  teaser: string[];
  history: string[];
  qi?: string[];
  look_out?: string[];
  next_stop?: string[];
  extra?: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Pois {
  title: string;
  lat: number;
  lng: number;
  tag?: string;
}

export interface StopInfo {
  title: string;
  teaser: string[];
  history: string[];
  qi?: string[];
  look_out?: string[];
  next_stop?: string[];
  extra?: string[];
  extraTitle?: string;
}

export interface CoverImage {
  url: string;
  alt: string;
}

export interface Highlights {
  stops: string;
  text: string[];
  tips: string[];
}
