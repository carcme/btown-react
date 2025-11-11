export interface Page {
  pageid: number;
  ns: number;
  title: string;
  index: number;
  extract: string;
  coordinates: Coordinate[];
  terms: Terms;
  thumbnail: Thumbnail;
}

export interface Coordinate {
  lat: number;
  lon: number;
  primary: boolean;
  type: string;
  dim: string;
  globe: string;
  dist: number;
}

export interface Terms {
  description: string[];
}

export interface Thumbnail {
  source: string;
  width: number;
  height: number;
}
