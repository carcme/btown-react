import { createContext, useContext, useState } from "react";
import type { LatLngExpression } from "leaflet";

const defaultCenter = [
  52.5374207197601, 13.360725769761826,
] as LatLngExpression;

type LocationProviderProps = {
  children: React.ReactNode;
  defaultLocation?: LatLngExpression;
  storageKey?: string;
};

type LocationProviderState = {
  location: LatLngExpression;
  setUserLocation: (location: LatLngExpression) => void;
};

const initialState: LocationProviderState = {
  location: defaultCenter,
  setUserLocation: () => location,
};

const LocationProviderContext =
  createContext<LocationProviderState>(initialState);

export function LocationProvider({
  children,
  defaultLocation = defaultCenter,
  ...props
}: LocationProviderProps) {
  const [location, setUserLocation] =
    useState<LatLngExpression>(defaultLocation);

  const value = {
    location,
    setUserLocation: (location: LatLngExpression) => {
      setUserLocation(location);
    },
  };

  return (
    <LocationProviderContext.Provider {...props} value={value}>
      {children}
    </LocationProviderContext.Provider>
  );
}

export const useUserLocation = () => {
  const context = useContext(LocationProviderContext);

  if (context === undefined)
    throw new Error("useUserLocation must be used within a LocationProvider");

  return context;
};
