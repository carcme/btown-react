/**
 * MAP TILES
 * ref: https://github.com/leaflet-extras/leaflet-providers
 */
export const DEFAULT_MAP = {
  url: "https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=g1DA4FKYP4QDp3YpFmjihYuo4wxjobwLdD3AbIKJrytFkFPltKb7UI6cjDV89AUP",
  attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export const DEFAULT_MAP_DARK = {
  url: "https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=g1DA4FKYP4QDp3YpFmjihYuo4wxjobwLdD3AbIKJrytFkFPltKb7UI6cjDV89AUP",
  attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

declare interface BERLIN_CENTER_TYPES {
  lat: number;
  lng: number;
  zoom: number;
}

export const BERLIN_CENTER = {
  lat: 52.516998,
  lng: 13.378248,
  zoom: 12,
} as BERLIN_CENTER_TYPES;

export const COLOURS = [
  {
    type: "main",
    hex: "#0070F3",
    color: "Electric Blue",
  },
  {
    type: "nature",
    hex: "#10B981",
    name: "Emerald",
  },
  {
    type: "food",
    hex: "#F59E0B",
    name: "Amber",
  },
  {
    type: "culture",
    hex: "#C2410C",
    name: "Rust Orange",
  },
  {
    type: "caution",
    hex: "#FFD600",
    name: "Bright Yellow",
  },
  {
    type: "secondary",
    hex: "#FF007F",
    color: "Hot Pink",
  },
  {
    type: "queer",
    hex: "#8B5CF6",
    name: "Violet",
  },
  {
    type: "error",
    hex: "#FF3131",
    name: "Vivid Red",
  },
  {
    type: "art",
    hex: "#DB2777",
    name: "Magenta",
  },
  {
    type: "bg",
    hex: "#1E1E1E",
    name: "Charcoal",
  },
];

/**
 * BERLIN TOURS
 */
export const BERLIN_TOURS = [
  {
    name: "Nikolaiviertel's Myths & Legends",
    desc: "A little walk around Berlin's origins",
    latlng: [52.516685, 13.408565],
    iconColor: "red",
  },
  {
    name: "Bus 100 Tour",
    desc: "The smart way to do the hop on, hop off bus tours",
    latlng: [52.507294, 13.332367],
    iconColor: "green",
  },
  {
    name: "Museum Island",
    desc: "One island, five museums, six thousand years of history",
    latlng: [52.518163, 13.400196],
    iconColor: "violet",
  },
];

// export const iconGold = new L.Icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
//   iconRetinaUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
//   iconAnchor: null,
//   popupAnchor: null,
//   shadowUrl: null,
//   shadowSize: null,
//   shadowAnchor: null,
//   iconSize: new L.Point(25, 40),
//   className: "leaflet-div-icon",
// });

// const ColorIcon = L.Icon.extend({
//   options: {
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
//     iconSize: [25, 41],
//     shadowSize: [41, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//   },
// });

// export const useColorIcon = (color) => {
//   const icon = new ColorIcon({
//     iconUrl:
//       "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-" +
//       color +
//       ".png",
//   });
//   return icon;
// };

// export const WikiIcon = L.icon({
//   iconUrl:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJPV-DxI-7Ra5EG85ZZEGLdfbtthxeCXVzw&s",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//   iconSize: [40, 40],
//   iconAnchor: [12, 65],
//   popupAnchor: [1, 100],
//   shadowSize: [41, 41],
// });

// export const BuildWikiIcon = () => {
//   return new L.Icon({
//     iconUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJPV-DxI-7Ra5EG85ZZEGLdfbtthxeCXVzw&s",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//     iconSize: [40, 40],
//     iconAnchor: [12, 65],
//     popupAnchor: [1, -10],
//     shadowSize: [41, 41],
//     className: "leaflet-div-icon",
//   });
// };

// export const BuildBerlinIcons = () => {
//   const icons = BERLIN_TOURS.map((item) => {
//     return new L.Icon({
//       iconUrl:
//         "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-" +
//         item.iconColor +
//         ".png",
//       shadowUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//       shadowSize: [41, 41],
//     });
//   });
//   return icons;
// };
