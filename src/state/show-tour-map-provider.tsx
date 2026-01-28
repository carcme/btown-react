import { createContext, useContext, useState } from "react";

type TourMapView = "half" | "full" | "hidden";

type TourMapViewProviderProps = {
  children: React.ReactNode;
  defaultTourMapView?: TourMapView;
  storageKey?: string;
};

type TourMapViewProviderState = {
  showMap: TourMapView;
  setShowMap: (lang: TourMapView) => void;
};

const initialState: TourMapViewProviderState = {
  showMap: "half",
  setShowMap: () => null,
};

const TourMapViewProviderContext =
  createContext<TourMapViewProviderState>(initialState);

export function TourMapViewProvider({
  children,
  defaultTourMapView = "half",
  storageKey = "btown-tour-map-view",
  ...props
}: TourMapViewProviderProps) {
  const [showMap, setShowMap] = useState<TourMapView>(
    () =>
      (localStorage.getItem(storageKey) as TourMapView) || defaultTourMapView
  );

  const value = {
    showMap,
    setShowMap: (showMap: TourMapView) => {
      localStorage.setItem(storageKey, showMap);
      setShowMap(showMap);
    },
  };

  return (
    <TourMapViewProviderContext.Provider {...props} value={value}>
      {children}
    </TourMapViewProviderContext.Provider>
  );
}

export const useTourMapView = () => {
  const context = useContext(TourMapViewProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a TourMapViewProvider");

  return context;
};
