import "leaflet";
import "leaflet-routing-machine";

declare module "leaflet" {
  namespace Routing {
    class GraphHopper implements IRouter {
      constructor(apiKey: string, options?: any);
      route(waypoints: Waypoint[], callback: (error: any, routes: any[]) => void, context?: any, options?: any): void;
      on(event: string, callback: (e: any) => void): this;
    }

    interface RoutingControlOptions {
      createMarker?: (i: number, waypoint: Waypoint, n: number) => Marker | null;
    }

    interface IRouter {
        on(event: string, callback: (e: any) => void): this;
    }
  }
}
