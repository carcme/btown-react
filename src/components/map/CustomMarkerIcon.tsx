import L from "leaflet";

import { Icon } from "leaflet";
import { firebaseImage } from "@/lib/utils";
import type { Attraction } from "@/state/tours";
import { useTheme } from "@/state/theme-provider";

export function createFirebaseMarkerIcon(
  poi: Attraction,
  height: number,
  width: number
) {
  const customIcon = new Icon({
    iconUrl: firebaseImage(poi.stopImageFile),
    iconSize: [height, width],
  });

  const stopItem = {
    name: poi.stopName,
    lat: poi.location.lat,
    lng: poi.location.lng,
    icon: customIcon,
  };

  return stopItem;
}

export function createWikiMarkerIcon() {
  const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24"  style="opacity:1;"><path fill="#CFD8DC" d="M6 10a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"/><path fill="#37474F" d="M39 17.271a.34.34 0 0 1-.334.349h-1.799l-8.164 18.179c-.052.12-.17.2-.297.202h-.004a.33.33 0 0 1-.298-.193l-3.874-8.039l-4.18 8.049a.33.33 0 0 1-.303.184a.34.34 0 0 1-.292-.199l-8.252-18.182h-1.87a.345.345 0 0 1-.333-.35v-.921a.34.34 0 0 1 .333-.35h6.657a.34.34 0 0 1 .333.35v.921a.34.34 0 0 1-.333.349h-1.433l5.696 13.748l2.964-5.793l-3.757-7.953h-.904a.34.34 0 0 1-.333-.35v-.922c0-.191.149-.348.333-.348h4.924a.34.34 0 0 1 .333.348v.922c0 .192-.149.35-.333.35h-.867l2.162 4.948l2.572-4.948H25.77a.34.34 0 0 1-.334-.35v-.922a.34.34 0 0 1 .334-.348h4.784c.187 0 .333.156.333.348v.922a.34.34 0 0 1-.333.35h-1.05l-3.757 7.141l3.063 6.584l5.905-13.725h-1.872a.343.343 0 0 1-.334-.35v-.922c0-.191.15-.348.334-.348h5.822a.34.34 0 0 1 .334.348z"/></svg>`;

  return new L.DivIcon({
    className: "test",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20],
  });
}
export function createMarkerIcon(
  color = "fff",
  outline = "000",
  stroke = "0.5"
) {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
      <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
      <path fill="${color}" stroke="#${outline}" stroke-width="${stroke}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;

  return new L.DivIcon({
    className: "test",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });
}

export function createIqMarkerIcon(
  theme: string,
  type: string,
  color = "#0070F3", //blue
  outline = "#fff",
  stroke = "1"
) {
  let svgTemplate;

  const colorHighlight = "#FFD600"; //yellow
  const outlineHighlight = "#000";
  const strokeHighlight = "0.5";

  color = theme === "dark" ? "#0070F3" : "#ff773c";

  outline = theme === "dark" ? "#fff" : "#000";
  stroke = theme === "dark" ? "2" : "1";

  switch (type) {
    case "atm":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${color} stroke=${outline} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>`;
      break;

    case "toilets":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${color} stroke=${outline} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-toilet-icon lucide-toilet"><path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/><path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/></svg>`;
      break;

    case "bar":
    case "pub":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${color} stroke=${outline} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-beer-icon lucide-beer"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/></svg>`;
      break;

    case "zoo":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${colorHighlight} stroke=${outlineHighlight} stroke-width=${stroke} stroke-linecap="colorHighlighround" stroke-linejoin="round" class="lucide lucide-panda-icon lucide-panda"><path d="M11.25 17.25h1.5L12 18z"/><path d="m15 12 2 2"/><path d="M18 6.5a.5.5 0 0 0-.5-.5"/><path d="M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83"/><path d="M6 6.5a.495.495 0 0 1 .5-.5"/><path d="m9 12-2 2"/></svg>`;
      break;

    case "aquarium":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${colorHighlight} stroke=${outlineHighlight} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fish-icon lucide-fish"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/></svg>`;
      break;

    case "attraction":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${colorHighlight} stroke=${strokeHighlight} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`;
      break;

    case "information":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${color} stroke=${outline} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
      break;

    case "artwork":
    case "gallery":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${color} stroke=${outline} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette-icon lucide-palette"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>`;
      break;

    case "restaurant":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${color}  stroke=${outline} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hamburger-icon lucide-hamburger"><path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25"/><path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2"/><path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0"/><path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"/></svg>`;
      break;

    case "viewpoint":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${colorHighlight} stroke=${outlineHighlight} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-binoculars-icon lucide-binoculars"><path d="M10 10h4"/><path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/><path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"/><path d="M 22 16 L 2 16"/><path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"/><path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/></svg>`;
      break;

    case "museum":
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill=${color} stroke=${outline} stroke-width=${stroke} stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark"><path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></svg>`;
      break;

    default:
      svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
      <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
      <path fill="${color}" stroke="#${outline}" stroke-width="${stroke}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;
      break;
  }

  return new L.DivIcon({
    className: "test",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [0, -16],
  });
}
