export interface NominatimType {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: AddressType;
  extratags: ExtratagsType;
  namedetails?: NamedetailsType;
  boundingbox: string[];
}

export interface AddressType {
  tourism: string;
  house_number: string;
  road: string;
  quarter?: string;
  neighbourhood?: string;
  suburb: string;
  borough: string;
  city: string;
  "ISO3166-2-lvl4": string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface ExtratagsType {
  image: string;
  "ref:lda"?: string;
  building: string;
  amenity?: string;
  deanery?: string;
  diocese?: string;
  religion?: string;
  denomination?: string;
  opening_hours?: string;
  heritage: string;
  wikidata: string;
  architect?: string;
  wikipedia: string;
  "roof:shape"?: string;
  start_date?: string;
  wheelchair: string;
  "lda:criteria"?: string;
  "building:levels"?: string;
  "heritage:operator"?: string;
  wikimedia_commons: string;
  "architect:wikidata"?: string;
  "architect:wikipedia"?: string;
  year_of_construction?: string;
  "building:architecture"?: string;
  "architect:wikimedia_commons"?: string;
  "contact:website": string;
  "heritage:website": string;
  "building:material": string;
  reconstruction_date: string;
}

export interface NamedetailsType {
  name: string;
  "name:de": string;
  "name:en": string;
  "name:es": string;
  "name:fa": string;
  "name:fr": string;
  "name:he": string;
  "name:hy": string;
  "name:ja": string;
  "name:ko": string;
  "name:pl": string;
  "name:ru": string;
  "name:zh": string;
  old_name: string;
}
