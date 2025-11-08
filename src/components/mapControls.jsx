import React from "react";

import { useState } from "react";
import { Circle, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import {
  CircleIcon,
  LayersIcon,
  LoaderCircleIcon,
  MapPinIcon,
  MinusIcon,
  NavigationIcon,
  PenLineIcon,
  PentagonIcon,
  PlusIcon,
  SquareIcon,
  Trash2Icon,
  Undo2Icon,
  WaypointsIcon,
  Plus,
} from "lucide-react";

import WikipediaIcon from "@/components/icons/flat-color-icons-wikipedia";
import { Icon } from "leaflet";

export const MapZoomControl = ({ className, ...props }) => {
  const { crosshair, btn_pressed, ...others } = props;

  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  useMapEvents({
    zoomend: () => {
      setZoomLevel(map.getZoom());
    },
  });
  return (
    <>
      {crosshair && (
        <div className={"absolute inset-1/2 z-1000 size-4 h-1/2 w-1/2"}>
          <Plus className="text-muted-foreground" strokeWidth="0.5" />
        </div>
      )}

      <ButtonGroup
        orientation="horizontal"
        aria-label="Zoom controls"
        className={cn(
          "absolute top-1 left-1 z-1000 h-fit -rotate-180",
          className
        )}
        {...others}
      >
        <Button
          type="button"
          size="icon-sm"
          variant="hover"
          aria-label="Zoom in"
          title="Zoom in"
          className="rounded-full border"
          disabled={zoomLevel >= map.getMaxZoom()}
          onClick={() => map.zoomIn()}
        >
          <PlusIcon />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="hover"
          aria-label="Zoom out"
          title="Zoom out"
          className="rounded-full border"
          disabled={zoomLevel <= map.getMinZoom()}
          onClick={() => map.zoomOut()}
        >
          <MinusIcon />
        </Button>
      </ButtonGroup>
    </>
  );
};

// export function LocationMarker() {
//   const [position, setPosition] = useState(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       if (position) {
//         setPosition(e.latlng);
//         map.flyTo(e.latlng, map.getZoom());
//       } else {
//         setPosition(null);
//       }
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>
//         <div className="bg-primary flex w-32 flex-col rounded p-4">
//           <p className="text-lg">
//             <b>You are here</b>
//           </p>
//         </div>
//       </Popup>
//     </Marker>
//   );
// }

// export const AddMarkerDummy = () => {
//   const [currentPos, setCurrentPos] = useState(null);

//   const map = useMapEvents({
//     dblclick(e) {},
//     click(e) {
//       if (currentPos != null) {
//         setCurrentPos(null);
//       } else {
//         setCurrentPos(e.latlng);
//       }
//     },
//   });
//   console.log("🚀 ~ AddMarkerDummy ~ currentPos:", currentPos);
//   return currentPos === null
//     ? null
//     : currentPos && (
//         <Marker position={currentPos}>
//           <Popup position={currentPos}>
//             <div className="bg-primary flex rounded p-4 text-left">
//               <p className="text-lg">
//                 <pre>{JSON.stringify(currentPos, null, 4)}</pre>
//               </p>
//             </div>
//           </Popup>
//         </Marker>
//       );
// };

// export const LocationFinderDummy = () => {
//   const [hasIcon, setHasIcon] = useState(false); // are we displaying a pointer
//   const [currentPos, setCurrentPos] = useState(null);

//   const { data, status, error } = useReveseNominatimLookup(currentPos);

//   const customIcon = new Icon({
//     iconUrl: "/icons8-location-marker-50-4.png",
//     shadowRetinaUrl: "/icons8-location-marker-100-4.png",
//     iconSize: [40, 40],
//     iconAnchor: [20, 30],
//     popupAnchor: [-0, -20],
//   });
//   const map = useMapEvents({
//     click(e) {
//       if (hasIcon) {
//         setCurrentPos(null);
//         setHasIcon(false);
//       } else {
//         setHasIcon(true);
//         setCurrentPos(e.latlng);
//         map.flyTo(e.latlng, map.getMaxZoom());
//       }
//     },
//   });

//   const address = data?.data.address;

//   return currentPos === null
//     ? null
//     : currentPos && (
//         <Marker position={currentPos} icon={customIcon}>
//           <Popup position={currentPos}>
//             <div className="bg-primary flex h-fit w-56 rounded p-4 text-left capitalize">
//               {status === "pending" && <p className="text-lg">Searching...</p>}
//               {status === "error" && (
//                 <p className="text-lg">
//                   Error: {error?.response.data.error.code}
//                   <br></br>
//                   Msg: {error?.response.data.error.message}
//                 </p>
//               )}
//               {status === "success" && (
//                 <div>
//                   {data?.data.type && (
//                     <p className="text-lg font-bold uppercase">
//                       {data?.data.type}
//                       <br></br>
//                     </p>
//                   )}
//                   {data?.data.address.amenity && (
//                     <p className="text-lg font-bold">
//                       {data?.data.address.amenity}
//                       <br></br>
//                     </p>
//                   )}
//                   <p className="text-xs">
//                     {data?.data.address.road} <br></br>
//                     {data?.data.address.suburb}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </Popup>
//         </Marker>
//       );
// };
