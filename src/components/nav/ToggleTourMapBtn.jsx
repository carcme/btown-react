import { Map, MapMinus, MapPinMinusInside, MapPlus } from "lucide-react";

import { Button } from "../ui/button";
import { useTourMapView } from "@/state/show-tour-map-provider";

export default function ToggleTourMapBtn() {
  const { showMap, setShowMap } = useTourMapView();

  const toggleMap = () => {
    switch (showMap) {
      case "hidden":
        setShowMap("half");
        break;
      case "half":
        setShowMap("full");
        break;
      case "full":
        setShowMap("hidden");
        break;
      default:
        setShowMap("hidden");
    }
  };

  return (
    <div>
      <Button
        variant={showMap === "full" ? "berlin" : "outline"}
        // variant={"outline"}
        size="default"
        onClick={() => toggleMap()}
        aria-label="Toggle tour map"
        className={
          showMap === "full"
            ? "ring dark:ring-location/80 ring-location dark:bg-location/50 bg-location"
            : "ring dark:ring-location/40"
        }
      >
        {showMap === "hidden" ? (
          <MapPlus className="size-4" />
        ) : showMap === "half" ? (
          <Map className="size-4" />
        ) : showMap === "full" ? (
          <MapMinus className="size-4" />
        ) : null}
      </Button>
    </div>
  );
}
