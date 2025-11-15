// // interface for LocationIQ Nearby POI response
// export interface LocationIQPlaceType {
//   place_id: string;
//   osm_id: string;
//   osm_type: string;
//   lat: string; // These are strings in LocationIQ response
//   lon: string; // These are strings in LocationIQ response
//   display_name: string;
//   type: string;
//   category: string;
//   // Add other properties if needed
// }

import type { DivIcon, LatLngExpression } from "leaflet";

export interface LocationIQPlaceType {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  tag_type: string;
  name: string;
  display_name: string;
  address: IqAddressType;
  distance: number;
  icon?: DivIcon;
}

export interface IqAddressType {
  name: string;
  road: string;
  suburb: string;
  city: string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface osmPlaceType {
  osm_id: string;
  latlng: LatLngExpression;
}
