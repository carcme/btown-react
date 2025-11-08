import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Root } from "./tours";

import toursData from "@/data/tours/btownTours.json";

export function toursCreate<ToursState>(queryKey: unknown) {
  return createTours<ToursState>(queryKey, toursData);
}

function createTours<T>(queryKey: unknown, jsonFile: Root) {
  return function () {
    const queryClient = useQueryClient();

    const { data } = useQuery({
      queryKey: [queryKey],
      queryFn: () => Promise.resolve(jsonFile),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    function setData(data: Partial<T>) {
      queryClient.setQueryData([queryKey], data);
    }

    function resetData() {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      queryClient.refetchQueries({
        queryKey: [queryKey],
      });
    }

    return { data, setData, resetData };
  };
}
