import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BerlinBus,
  BerlinSBahn,
  BerlinTram,
  BerlinUBahn,
} from "@/assets/svgIcons";
import { Spinner } from "./ui/spinner";
import { useVbbStations } from "@/state/storeCreate";
import AlertBox from "./AlertBox";

export interface LineType {
  id: string;
  name: string;
  mode: string;
  type: string;
  product: string;
  // Add other properties if needed
}

export interface StopDataType {
  id: string;
  name: string;
  lines: LineType[];

  // Add other properties if needed
}

interface VbbStationsProps {
  stopId: number;
  lang: string;
}

const VbbStations: React.FC<VbbStationsProps> = ({ stopId, lang }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {
    data: stopData,
    setData: setStopData,
    reset: resetVbbStations,
  } = useVbbStations();

  useEffect(() => {
    const fetchStopData = async () => {
      if (!stopData) {
        console.log("🚀 ~ fetchStopData ~ "); // check it doesn't run many times
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(
            `https://v6.bvg.transport.rest/stops/${stopId}?linesOfStops=true&language=${lang}`
          );
          setStopData(response.data);
        } catch (err) {
          setError("Failed to fetch stop data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    if (stopId) {
      fetchStopData();
    }
    return () => {
      resetVbbStations();
    };
  }, [stopId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 justify-center">
        <Spinner />
        Loading VBB station data...
      </div>
    );
  }

  if (error) {
    console.log("🚀 ~ VbbStations ~ error:", error);
    return <AlertBox title="Something went wrong!" desc={error} />;
  }

  if (!stopData) {
    return (
      <AlertBox
        title="No VBB station data found"
        desc="Check your internet connection"
      />
      // <AlertCircleIcon />
    );
  }

  // Group lines by 'product' for better rendering
  const linesByProduct = stopData.lines.reduce(
    (acc, line) => {
      if (!acc[line.product]) {
        acc[line.product] = [];
      }
      acc[line.product].push(line);
      return acc;
    },
    {} as Record<string, LineType[]>
  );

  return (
    <div className="vbb-stations-component p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2"> {stopData.name}</h2>
      {Object.entries(linesByProduct).map(([mode, lines]) => {
        return (
          <div key={mode} className="mb-5">
            {mode === "suburban" && (
              <div className="flex gap-2 items-center">
                <BerlinSBahn className="size-5" />
                <h3 className="text-lg font-medium capitalize">S-Bahn</h3>
              </div>
            )}
            {mode === "subway" && (
              <div className="flex gap-2 items-center">
                <BerlinUBahn className="size-5" />
                <h3 className="text-lg font-medium capitalize">U-Bahn</h3>
              </div>
            )}
            {mode === "tram" && (
              <div className="flex gap-2 items-center">
                <BerlinTram className="size-5" />
                <h3 className="text-lg font-medium capitalize">tram</h3>
              </div>
            )}
            {mode === "bus" && (
              <div className="flex gap-2 items-center">
                <BerlinBus className="size-5" />
                <h3 className="text-lg font-medium capitalize">Bus</h3>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              {lines.map((line) => (
                <div>
                  {line.product === "bus" && (
                    <span
                      key={line.id}
                      className="px-2 py-0.5 text-sm font-medium bg-[#A95599]  rounded-full text-white"
                    >
                      {line.name}
                    </span>
                  )}
                  {line.product === "subway" && (
                    <span
                      key={line.id}
                      className="px-2 py-0.5 text-sm font-medium bg-[#003399] rounded-full text-white"
                    >
                      {line.name}
                    </span>
                  )}
                  {line.product === "suburban" && (
                    <span
                      key={line.id}
                      className="px-2 py-0.5 text-sm font-medium bg-[#439844]  rounded-full  text-white"
                    >
                      {line.name}
                    </span>
                  )}
                  {line.product === "tram" && (
                    <span
                      key={line.id}
                      className="px-2 py-0.5 text-sm font-medium bg-[#CC0000] rounded-full text-white"
                    >
                      {line.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VbbStations;
