import { useQuery, useQueryClient } from "@tanstack/react-query";

export function createStore<T>(queryKey: string, initialData: T) {
  const useStore = () => {
    const queryClient = useQueryClient();

    const { data } = useQuery<T>({
      queryKey: [queryKey],
      queryFn: () => {
        // This function will only be called if there is no initialData
        // and no data in the cache. We can throw an error or return a default value.
        // For now, I'll assume we always have initialData.
        return {} as T;
      },
      initialData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

    const setData = (updater: T | ((old: T | undefined) => T)) => {
      queryClient.setQueryData<T>([queryKey], updater);
    };

    const reset = () => {
      queryClient.setQueryData<T>([queryKey], initialData);
    };

    return { data: data as T, setData, reset };
  };

  return useStore;
}
