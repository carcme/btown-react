export interface WikiPageType {
  pageid: number;
  ns: number;
  title: string;
  index: number;
  extract: string;
  coordinates: WikiCoordType[];
  terms: WikiTermsType;
  thumbnail: WikiThumbnailType;
}

export interface WikiCoordType {
  lat: number;
  lon: number;
  primary: boolean;
  type: string;
  dist: number;
  dim: number;
  globe: string;
}

export interface WikiTermsType {
  description: string[];
}

export interface WikiThumbnailType {
  source: string;
  width: number;
  height: number;
}
