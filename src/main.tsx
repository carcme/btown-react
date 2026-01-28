import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import { LanguageProvider } from "./state/lang-provider.tsx";
import { ThemeProvider } from "./state/theme-provider.tsx";
import "leaflet/dist/leaflet.css";
import { LocationProvider } from "./state/location-provider.tsx";
import { TourMapViewProvider } from "./state/show-tour-map-provider.tsx";

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <LanguageProvider defaultLang="en" storageKey="btown-lang">
          <ThemeProvider defaultTheme="dark" storageKey="btown-theme">
            <TourMapViewProvider
              defaultTourMapView="half"
              storageKey="btown-tour-map-view"
            >
              <LocationProvider>
                <RouterProvider router={router} />
              </LocationProvider>
            </TourMapViewProvider>
          </ThemeProvider>
        </LanguageProvider>
      </TanStackQueryProvider.Provider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
